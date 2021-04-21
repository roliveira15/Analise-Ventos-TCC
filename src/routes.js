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
    FatorS1(value, angle,heightTerrain,heightAboveTerrain){

        if (value == 1) {
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

        console.log(f_parameter,b_parameter,p_parameter)
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
            0° :
                 [E = - 0.8, F= - 0.8, G = - 0.5, H = - 0.5]
            5º : .....
            
        */
        
    coefficients_0: [
    
        [
            [-0.8, -0.8, -0.4, -0.4],
            [-0.9, -0.9, -0.4, -0.4],
            [-1.2, -1.2, -0.4, -0.4],
            [-1.0, -1.0, -0.4, -0.4],
            [-0.4, -0.4, -0.4, -0.4],
            [0.0, 0.0, -0.4, -0.4],
            [+0.3, +0.3, -0.5, -0.5],
            [+0.7, +0.7, -0.6, -0.6],
        ],

        [
            [-0.8, -0.8, -0.6, -0.6],
            [-0.9, -0.9, -0.6, -0.6],
            [-1.1, -1.1, -0.6, -0.6],
            [-1.0, -1.0, -0.6, -0.6],
            [-0.7, -0.7, -0.6, -0.6],
            [0.2, 0.2, -0.6, -0.6],
            [+0.2, +0.2, -0.6, -0.6],
            [+0.6, +0.6, -0.6, -0.6],
        ],

        [     
            [-0.8,  -0.8,	-0.6, -0.6],
            [-0.8,  -0.8,	-0.6, -0.6],
            [-0.8,  -0.8,	-0.6, -0.6],
            [-0.8,  -0.8,	-0.6, -0.6],
            [-0.8,  -0.8,	-0.6, -0.6],
            [-1.0,  -1.0,	-0.5, -0.5],
            [-0.2,  -0.2,	-0.5, -0.5],
            [+0.5,  +0.5,	-0.5, -0.5],
            [+0.2,  +0.2,	-0.5, -0.5],
        ],
    ],

    coefficients_90: [

        [
            [-0.8, -0.8, -0.4, -0.4],	
            [-0.8, -0.8, -0.4, -0.4],
            [-0.8, -0.8, -0.6, -0.6],
            [-0.8, -0.8, -0.6, -0.6],
            [-0.7, -0.7, -0.6, -0.6],
            [-0.7, -0.7, -0.6, -0.6],
            [-0.7, -0.7, -0.6, -0.6],
            [-0.7, -0.7, -0.6, -0.6],
        ],

        [
            [-1.0, -1.0, -0.6, -0.6],
            [-0.9, -0.9, -0.6, -0.6],
            [-0.8, -0.8, -0.6, -0.6],
            [-0.8, -0.8, -0.6, -0.6],
            [-0.8, -0.8, -0.6, -0.6],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.8, -0.8],
        ],

        [
            [-0.9, -0.9, -0.7, -0.7],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.8, -0.8],
            [-0.8, -0.8, -0.7, -0.7],
            [-0.8, -0.8, -0.7, -0.7],
            [-0.8, -0.8, -0.7, -0.7],
            [-0.8, -0.8, -0.7, -0.7],
        ]      
    ]
}

//Coefficients wall
const externalCoefficients = {

    // COEFFICIENT 0º
    //#1
    hightRelativeHB(heightWidthShed){
        let position

        if(heightWidthShed < 1/2 ) {
            position = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2 ){
            position = 2

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            position = 4
        }

        return position
    },
    //#2
    hightRelativeAB (lengthWidthShed){


        return ((lengthWidthShed > 3/2 && lengthWidthShed < 2 ) ? 0 : 1);

    },
    //#3
    positionHightRelative(lengthWidthShed){

        return ((lengthWidthShed >= 2 && lengthWidthShed <= 4 ) ? 1 : 0);
    },
    //#4
    createdObjectInterpolation(valueMin, valueMax, lengthWidthShed){
        let coefficientsWall = {}
        let coefficientsWallAux = []
        const lenghtTotal = Object.keys(valueMax).length
        
        for(let i = 0; i < lenghtTotal; i++){
            const coefficientMin = Object.values(valueMin)[i]
            const coefficientMax = Object.values(valueMax)[i]
            
            //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
            const newValueCoefficients = interpolatorLinear.Interpolation((lengthWidthShed),coefficientMin,3/2,coefficientMax,2).toFixed(2)
            
            coefficientsWallAux.push(Number(newValueCoefficients))
            
        }
 
        if (Object.keys(valueMin)[0] == 'A1') {
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
    DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients){
        const heightWidthShed = h_heightShed / b_widthShed;
        const lengthWidthShed = a_lengthShed / b_widthShed;

        const HightRelativeHB = externalCoefficients.hightRelativeHB(heightWidthShed)
        const HightRelativeAB = externalCoefficients.hightRelativeAB(lengthWidthShed)
        const PositionHightRelative = externalCoefficients.positionHightRelative(lengthWidthShed)
        
        //if need the interpolation 
        if (HightRelativeAB == 0) {
            const valueMin = coefficients[HightRelativeHB]
            const valueMax = coefficients[HightRelativeHB + 1]
            coefficientsWall = externalCoefficients.createdObjectInterpolation(valueMin,valueMax,lengthWidthShed)
            
        } else { 
            coefficientsWall = tableCoefficientsExternalWall.coefficients_0[PositionHightRelative + HightRelativeHB]
        }

        return coefficientsWall
        
    },
    //iNPUT
    CoefficientsWall_0(a_lengthShed,b_widthShed,h_heightShed) {
        const coefficients = tableCoefficientsExternalWall.coefficients_0
        return externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
        
    },
    //iNPUT
    CoefficientsWall_90(a_lengthShed,b_widthShed,h_heightShed) {
        const coefficients = tableCoefficientsExternalWall.coefficients_90
        return externalCoefficients.DefinitionCoefficientsWall(a_lengthShed,b_widthShed,h_heightShed, coefficients)
        
    },


    // COEFFICIENT 00º
    //#1
    hightRelativeHB(heightWidthShed){
        let position

        if(heightWidthShed < 1/2 ) {
            position = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2 ){
            position = 2

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            position = 4
        }

        return position
    },
    
    CoefficientsRoof(angleShed, positionArray){
    
        const AngleShed = [0,5,10,15,20,30,45,60,50]
        const angle_shed = AngleShed.length

        let arrayMax, arrayMin, coefficientsRoof = [];
        let positionArrayAngle, positionArrayAngleMin, positionArrayAngleMax = 0;

        for (let i = 0; i < angle_shed;  i++) {

            if (angleShed == AngleShed[i]) {
                coefficientsRoof = [...tableCoefficientsExternalRoof.coefficients_0[positionArray][i], 
                                    ...tableCoefficientsExternalRoof.coefficients_90[positionArray][i]]
                break;

            } else if(angleShed < AngleShed[i]) {
                const positionArrayAngleMin = i-1
                const positionArrayAngleMax = i

                arrayMin = [...tableCoefficientsExternalRoof.coefficients_0[positionArray][positionArrayAngleMin], 
                            ...tableCoefficientsExternalRoof.coefficients_90[positionArray][positionArrayAngleMin]]


                arrayMax = [...tableCoefficientsExternalRoof.coefficients_0[positionArray][positionArrayAngleMax], 
                            ...tableCoefficientsExternalRoof.coefficients_90[positionArray][positionArrayAngleMax]]

        
                const arrayTotal = arrayMax.length

                for(let ii = 0; ii < arrayTotal; ii++){
                                const coefficientMin = arrayMin[ii]
                                const coefficientMax = arrayMax[ii]

                                //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
                                const newValueCoefficients = interpolatorLinear.Interpolation(angleShed,
                                                                                                coefficientMin,
                                                                                                AngleShed[positionArrayAngleMin],
                                                                                                coefficientMax,
                                                                                                AngleShed[positionArrayAngleMax]).toFixed(2)
                                coefficientsRoof.push(Number(newValueCoefficients))
                }

                break;
            }
        }

        return coefficientsRoof

    },

    Roof(angleShed, b_widthShed,h_heightShed){

        const heightWidthShed = h_heightShed / b_widthShed;

        let positionArray = 0;

        if(heightWidthShed < 1/2 ) {
            positionArray = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2){
            positionArray = 1

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            positionArray = 2
        }

        const coefficientsRoof = externalCoefficients.CoefficientsRoof(Number(angleShed),positionArray)

        return coefficientsRoof
    }

}

console.log(externalCoefficients.CoefficientsWall_0(16,10,6))

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

    dimensionWind_0(widthShed, lengthShed, heightShed){
        let dimension = {}
        let length_A1 = 0

        const comparete_1 = widthShed / 3
        const comparete_2 = lengthShed / 4
        const comparete_3 = heightShed * 2
        const halfLenght = (lengthShed/ 2)
        const halfWidth = (widthShed/ 2)

        if (comparete_1 > comparete_2) {
            length_A1 = comparete_1
        } else if (comparete_2 < comparete_3) {
            length_A1 = comparete_2
        } else {
            length_A1 = comparete_3
        }

        const length_A2 = halfLenght - length_A1
        const length_A3 = halfLenght
        const length_B1 = length_A1
        const length_B2 = length_A2
        const length_B3 = halfLenght
        const length_C = halfWidth
        const length_D = halfWidth

            
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

    dimensionWind_90(widthShed, lengthShed, heightShed){
        let dimension = {}
   
        const comparete_1 = widthShed / 2
        const comparete_2 = heightShed * 2

        const divisionLenght = (lengthShed / 3)

        const length_A = divisionLenght
        const length_B = divisionLenght
        const length_C1 = (comparete_1 < comparete_2) ? comparete_1 : comparete_2
        const length_C2 = widthShed - length_C1
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

// const valuesWaterproofAreas = {
//     WaterproofArea: {
//         'A1': 0,
//         'A2': 0,
//         'A3': 0,
//         'B1': 0,
//         'B2': 0,
//         'B3': 0, 
//         'C1': 0,
//         'C2': 0,
//         'D1': 0,
//         'D2': 0
//     }
// }


//Comnation the faces with waterproof areas

const combinationsCoefficients = {

    combination_0 (lengthShed,widthShed,heightShed) {
        const CoefficientsWall = externalCoefficients.Wall(lengthShed,widthShed,heightShed)
        const Combination_0 = CoefficientsWall.map ( coef =>{

            
            console.log(coef)



        })


    },
    combination_90 () {


        
    },
    combination_180 () {


        
    },
    combination_270 () {


        
    },
    definitionsAngle(faceA1,faceA2, faceA3,
                    faceB1, faceB2, faceB3, faceC1, 
                    faceC2, faceD1, faceD2,
                    widthShed,lengthShed,heightShed) {

        const Faces_0 = combinationsCoefficients.combination_0(widthShed, lengthShed, heightShed)
        

    }

}



// console.log(combinationsCoefficients.definitionsAngle(0,0,0,0,0,0,0,0,0,0,10,30,6))

routes.get('/', (req,res) => res.render(basePath + 'index'))


module.exports = routes;