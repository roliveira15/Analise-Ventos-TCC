const express = require('express');
const routes = express.Router();


const basePath = __dirname + "/views/"

// IMPORTANTE z = rightFoot + heightRoof

// --------------------------------- Input do sistema ---------------------------------
// Shed's Dimension 
const h_heightShed = 6;
const b_widthShed = 20;
const a_lengthShed = 10;

// Roughness of the terrain 
const RoughnessTerrain = 4;

// Wind Speed - Vo (m/s)
const windSpeed = 44;

// --------------------------------- System length ---------------------------------
// greater length
const greaterLengthShed = (a_lengthShed > b_widthShed) ? a_lengthShed: b_widthShed;

//Table 01 NBR6123/1988
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

//interpolator
const interpolatorLinear = {
    Interpolation(xa,y1,x1,y2,x2){
        return y1 + ((xa-x1)/(x2-x1)) * (y2-y1)
    }
}
//Fator S1

const fatorTopography = {

    equationBetween(angle, heightAboveTerrain,heightTerrain){
        return  (1 + (2.5 - (heightAboveTerrain/heightTerrain)) * Math.tan((angle - 3)*(Math.PI/180)))
    },
    
    equationBigger(heightAboveTerrain,heightTerrain){
        return  (1 + (2.5 - (heightAboveTerrain/heightTerrain)) * 0.31)
    },

    typeTerrain(angle, heightTerrain, heightAboveTerrain){
        
        let fatorS1 = 1;
        
        if((angle > 3 && angle < 6)){
            const angle_3 = 3;
            const angle_6 = 6;
            const fatorS1_3 = fatorTopography.equationBetween(angle_3, heightAboveTerrain,heightTerrain);
            const fatorS1_6 = fatorTopography.equationBetween(angle_6, heightAboveTerrain,heightTerrain);
            fatorS1 = interpolatorLinear.Interpolation(angle,fatorS1_3,angle_3,fatorS1_6,angle_6)
            
        }else if((angle > 17 && angle < 45)){
            const angle_17 = 17;
            const angle_45 = 45;
            const fatorS1_17 = fatorTopography.equationBetween(angle_17, heightAboveTerrain,heightTerrain);
            const fatorS1_45 = fatorTopography.equationBetween(angle_45, heightAboveTerrain,heightTerrain);
            fatorS1 = interpolatorLinear.Interpolation(angle,fatorS1_17,angle_17,fatorS1_45,angle_45)

        } else if(angle >= 6 && angle <= 17) {
            fatorS1 = fatorTopography.equationBetween(angle,heightAboveTerrain,heightTerrain)

        } else if(angle >= 45){
            fatorS1 = fatorTopography.equationBigger(heightAboveTerrain,heightTerrain)

        }
        
        return fatorS1.toFixed(2)
    },

    //flat or slightly hilly terrain: S1 = 1,0;
    //Slopes e hills (Inclui interpolação)
    FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain){

        if (valuefator == 1) {
                return 1
            } else {

                return fatorTopography.typeTerrain(angle,heightTerrain,heightAboveTerrain)
        }

    },

}

//Fator S2
const fatorDimensionShed = {

    typeClassBuilding (){

        const classA = 20;
        const classB = 50;

        if (greaterLengthShed <= classA) {
            return 0; 
        } else if (greaterLengthShed <= classB) {
            return 1;
        } else {
            return 2;
        }
    },

    FatorS2(RoughnessTerrain,heightAboveTerrain){
        const classes = fatorDimensionShed.typeClassBuilding()
        const parameter = tableParametersMetereological[RoughnessTerrain][0];
        const f_parameter = tableParametersMetereological[1][0].fcategory[classes]
        const b_parameter = parameter.bcategory[classes]
        const p_parameter = parameter.pcategory[classes]

        const valueFatoS2 = Number(b_parameter) * 
                            Number(f_parameter) *
                            Math.pow((heightAboveTerrain / 10), (Number(p_parameter)))

        // console.log(f_parameter,b_parameter,p_parameter)
        return valueFatoS2.toFixed(2)

    }
 
}

//Fator S3
const fatorStatistics = {

    FatorS3 (group){

        let fatorS3 = 0;

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
    }
}

// Dimension the effort
const effort = {

    dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3) {
        const characteristicWindSpeed = windSpeed * fatorS1 * fatorS2 * fatorS3;
        const Effort = 0.613 * Math.pow(characteristicWindSpeed,2) / 1000

        return Effort.toFixed(2)
    },

}

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

//Coefficients wall
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
    //iNPUT
    CoefficientsWall_0(a_lengthShed,b_widthShed,h_heightShed) {
        let coefficientsWall
        const lengthWidthShed = a_lengthShed / b_widthShed;
        const coefficients = tableCoefficientsExternalWall.coefficients_0
        coefficientsWall = externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
        coefficientsWall = externalCoefficients.includeA3B3(coefficientsWall,lengthWidthShed)
        return coefficientsWall
    },
    //iNPUT
    CoefficientsWall_90(a_lengthShed,b_widthShed,h_heightShed) {
        const coefficients = tableCoefficientsExternalWall.coefficients_90
        return externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
       
    },
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
            coefficientsI = coefficientsRoof.F
            coefficientsJ = coefficientsRoof.H

        } else if(lengthWidthShed >= 2) {
            coefficientsI = -0.2
            coefficientsJ = -0.2

        } else {
            coefficientsI  = Number(interpolatorLinear.Interpolation((lengthWidthShed),-0.2,2,coefficientsRoof.F,1).toFixed(2))
            coefficientsJ  = Number(interpolatorLinear.Interpolation((lengthWidthShed),-0.2,2,coefficientsRoof.H,1).toFixed(2))
        }

        coefficientsRoof = {...coefficientsRoof,
                            'I': coefficientsI, 
                            'J': coefficientsJ}

        return coefficientsRoof
    },
    //#3
    includeIJ_90(coefficientsRoof){

    coefficientsRoof = {...coefficientsRoof,
                        'I': coefficientsRoof.F, 
                        'J': coefficientsRoof.H}

    return coefficientsRoof
    },

    DefinitionCoefficientsRoof(angleShed, b_widthShed,h_heightShed, coefficients){

        let coefficientsRoof = {}
        let coefficientsRoofAux = []

        
        const heightWidthShed = h_heightShed / b_widthShed;
        const AngleShed = [0,5,10,15,20,30,45,50,60]
        const angle_shed = AngleShed.length
        const HightRelativeHB = externalCoefficients.hightRelativeHBRoof(heightWidthShed)

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
                                const newValueCoefficients = interpolatorLinear.Interpolation(angleShed,
                                                                                                coefficientMin,
                                                                                                AngleShed[positionMin],
                                                                                                coefficientMax,
                                                                                                AngleShed[positionMax]).toFixed(2)

                                coefficientsRoofAux.push(Number(newValueCoefficients))
                }

                coefficientsRoof = {...coefficientsRoof,
                                        'E': coefficientsRoofAux[0], 
                                        'F': coefficientsRoofAux[1],
                                        'G': coefficientsRoofAux[2],
                                        'H': coefficientsRoofAux[3]}
                  
                break;
            }
        }

        return coefficientsRoof
        
    },
    //iNPUT
    CoefficientsRoof_0(angleShed,a_widthShed, b_widthShed,h_heightShed) {
        let coefficientsRoof
        const lengthWidthShed = a_widthShed / b_widthShed;
        const coefficients = tableCoefficientsExternalRoof.coefficients_0
        coefficientsRoof = externalCoefficients.DefinitionCoefficientsRoof(angleShed, b_widthShed,h_heightShed, coefficients)
        coefficientsRoof = externalCoefficients.includeIJ_0(coefficientsRoof,lengthWidthShed)
        
        return coefficientsRoof
        
    },
    //iNPUT
    CoefficientsRoof_90(angleShed, b_widthShed,h_heightShed) {
        let coefficientsRoof
        const coefficients = tableCoefficientsExternalRoof.coefficients_90
        coefficientsRoof = externalCoefficients.DefinitionCoefficientsRoof(angleShed, b_widthShed,h_heightShed, coefficients)
        coefficientsRoof = externalCoefficients.includeIJ_90(coefficientsRoof)
        return  coefficientsRoof
    }
}

//Internal Coefficients
const valuesWaterproof = [
    
    {
        face: 6,
        cpe: 0.8,
    },
    {
        face: 0.6,
        cpe: -0.60,
    },
    {
        face: 0.23,
        cpe: -1.0,
    },
    {
        face: 0.23,
        cpe: -0.60,
    }
]

const internalCoefficients = {
    
        round(number, decimalPlaces){
            const factorOfTen = Math.pow(10, decimalPlaces)
            return Math.round(number * factorOfTen) / factorOfTen 
        },

        goal(ci_firts){
    
            const ci = ci_firts;
            let acumulado = 0;
            
            const Acumulado = valuesWaterproof.map(proof => {
    
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
    
        PointReference(){

            let value, valuePointReference  = 0
         
            const valueReference_1 = 1;
            const valueReference_2 = -1;

            const higherValue = internalCoefficients.goal(valueReference_2)
            const lowestValue = internalCoefficients.goal(valueReference_1)
            const valueHigher = Number(higherValue[higherValue.length-1]['acumulado'])
            const valueLowest = Number(lowestValue[lowestValue.length-1]['acumulado'])

            if( Math.abs(valueHigher) < Math.abs(valueLowest) ) {
                value = valueHigher
                valuePointReference = valueReference_2

            } else {
                value = valueLowest
                valuePointReference = valueReference_1
            }

            let newStep = 0
            const signal = Number(value) < 0 ? "-" : ""
            let step = Number(signal + 0.1)    
            let FirstStep = Number(signal + 0.1)/10000   
            let chanceValue = false
            let accumulatedValue = 0
            let SignalLast = signal

            for (let i = 0; i < 10; i++) {

                Coefficient =  (valuePointReference + step)
                
                const newValue = internalCoefficients.goal(Coefficient)
                accumulatedValue = Number(newValue[newValue.length-1]['acumulado'].toFixed(3))
                
                const verificationZero = Math.floor(accumulatedValue)
                Signal = accumulatedValue < 0 ? "-" : ""
                
                
                if(SignalLast != Signal || verificationZero == 0) {
                    
                        let ver = false;
            
                        for (let ii = 0; ii < 100; ii++) {
                            ii += 1 
                            Coefficient =  (CoefficientLast + FirstStep)
                            const newValue = internalCoefficients.goal(Coefficient)
                            accumulatedValue = Number(newValue[newValue.length-1]['acumulado'])

                            if(Math.abs(accumulatedValue) * 100 < 10) {
                                break;
                            }
                            
                            FirstStep += FirstStep
                        
                        } 

                        return Coefficient.toFixed(2)
                    break;

                }              

                SignalLast = Signal
                CoefficientLast = Coefficient
                // const accumulatedLast = accumulatedValue
                step += step
                
            }

        }  
}

//dimension of the shed
const shed = {

    dimensionWind_0(b_widthShed, a_lengthShed, h_heightShed){
        let dimension = new Object
        let length_A1

        const comparete_1 = b_widthShed / 3
        const comparete_2 = a_lengthShed / 4
        const comparete_3 = h_heightShed * 2
        const halfLenght = (a_lengthShed/ 2)
        const halfWidth = (b_widthShed/ 2)

        if (comparete_1 > comparete_2) {
            length_A1 = comparete_1
        } else if (comparete_2 < comparete_3) {
            length_A1 = comparete_2
        } else {
            length_A1 = comparete_3
        }
        console.log(comparete_1,comparete_2,comparete_3)
        const length_A2 = halfLenght - length_A1
        const length_A3 = halfLenght
        const length_B1 = length_A1
        const length_B2 = length_A2
        const length_B3 = length_A3
        const length_C = b_widthShed
        const length_D = b_widthShed

            
        dimension = {
            'A1': length_A1,
            'A2': length_A2,
            'A3': length_A3,
            'B1': length_B1,
            'B2': length_B2,
            'B3': length_B3, 
            'C': length_C,
            'D': length_D,
        }

        return dimension
    },

    dimensionWind_90(b_widthShed, a_lengthShed, h_heightShed){
        let dimension = new Object
   
        const comparete_1 = b_widthShed / 2
        const comparete_2 = h_heightShed * 2
     
        const length_A = a_lengthShed
        const length_B = a_lengthShed
        const length_C1 = (comparete_1 < comparete_2) ? comparete_1 : comparete_2
        const length_C2 = b_widthShed - length_C1
        const length_D1 = length_C1
        const length_D2 = length_C2

        dimension = {
            'A': length_A,
            'B': length_B,
            'C1': length_C1,
            'C2': length_C2,
            'D1': length_D1,
            'D2': length_D2
        }

        return dimension
    },

}

const combinationsCoefficients = {

    definitionInternalCoefficientes_0 (a_lengthShed,b_widthShed,h_heightShed, angleShed) {   
        const higherCoefficients = new Object
        const coefficientsRoof_0 = externalCoefficients.CoefficientsRoof_0(angleShed,a_lengthShed, b_widthShed,h_heightShed)
        const coefficientsWall_0 = externalCoefficients.CoefficientsWall_0(a_lengthShed, b_widthShed,h_heightShed)
    
        return {...higherCoefficients,
                    'A1': coefficientsWall_0.A1,
                    'B1': coefficientsWall_0.B1,
                    'E': coefficientsRoof_0.E,
                    'G': coefficientsRoof_0.G}
    },

    definitionInternalCoefficientes_90 (a_lengthShed,b_widthShed,h_heightShed, angleShed) {
        const higherCoefficients = new Object
        const coefficientsRoof_90 = externalCoefficients.CoefficientsRoof_90(angleShed, b_widthShed,h_heightShed)
        const coefficientsWall_90 = externalCoefficients.CoefficientsWall_90(a_lengthShed,b_widthShed,h_heightShed)
        
        return {...higherCoefficients,
                    'A': coefficientsWall_90.A,
                    'B': coefficientsWall_90.B,
                    'E': coefficientsRoof_90.E,
                    'G': coefficientsRoof_90.G}
    },

    combinations_0(a_lengthShed,b_widthShed,h_heightShed, angleShed){
        let valuesCoefficients= new Object

        const externalCoefficients_0 = combinationsCoefficients.definitionInternalCoefficientes_0(a_lengthShed,b_widthShed,h_heightShed, angleShed)
        const internalCoefficients_0 = internalCoefficients.PointReference()

        valuesCoefficients = Object.values(externalCoefficients_0)
        
        const Combinations = valuesCoefficients.map(item => {
            return Number((item * internalCoefficients_0).toFixed(2));
         });

         return Combinations
    },

    combinations_90(a_lengthShed,b_widthShed,h_heightShed, angleShed){
        let valuesCoefficients= new Object

        const externalCoefficients_90 = combinationsCoefficients.definitionInternalCoefficientes_90(a_lengthShed,b_widthShed,h_heightShed, angleShed)
        const internalCoefficients_90 = internalCoefficients.PointReference()

        valuesCoefficients = Object.values(externalCoefficients_90)
        
        const Combinations = valuesCoefficients.map(item => {
            return Number((item * internalCoefficients_90).toFixed(2));
         });
        //  console.log(externalCoefficients_0,internalCoefficients_0)
         return Combinations
    },

    effort_0(valuefator, angle,heightTerrain,heightAboveTerrain, RoughnessTerrain, group, windSpeed, a_widthShed,b_widthShed,h_heightShed, angleShed){
        let valuesCoefficients = new Object

        const fatorS1 = fatorTopography.FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain)
        const fatorS2 = fatorDimensionShed.FatorS2(RoughnessTerrain,heightAboveTerrain)
        const fatorS3 = fatorStatistics.FatorS3 (group)

        const valueEffort =  effort.dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3)
        const coefficients = combinations_0(a_lengthShed,b_widthShed,h_heightShed, angleShed)



        return 
    },

    effort_90(valuefator, angle,heightTerrain,heightAboveTerrain, RoughnessTerrain, group, windSpeed, a_widthShed,b_widthShed,h_heightShed, angleShed){
        let valuesCoefficients = new Object

        const fatorS1 = fatorTopography.FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain)
        const fatorS2 = fatorDimensionShed.FatorS2(RoughnessTerrain,heightAboveTerrain)
        const fatorS3 = fatorStatistics.FatorS3 (group)

        const Effort =  effort.dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3)




        return 
    }
}

// console.log(combinationsCoefficients.effort_0(2,3,2,4,3,2,33,20,10,6,15))


routes.get('/', (req,res) => res.render(basePath + 'index'))
//

module.exports = routes;
