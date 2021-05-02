// Coefficients wall (0º e 90º)
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
            
            //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
            const newValueCoefficients = Number(interpolatorLinear.Interpolation((lengthWidthShed),coefficientMin,3/2,coefficientMax,2).toFixed(2))
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
            coefficientsA3  = Number(interpolatorLinear.Interpolation((lengthWidthShed),-0.2,2,coefficientsWall.A2,1).toFixed(2))
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
export function CoefficientsWall_0(a_lengthShed,b_widthShed,h_heightShed) {
    let coefficientsWall
    const lengthWidthShed = a_lengthShed / b_widthShed;
    const coefficients = tableCoefficientsExternalWall.coefficients_0
    coefficientsWall = externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    coefficientsWall = externalCoefficients.includeA3B3(coefficientsWall,lengthWidthShed)
    return coefficientsWall
}

//iNPUT
export function CoefficientsWall_90(a_lengthShed,b_widthShed,h_heightShed) {
    const coefficients = tableCoefficientsExternalWall.coefficients_90
    return externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    
}