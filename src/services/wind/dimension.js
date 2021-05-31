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

const externalCoefficientsWall = {
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
        
        const HightRelativeHB = externalCoefficientsWall.hightRelativeHBWall(heightWidthShed)
        const HightRelativeAB = externalCoefficientsWall.hightRelativeABWall(lengthWidthShed)
        const PositionHightRelative = externalCoefficientsWall.positionHightRelativeWall(lengthWidthShed)

        //if need the interpolation 
        if (HightRelativeAB == true) {
            const valueMin = coefficients[HightRelativeHB]
            const valueMax = coefficients[HightRelativeHB + 1]

            coefficientsWall = externalCoefficientsWall.createdObjectInterpolation(valueMin,valueMax,lengthWidthShed)
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
    coefficientsWall = externalCoefficientsWall.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    coefficientsWall = externalCoefficientsWall.includeA3B3(coefficientsWall,lengthWidthShed)
    return coefficientsWall
})

//iNPUT
const CoefficientsWall_90 = ((a_lengthShed,b_widthShed,h_heightShed) => {
    const coefficients = tableCoefficientsExternalWall.coefficients_90
    return externalCoefficientsWall.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
    
})


// Coefficients Roof (0º e 90º)
const tableCoefficientsExternalRoof = {

    /*
    
    [
        0° :
             {E = - 0.8, F= - 0.8, G = - 0.5, H = - 0.5}
        5º : .....
    ]
        
    */
    
coefficients_90: [

    [
        {'E': -0.8,'F': -0.8,'G': -0.4,'H': -0.4},
        {'E': -0.9,'F': -0.9,'G': -0.4,'H': -0.4},
        {'E': -1.2,'F': -1.2,'G': -0.4,'H': -0.4},
        {'E': -1.0,'F': -1.0,'G': -0.4,'H': -0.4},
        {'E': -0.4,'F': -0.4,'G': -0.4,'H': -0.4},
        {'E':  0.0,'F':  0.0,'G': -0.4,'H': -0.4},            
        {'E': +0.3,'F': +0.3,'G': -0.5,'H': -0.5},
        {'E':+0.43,'F':+0.43,'G':-0.53,'H':-0.53}, //50º
        {'E': +0.7,'F': +0.7,'G': -0.6,'H': -0.6},
    ],

    [
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -0.9,'F': -0.9,'G': -0.6,'H': -0.6},
        {'E': -1.1,'F': -1.1,'G': -0.6,'H': -0.6},
        {'E': -1.0,'F': -1.0,'G': -0.6,'H': -0.6},
        {'E': -0.7,'F': -0.7,'G': -0.5,'H': -0.5},
        {'E': -0.2,'F':  0.2,'G': -0.5,'H': -0.5},
        {'E': +0.2,'F': +0.2,'G': -0.5,'H': -0.5},
        {'E':+0.33,'F':+0.33,'G': -0.5,'H': -0.5},//50º
        {'E': +0.6,'F': +0.6,'G': -0.5,'H': -0.5},
    ],

    [     
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -0.8,'F': -0.8,'G': -0.6,'H': -0.6},
        {'E': -1.0,'F': -1.0,'G': -0.5,'H': -0.5},
        {'E': -0.2,'F': -0.2,'G': -0.5,'H': -0.5},
        {'E': +0.2,'F': +0.2,'G': -0.5,'H': -0.5}, //50º
        {'E': +0.5,'F': +0.5,'G': -0.5,'H': -0.5},
    ],
],

coefficients_0: [

    [
        {'E': -0.8,'F': -0.4,'G': -0.8,'H': -0.4},	
        {'E': -0.8,'F': -0.4,'G': -0.8,'H': -0.4},
        {'E': -0.8,'F': -0.6,'G': -0.8,'H': -0.6},
        {'E': -0.8,'F': -0.6,'G': -0.8,'H': -0.6},
        {'E': -0.7,'F': -0.6,'G': -0.7,'H': -0.6},
        {'E': -0.7,'F': -0.6,'G': -0.7,'H': -0.6},
        {'E': -0.7,'F': -0.6,'G': -0.7,'H': -0.6},
        {'E': -0.7,'F': -0.6,'G': -0.7,'H': -0.6},//50º
        {'E': -0.7,'F': -0.6,'G': -0.7,'H': -0.6},
    ],

    [
        {'E': -1.0,'F': -0.6,'G': -1.0,'H': -0.6},
        {'E': -0.9,'F': -0.6,'G': -0.9,'H': -0.6},
        {'E': -0.8,'F': -0.6,'G': -0.8,'H': -0.6},
        {'E': -0.8,'F': -0.6,'G': -0.8,'H': -0.6},
        {'E': -0.8,'F': -0.6,'G': -0.8,'H': -0.6},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},//50º
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
    ],

    [
        {'E': -0.9,'F': -0.7,'G': -0.9,'H': -0.7},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.8,'G': -0.8,'H': -0.8},
        {'E': -0.8,'F': -0.7,'G': -0.8,'H': -0.7},
        {'E': -0.8,'F': -0.7,'G': -0.8,'H': -0.7},
        {'E': -0.8,'F': -0.7,'G': -0.8,'H': -0.7},//50º
        {'E': -0.8,'F': -0.7,'G': -0.8,'H': -0.7},
    ]      
]
}

//Coefficients Roof
const externalCoefficientsRoof = {

    // COEFFICIENT 00º
    //#1
    hightRelativeHBRoof(heightWidthShed){
        let position

        if(heightWidthShed <= 1/2 ) {
            position = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2 ){
            position = 1

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            position = 2
        }
        return position
    },
    //#2
    includeIJ_0(coefficientsRoof,lengthWidthShed){
        let coefficientsI,coefficientsJ
    
        if(lengthWidthShed == 1) {
            coefficientsI = coefficientsRoof.F_0
            coefficientsJ = coefficientsRoof.H_0

        } else if(lengthWidthShed >= 2) {
            coefficientsI = -0.2
            coefficientsJ = -0.2

        } else {
            coefficientsI  = Number(Interpolation((lengthWidthShed),-0.2,2,coefficientsRoof.F_0,1).toFixed(2))
            coefficientsJ  = Number(Interpolation((lengthWidthShed),-0.2,2,coefficientsRoof.H_0,1).toFixed(2))
        }

        coefficientsRoof = {...coefficientsRoof,
                            'I_0': coefficientsI, 
                            'J_0': coefficientsJ}

        return coefficientsRoof
    },
    //#3
    includeIJ_90(coefficientsRoof){

        coefficientsRoof = {...coefficientsRoof,
                            'I_90': coefficientsRoof.F_90, 
                            'J_90': coefficientsRoof.H_90}

    return coefficientsRoof
    },

    DefinitionCoefficientsRoof_0(angleShed, b_widthShed,h_heightShed, coefficients){

        let coefficientsRoof = {}
        let coefficientsRoofAux = []
        
        const heightWidthShed = h_heightShed / b_widthShed;
        const AngleShed = [0,5,10,15,20,30,45,50,60]
        const angle_shed = AngleShed.length
        const HightRelativeHB = externalCoefficientsRoof.hightRelativeHBRoof(heightWidthShed)

        for (let i = 0; i < angle_shed;  i++) {

            if (angleShed == AngleShed[i]) {
                coefficientsRoof = coefficients[HightRelativeHB][i]
                break;

            } else if(angleShed < AngleShed[i]) {
                const positionMin = i-1
                const positionMax = i

                arrayMin = coefficients[HightRelativeHB][positionMin]
                arrayMax = coefficients[HightRelativeHB][positionMax]
                const lenghtTotal = Object.values(arrayMax).length

                for(let ii = 0; ii < lenghtTotal; ii++){
                                const coefficientMin = Object.values(arrayMin)[ii]
                                const coefficientMax = Object.values(arrayMax)[ii]
  
                                //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
                                const newValueCoefficients = Interpolation(angleShed,
                                                                                    coefficientMin,
                                                                                    AngleShed[positionMin],
                                                                                    coefficientMax,
                                                                                    AngleShed[positionMax]).toFixed(2)

                                coefficientsRoofAux.push(Number(newValueCoefficients))
                }

                coefficientsRoof = {...coefficientsRoof,
                                        'E_0': coefficientsRoofAux[0], 
                                        'F_0': coefficientsRoofAux[1],
                                        'G_0': coefficientsRoofAux[2],
                                        'H_0': coefficientsRoofAux[3]}
                    
                break;

                
            }
        }

        return coefficientsRoof
        
    },
 
    DefinitionCoefficientsRoof_90(angleShed, b_widthShed,h_heightShed, coefficients){

        let coefficientsRoof = {}
        let coefficientsRoofAux = []
        
        const heightWidthShed = h_heightShed / b_widthShed;
        const AngleShed = [0,5,10,15,20,30,45,50,60]
        const angle_shed = AngleShed.length
        const HightRelativeHB = externalCoefficientsRoof.hightRelativeHBRoof(heightWidthShed)

        for (let i = 0; i < angle_shed;  i++) {

            if (angleShed == AngleShed[i]) {
                coefficientsRoof = coefficients[HightRelativeHB][i]
                break;

            } else if(angleShed < AngleShed[i]) {
                const positionMin = i-1
                const positionMax = i

                arrayMin = coefficients[HightRelativeHB][positionMin]
                arrayMax = coefficients[HightRelativeHB][positionMax]
                const lenghtTotal = Object.values(arrayMax).length

                for(let ii = 0; ii < lenghtTotal; ii++){
                                const coefficientMin = Object.values(arrayMin)[ii]
                                const coefficientMax = Object.values(arrayMax)[ii]
  
                                //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
                                const newValueCoefficients = Interpolation(angleShed,
                                                                                    coefficientMin,
                                                                                    AngleShed[positionMin],
                                                                                    coefficientMax,
                                                                                    AngleShed[positionMax]).toFixed(2)

                                coefficientsRoofAux.push(Number(newValueCoefficients))
                }

                coefficientsRoof = {...coefficientsRoof,
                                        'E_90': coefficientsRoofAux[0], 
                                        'F_90': coefficientsRoofAux[1],
                                        'G_90': coefficientsRoofAux[2],
                                        'H_90': coefficientsRoofAux[3]}
                    
                break;

                
            }
        }
    
        return coefficientsRoof
        
    },
}   

//iNPUT
const CoefficientsRoof_0 = ((angleShed,a_widthShed, b_lenghtShed,h_heightShed) => {
    let coefficientsRoof
    const lengthWidthShed = a_widthShed / b_lenghtShed;
    const coefficients = tableCoefficientsExternalRoof.coefficients_0
    coefficientsRoof = externalCoefficientsRoof.DefinitionCoefficientsRoof_0(angleShed, b_lenghtShed,h_heightShed, coefficients)
    coefficientsRoof = externalCoefficientsRoof.includeIJ_0(coefficientsRoof,lengthWidthShed)
    
    return coefficientsRoof
    
})

//iNPUT
const CoefficientsRoof_90 = ((angleShed, b_lenghtShed,h_heightShed) => {
    let coefficientsRoof
    const coefficients = tableCoefficientsExternalRoof.coefficients_90
    coefficientsRoof = externalCoefficientsRoof.DefinitionCoefficientsRoof_90(angleShed, b_lenghtShed,h_heightShed, coefficients)
    coefficientsRoof = externalCoefficientsRoof.includeIJ_90(coefficientsRoof)
    return  coefficientsRoof
})



const internalCoefficients = {
    
    goal(ci_firts,cpe_waterproof){

        const ci = ci_firts;
        let acumulado = 0;
        
        const Acumulado = cpe_waterproof.map(proof => {

            const face = proof.face
            const ce = proof.cpe
            
            const ce_ci =  ce - ci == 0 ? 0.0001 : ce - ci;
            
            const Absolute_CeCi = Math.abs(ce_ci)
            const valueCalculate =  (Absolute_CeCi / ce_ci) *
                            (face*Math.sqrt(Absolute_CeCi))
            acumulado += valueCalculate
            return ({...proof,
                valueCalculate,
                acumulado
            })
        })  
    
        return Acumulado
    },
}

const PointReference = ((cpe_waterproof)=>{
    
    let value, valuePointReference,accumulatedValue,Coefficient,CoefficientLast  = 0
    let Signal = ""
    value = 1;

    const lowestValue = internalCoefficients.goal(value,cpe_waterproof)
    valuePointReference = Number(lowestValue[lowestValue.length-1]['acumulado'])
    
    const signal = Number(value) < 0 ? "-" : ""
    let SignalLast = signal
    
    
    
    for (let i = 0; i < 200; i = i + Number(signal + 0.1)) {
        
        Coefficient =  (valuePointReference + i)
        const newValue = internalCoefficients.goal(Coefficient,cpe_waterproof)
        accumulatedValue = Number(newValue[newValue.length-1]['acumulado'])
        const verificationZero = Math.floor(accumulatedValue)
        
        Signal = accumulatedValue < 1 ? "-" : ""

        // console.log(accumulatedValue, '<<<', i, verificationZero)
        
        if(SignalLast != Signal || verificationZero == 0) {
               
                for (let ii = 0; ii < 100; ii = ii + Number(signal + 0.0001) ) {

                    Coefficient =  (CoefficientLast + ii)
                    const newValue = internalCoefficients.goal(Coefficient,cpe_waterproof)
                    accumulatedValue = Number(newValue[newValue.length-1]['acumulado'])

                    if(accumulatedValue < (Number(signal +  0.001)*-1)) {
                        break;
                    }
                }
                return Coefficient.toFixed(3)
        }              

        SignalLast = Signal
        CoefficientLast = Coefficient
    }

} )



const equationBetween = ((angle, heightAboveTerrain,heightTerrain) => {
    return  (1 + (2.5 - (heightAboveTerrain/heightTerrain)) * Math.tan((angle - 3)*(Math.PI/180)))
});

const equationBigger = ((heightAboveTerrain,heightTerrain) => {
    return  (1 + (2.5 - (heightAboveTerrain/heightTerrain)) * 0.31)
});

const typeTerrain = ((angle, heightTerrain, heightAboveTerrain) => {
    
    let fatorS1;
    
    if((angle > 3 && angle < 6)){
        const angle_3 = 3;
        const angle_6 = 6;
        const fatorS1_3 = equationBetween(angle_3, heightAboveTerrain,heightTerrain);
        const fatorS1_6 = equationBetween(angle_6, heightAboveTerrain,heightTerrain);
        fatorS1 = Interpolation(angle,fatorS1_3,angle_3,fatorS1_6,angle_6)
        
    }else if((angle > 17 && angle < 45)){
        const angle_17 = 17;
        const angle_45 = 45;
        const fatorS1_17 = equationBetween(angle_17, heightAboveTerrain,heightTerrain);
        const fatorS1_45 = equationBetween(angle_45, heightAboveTerrain,heightTerrain);
        fatorS1 = Interpolation(angle,fatorS1_17,angle_17,fatorS1_45,angle_45)

    } else if(angle >= 6 && angle <= 17) {
        fatorS1 = equationBetween(angle,heightAboveTerrain,heightTerrain)

    } else if(angle >= 45){
        fatorS1 = equationBigger(heightAboveTerrain,heightTerrain)

    }
    
    return fatorS1.toFixed(2)
});

//flat or slightly hilly terrain: S1 = 1,0;
//Slopes e hills (Inclui interpolação)
const FatorS1 = ((valuefator, angle,heightTerrain,heightAboveTerrain) => {
    console.log(   valuefator, angle,heightTerrain,heightAboveTerrain )
    if (valuefator == 1) {
            return 1
        } else if (valuefator == 2) {
            return 0.9
        } else {
            return typeTerrain(angle,heightTerrain,heightAboveTerrain)
    }

});



const tableParametersMetereological = [ 
    [
        {
            bcategory: [ 1.10, 1.11, 1.12],
            pcategory: [ 0.06, 0.065, 0.07]
        }
    ],

    [
        {
            bcategory: [1.00 , 1.00 , 1.00],
            fcategory: [1.00 , 0.98 , 0.95],
            pcategory: [0.085 , 0.09 , 0.10]
        
        }
    ]
    ,

    [
        {
            bcategory: [ 0.94, 0.94, 0.93],
            pcategory: [0.10, 0.105, 0.115]
        }
    ],

    [
        
        {
            bcategory: [0.86, 0.85, 0.84],
            pcategory: [0.12, 0.125, 0.135]
        }
    ],

    [
        
        {
            bcategory: [0.74, 0.73, 0.71],
            pcategory: [0.15, 0.16, 0.175]
        }
    ]
     
];

const typeClassBuilding = ((greaterLengthShed) => {

    const classA = 20;
    const classB = 50;

    if (greaterLengthShed <= classA) {
        return 0; 
    } else if (greaterLengthShed <= classB) {
        return 1;
    } else {
        return 2;
    }
});

const FatorS2 = ((RoughnessTerrain,heightAboveTerrain,lengthShed,widthShed) => {
    const greaterLengthShed = (lengthShed > widthShed) ? lengthShed: widthShed;
    const classes = typeClassBuilding(greaterLengthShed)
    const parameter = tableParametersMetereological[RoughnessTerrain][0];
    const f_parameter = tableParametersMetereological[1][0].fcategory[classes]
    const b_parameter = parameter.bcategory[classes]
    const p_parameter = parameter.pcategory[classes]

    const valueFatorS2 = Number(b_parameter) * 
                        Number(f_parameter) *
                        Math.pow((heightAboveTerrain / 10), (Number(p_parameter)))

    // console.log(f_parameter,b_parameter,p_parameter)
    return valueFatorS2.toFixed(2)

});

const FatorS3 = ((group) => {

    let fatorS3;

    switch (group){
        case 0:
            fatorS3 = 1.10;
            break;

        case 1:
            fatorS3 = 1.00;
            break;

        case 2:
            fatorS3 = 0.95;
            break;

        case 3:
            fatorS3 = 0.88;
            break;

        default:
            fatorS3 = 0.83;
    }
    return fatorS3

});


const vkWind = ((windSpeed, fatorS1, fatorS2, fatorS3) => {
    const characteristicWindSpeed = windSpeed * fatorS1 * fatorS2 * fatorS3;
    return {'vk': Number(characteristicWindSpeed.toFixed(2))}
})

const dynamicWindPressure =(({vk}) => {
    
    const Effort = 0.613 * Math.pow(vk,2) / 1000
    return {'dynamicPressure': Number(Effort.toFixed(2))}
})

const calculateEffort = ((cpe_a, cpe_b, cpe_a1, cpe_b1, cpe_e_0, cpe_g_0, cpe_e_90, cpe_g_90, cpi_0, cpi_90, cpi_180, cpi_270, dinamicPressure) => {
    
    const eff_e_0 = ((cpe_e_0 - cpi_0) * dinamicPressure).toFixed(2)
    const eff_g_0 = ((cpe_g_0 - cpi_0) * dinamicPressure).toFixed(2)
    const eff_a1_0 = ((cpe_a1 - cpi_0) * dinamicPressure).toFixed(2)
    const eff_b1_0 = ((cpe_b1 - cpi_0) * dinamicPressure).toFixed(2)

    const eff_e_90 = ((cpe_e_90 - cpi_90) * dinamicPressure).toFixed(2)
    const eff_g_90 = ((cpe_g_90 - cpi_90) * dinamicPressure).toFixed(2)
    const eff_a_90 = ((cpe_a - cpi_90) * dinamicPressure).toFixed(2)
    const eff_b_90 = ((cpe_b - cpi_90) * dinamicPressure).toFixed(2)

    const eff_e_180 = ((cpe_e_0 - cpi_180) * dinamicPressure).toFixed(2)
    const eff_g_180 = ((cpe_g_0 - cpi_180) * dinamicPressure).toFixed(2)
    const eff_a1_180 = ((cpe_a1 - cpi_180) * dinamicPressure).toFixed(2)
    const eff_b1_180 = ((cpe_b1 - cpi_180) * dinamicPressure).toFixed(2)

    const eff_e_270 = ((cpe_e_90 - cpi_270) * dinamicPressure).toFixed(2)
    const eff_g_270 = ((cpe_g_90 - cpi_270) * dinamicPressure).toFixed(2)
    const eff_a_270 = ((cpe_a - cpi_270) * dinamicPressure).toFixed(2)
    const eff_b_270 = ((cpe_b - cpi_270) * dinamicPressure).toFixed(2)



    return {

        'effort_e_0':eff_e_0,
        'effort_g_0':eff_g_0,
        'effort_a1_0':eff_a1_0,
        'effort_b1_0':eff_b1_0,

        'effort_e_90':eff_e_90,
        'effort_g_90':eff_g_90,
        'effort_a_90':eff_a_90,
        'effort_b_90':eff_b_90,

        'effort_e_180':eff_e_180,
        'effort_g_180':eff_g_180,
        'effort_a1_180':eff_a1_180,
        'effort_b1_180':eff_b1_180,

        'effort_e_270':eff_e_270,
        'effort_g_270':eff_g_270,
        'effort_a_270':eff_a_270,
        'effort_b_270':eff_b_270,
    }

    
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
    },

    getRoofCoefficients(angle, width,lenght, height){  
        const Wind_0 = CoefficientsRoof_0(angle,width,lenght, height)
        const Wind_90 = CoefficientsRoof_90(angle, lenght, height)
        return {...Wind_0, ...Wind_90}
    },

    getCpiCoefficients(cpe_waterproof) {
        const cpi = PointReference(cpe_waterproof)
        console.log(cpi)
        return cpi
    },

    getfatorS1({valuefator, angle,height,distance}) {
        const fatorS1 = FatorS1(valuefator, angle,height,distance)

        return fatorS1

    },
    
    getfatorS2({RoughnessTerrain,height,length,width}) {
        const fatorS2 = FatorS2(RoughnessTerrain,height,length,width)

        return fatorS2

    },
    
    getfatorS3({group}) {
        const fatorS3 = FatorS3(group)

        return fatorS3

    },

    getDynamicWindPressure({windSpeed, fatorS1, fatorS2, fatorS3}) {
        
        const VkWind =vkWind(windSpeed, fatorS1, fatorS2, fatorS3)
        
        const DynamicWindPressure = dynamicWindPressure(VkWind)
        
        return {...VkWind,...DynamicWindPressure}

    },

    getEffort({cpe_a, cpe_b, cpe_a1, cpe_b1, cpe_e_0, cpe_g_0, cpe_e_90, cpe_g_90, cpi_0, cpi_90, cpi_180, cpi_270,dinamicPressure}) {

        const efforts = calculateEffort(cpe_a, cpe_b, cpe_a1, cpe_b1, cpe_e_0, cpe_g_0, cpe_e_90, cpe_g_90, cpi_0, cpi_90, cpi_180, cpi_270,dinamicPressure)
        
        return efforts

    }

}

