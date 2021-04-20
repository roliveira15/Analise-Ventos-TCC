const express = require('express');
const routes = express.Router();


const basePath = __dirname + "/views/"

// IMPORTANTE z = rightFoot + heightRoof


// --------------------------------- Input do sistema ---------------------------------
// Shed's Dimension 
const h_heightShed = 6;
const b_widthShed = 20;
const a_lengthShed = 10;

// Open doors-windows
// --- Input do sistema ---
const faceA1 = 0;
const faceA2 = 0;
const faceA3 = 0;
const faceB1 = 0;
const faceB2 = 0;
const faceB3 = 0;
const faceC1 = 0;
const faceC2 = 0;
const faceD1 = 0;
const faceD2 = 0;

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
            [
                - 0.8, 
                - 0.8,
                - 0.5,
                - 0.5,
                + 0.7,
                + 0.7,
                - 0.4,
                - 0.4,
            ]
            ,
            [
                - 0.8, 
                - 0.8,
                - 0.4,
                - 0.4,
                + 0.7,
                + 0.7,
                - 0.3,
                - 0.3,
            ]
            ,
            [
                
                - 0.9, 
                - 0.9,
                - 0.5,
                - 0.5,
                + 0.7,
                + 0.7,
                - 0.5,
                - 0.5,
            ]
            ,
            [
                - 0.9, 
                - 0.9,
                - 0.4,
                - 0.4,
                + 0.7,
                + 0.7,
                - 0.3,
                - 0.3,
            ]
            ,
            [
                - 1.0, 
                - 1.0,
                - 0.6,
                - 0.6,
                + 0.8,
                + 0.8,
                - 0.6,
                - 0.6,
            ]  
            ,
            [
                - 1.0, 
                - 1.0,
                - 0.5,
                - 0.5,
                + 0.8,
                + 0.8,
                - 0.3,
                - 0.3,
            ]
            
        ],

        coefficients_90: 
        [
            [
             + 0.7, 
             - 0.4,
             + 0.7,
             - 0.4,
             - 0.8,
             - 0.4,
             - 0.8,
             - 0.4
            ]  
            ,
            [
             + 0.7, 
             - 0.5,
             + 0.7,
             - 0.5,
             - 0.9,
             - 0.5,
             - 0.9,
             - 0.5
            ]  
            ,            
            [
             + 0.7, 
             - 0.5,
             + 0.7,
             - 0.5,
             - 0.9,
             - 0.5,
             - 0.9,
             - 0.5
            ]
            ,
            [
             + 0.7, 
             - 0.6,
             + 0.7,
             - 0.6,
             - 0.9,
             - 0.5,
             - 0.9,
             - 0.5
             ]
            ,
            [
             + 0.8, 
             - 0.6,
             + 0.8,
             - 0.6,
             - 1.0,
             - 0.6,
             - 1.0,
             - 0.6
            ]
            ,
            [
             + 0.8, 
             - 0.6,
             + 0.8,
             - 0.6,
             - 1.0,
             - 0.6,
             - 1.0,
             - 0.6,
            ]
            ,
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


    CoefficientsWall(lengthWidthShed, positionArray){
        let arrayMax, arrayMin, coefficientsWall = []
        
        const HightRelativeMin = 3/2
        const HightRelativeMax = 2

        if (lengthWidthShed > HightRelativeMin && lengthWidthShed < HightRelativeMax ) {

        
            arrayMin = [...tableCoefficientsExternalWall.coefficients_0[positionArray], 
                        ...tableCoefficientsExternalWall.coefficients_90[positionArray]]


            arrayMax = [...tableCoefficientsExternalWall.coefficients_0[positionArray + 1], 
                        ...tableCoefficientsExternalWall.coefficients_90[positionArray + 1]]


            const arrayTotal = arrayMax.length
            
            for(let i = 0; i < arrayTotal; i++){
                const coefficientMin = arrayMin[i]
                const coefficientMax = arrayMax[i]

                //interpolatorLinear.Interpolation(xa,y1,x1,y2,x2)
                const newValueCoefficients = interpolatorLinear.Interpolation(lengthWidthShed,
                                                                                coefficientMin,
                                                                                HightRelativeMin,
                                                                                coefficientMax,
                                                                                HightRelativeMax).toFixed(2)
                coefficientsWall.push(Number(newValueCoefficients))
            }


        } else {

            let positionHightRelative = 0

            if (lengthWidthShed >= 2 && lengthWidthShed <= 4 ) {
                positionHightRelative = 1
            }
            
            coefficientsWall = [...tableCoefficientsExternalWall.coefficients_0[positionArray + positionHightRelative], 
                                ...tableCoefficientsExternalWall.coefficients_90[positionArray + positionHightRelative]]
    
        }
        
        return coefficientsWall

    },

    Wall(a_lengthShed,b_widthShed,h_heightShed){
        const heightWidthShed = h_heightShed / b_widthShed;
        const lengthWidthShed = a_lengthShed / b_widthShed;
        let positionArray = 0;

        if(heightWidthShed < 1/2 ) {
            positionArray = 0
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2){
            positionArray = 2

        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            positionArray = 4
        }

        const coefficientsWall = externalCoefficients.CoefficientsWall(lengthWidthShed,positionArray)
        
        return coefficientsWall
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

//Internal Coefficients
const valuesWaterproof = [
    
    {
        face: 8,
        cpe: 0.6,
    },
    {
        face: 8,
        cpe: -0.47,
    },
    {
        face: 1.68,
        cpe: -0.47,
    },
    {
        face: 20,
        cpe: -0.87,
    },
    {
        face: 21.68,
        cpe: -0.47,
    },
    {
        face: -1.2,
        cpe: -1.15,
    },
    {
        face: -0.4,
        cpe: -0.4,
    },
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
            let FirstStep = Number(signal + 0.1)/100000   
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
                            console.log(accumulatedValue)
                            FirstStep += FirstStep
                        
                        } 

                        console.log(Coefficient)


                    break;

                } 
                
                
                // console.log(accumulatedValue, Coefficient,Signal)
                // }


                

                SignalLast = Signal
                CoefficientLast = Coefficient
                // const accumulatedLast = accumulatedValue
                step += step
                
            }

        }
    
}

internalCoefficients.PointReference()




routes.get('/', (req,res) => res.render(basePath + 'index'))


module.exports = routes;