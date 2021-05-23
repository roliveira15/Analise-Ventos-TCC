const getDimensionWind0 = ((width, length, height) => {

    let length_A1
    const comparete_1 = Number((width / 3).toFixed(2))
    const comparete_2 = Number((length / 4).toFixed(2))
    const comparete_3 = Number((height * 2).toFixed(2))
    const halfLenght = Number((length/ 2).toFixed(2))

    if (comparete_1 > comparete_2) {
        length_A1 = comparete_1
    } else if (comparete_2 < comparete_3) {
        length_A1 = comparete_2
    } else {
        length_A1 = comparete_3
    }

    const length_A2 = halfLenght - length_A1
    const length_A3 = halfLenght
    const length_D = width

    return {
        'A1': Number(length_A1).toLocaleString('PT'),
        'A2': Number(length_A2).toLocaleString('PT'),
        'A3': Number(length_A3).toLocaleString('PT'),
        'D': Number(length_D).toLocaleString('PT')
    }

});

const getDimensionWind90 =((width, length, height) => {

    const comparete_1 = width / 2
    const comparete_2 = height * 2

    const length_B = length
    const length_C1 = (comparete_1 < comparete_2) ? comparete_1 : comparete_2
    const length_C2 = width - length_C1
    const length_D1 = length_C1
    const length_D2 = length_C2

    return {
        'B': Number(length_B).toLocaleString('PT'),
        'D1': Number(length_D1).toLocaleString('PT'),
        'D2': Number(length_D2).toLocaleString('PT')
    }

     
});

const Angle_Roof = ((width, heightRoof) => {
    return {'angleRoof': (Math.atan(heightRoof/(width/2))*(180/Math.PI)).toFixed(2)}
});


// Coefficients wall (0º e 90º)
const Interpolation = ((xa,y1,x1,y2,x2) => {
    return y1 + ((xa-x1)/(x2-x1)) * (y2-y1)
})


const tableCoefficientsExternalWall = {

    /*
        [
            A1 = - 0.8, 
            B1= - 0.8,
            A2 = - 0.5,
            B2 = - 0.5,
            C1 = + 0.7,
            C2 = + 0.7,
            D1 = - 0.4,
            D2 = - 0.4,
        ]
    */


    coefficients_0: 
    [
        {
            'A1': - 0.8, 
            'B1': - 0.8,
            'A2': - 0.5,
            'B2': - 0.5,
            'C': + 0.7,
            'D': - 0.4,
        }
        ,
        {
            'A1': - 0.8, 
            'B1': - 0.8,
            'A2': - 0.4,
            'B2': - 0.4,
            'C': + 0.7,
            'D': - 0.3,
        }
        ,
        {
            'A1': - 0.9, 
            'B1': - 0.9,
            'A2': - 0.5,
            'B2': - 0.5,
            'C': + 0.7,
            'D': - 0.5,
        }
        ,
        {
            'A1': - 0.9, 
            'B1': - 0.9,
            'A2': - 0.4,
            'B2': - 0.4,
            'C': + 0.7,
            'D': - 0.3,
        }
        ,
        {
            'A1': - 1.0, 
            'B1': - 1.0,
            'A2': - 0.6,
            'B2': - 0.6,
            'C': + 0.8,
            'D': - 0.6,
        }
        ,
        {
            'A1': - 1.0, 
            'B1': - 1.0,
            'A2': - 0.5,
            'B2': - 0.5,
            'C': + 0.8,
            'D': - 0.3,
        }
    ],

    coefficients_90: 
    [
        {
         'A': + 0.7, 
         'B': - 0.4,
         'C1': - 0.8,
         'D1': - 0.8,
         'C2': - 0.4,
         'D2': - 0.4,
        }
        ,
        {
         'A': + 0.7, 
         'B': - 0.5,
         'C1': - 0.9,
         'D1': - 0.9,
         'C2': - 0.5,
         'D2': - 0.5,
        }
        ,
        {
         'A': + 0.7, 
         'B': - 0.5,
         'C1': -0.9,
         'D1': - 0.9,
         'C2': - 0.5,
         'D2': - 0.5,
        }
        ,
        {
         'A': + 0.7, 
         'B': - 0.6,
         'C1': -0.9,
         'D1': - 0.9,
         'C2': - 0.5,
         'D2': - 0.5,
        }
        ,
        {
         'A': + 0.8, 
         'B': - 0.6,
         'C1': - 1.0,
         'D1': - 1.0,
         'C2': - 0.6,
         'D2': - 0.6,
        }
        ,
        {
         'A': + 0.8, 
         'B': - 0.6,
         'C1': - 1.0,
         'D1': - 1.0,
         'C2': - 0.6,
         'D2': - 0.6,
        }

    ]    
}

const externalCoefficients = {
    // COEFFICIENT 0º
    //#1
    hightRelativeHBWall(heightWidthShed){
        let position 
        
        if(heightWidthShed <= 1/2 ) {
            position = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2 ){
            position = 2

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            position = 4
        }
        return position
    },
    //#2
    hightRelativeABWall (lengthWidthShed){
        return ((lengthWidthShed > 3/2 && lengthWidthShed < 2 ) ? true : false);
    },
    //#3
    positionHightRelativeWall(lengthWidthShed){
        return ((lengthWidthShed >= 2 && lengthWidthShed <= 4 ) ? 1 : 0);
    },
    //#4
    createdObjectInterpolation(valueMin, valueMax, lengthWidthShed){
        let coefficientsWall = new Object
        let coefficientsWallAux = new Array

        const lenghtTotal = Object.values(valueMax).length
        
        for(let i = 0; i < lenghtTotal; i++){
            const coefficientMin = Object.values(valueMin)[i]
            const coefficientMax = Object.values(valueMax)[i]
            
            //Interpolation(xa,y1,x1,y2,x2)
            const newValueCoefficients = Number(Interpolation((lengthWidthShed),coefficientMin,3/2,coefficientMax,2).toFixed(2))
            coefficientsWallAux.push(Number(newValueCoefficients))
        }

        if (Object.keys(valueMax)[0] == 'A1') {
            coefficientsWall = {...coefficientsWall,
                                    'A1': coefficientsWallAux[0], 
                                    'B1': coefficientsWallAux[1],
                                    'A2': coefficientsWallAux[2],
                                    'B2': coefficientsWallAux[3],
                                    'C':  coefficientsWallAux[4],
                                    'D':  coefficientsWallAux[5]}
        } else {
            coefficientsWall = {...coefficientsWall,
                                    'A': coefficientsWallAux[0], 
                                    'B': coefficientsWallAux[1],
                                    'C1': coefficientsWallAux[2],
                                    'C2': coefficientsWallAux[3],
                                    'D1':  coefficientsWallAux[4],
                                    'D2':  coefficientsWallAux[5]}
        }

        return coefficientsWall
    },
    //#5
    includeA3B3(coefficientsWall,lengthWidthShed) {
        let coefficientsA3
    
        if(lengthWidthShed == 1) {
            coefficientsA3 = coefficientsWall.A2

        } else if(lengthWidthShed >= 2) {
            coefficientsA3 = -0.2

        } else {
            coefficientsA3  = Number(Interpolation((lengthWidthShed),-0.2,2,coefficientsWall.A2,1).toFixed(2))
        }

        coefficientsWall = {...coefficientsWall,
                            'A3': coefficientsA3, 
                            'B3': coefficientsA3}

        return coefficientsWall

    },
    //#6
    DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients){
        let coefficientsWall = new Object

        const heightWidthShed = h_heightShed / b_widthShed;
        const lengthWidthShed = a_lengthShed / b_widthShed;
        
        const HightRelativeHB = externalCoefficients.hightRelativeHBWall(heightWidthShed)
        const HightRelativeAB = externalCoefficients.hightRelativeABWall(lengthWidthShed)
        const PositionHightRelative = externalCoefficients.positionHightRelativeWall(lengthWidthShed)

        //if need the interpolation 
        if (HightRelativeAB == true) {
            const valueMin = coefficients[HightRelativeHB]
            const valueMax = coefficients[HightRelativeHB + 1]

            coefficientsWall = externalCoefficients.createdObjectInterpolation(valueMin,valueMax,lengthWidthShed)
        } else { 
            coefficientsWall = coefficients[PositionHightRelative + HightRelativeHB]
        }
        
        return coefficientsWall
        
    },

}

//iNPUT
const CoefficientsWall_0 = ((a_lengthShed,b_widthShed,h_heightShed) => {
    let coefficientsWall
    const lengthWidthShed = a_lengthShed / b_widthShed;
    const coefficients = tableCoefficientsExternalWall.coefficients_0
    coefficientsWall = externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    coefficientsWall = externalCoefficients.includeA3B3(coefficientsWall,lengthWidthShed)
    return coefficientsWall
})

//iNPUT
const CoefficientsWall_90 = ((a_lengthShed,b_widthShed,h_heightShed) => {
    const coefficients = tableCoefficientsExternalWall.coefficients_90
    return externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    
})


module.exports = {
    getAngle(width,heightRoof) {
        return Angle_Roof(width,heightRoof)
    },

    getDimensionsShed(width,lenght, height){
        const Wind_0 = getDimensionWind0(width,lenght, height)
        const Wind_90 = getDimensionWind90(width,lenght, height)
        return {...Wind_0, ...Wind_90}
    },

    getWallCoefficients(width,lenght, height){
        const Wind_0 = CoefficientsWall_0(width,lenght, height)
        const Wind_90 = CoefficientsWall_90(width,lenght, height)
        return {...Wind_0, ...Wind_90}
    }
}