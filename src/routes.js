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
    terrainVariations(value, angle,heightTerrain,heightAboveTerrain){

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

    fatorS2(RoughnessTerrain,heightAboveTerrain){
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

    typeEdifications (group){

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

// Coefficients wall and roof to wall (0º e 90º)
const tableCoefficientsExternal = {
        coefficients_0: 
        [
           [    
               coefficients = {
                    A1: - 0.8, 
                    B1: - 0.8,
                    A2: - 0.5,
                    B2: - 0.5,
                    C1: + 0.7,
                    C2: + 0.7,
                    D1: - 0.4,
                    D2: - 0.4,
                    D3: - 0.4,
                }
            ],

            [
                coefficients = {
                    A1: - 0.8, 
                    B1: - 0.8,
                    A2: - 0.4,
                    B2: - 0.4,
                    C1: + 0.7,
                    C2: + 0.7,
                    D1: - 0.3,
                    D2: - 0.3,
                    D3: - 0.4,
                }
            ],

            [
                coefficients = {
                    
                    A1: - 0.9, 
                    B1: - 0.9,
                    A2: - 0.5,
                    B2: - 0.5,
                    C1: + 0.7,
                    C2: + 0.7,
                    D1: - 0.5,
                    D2: - 0.5,
                    D3: - 0.4,
                }
            ],

            [
                coefficients = {
                    
                    A1: - 0.9, 
                    B1: - 0.9,
                    A2: - 0.4,
                    B2: - 0.4,
                    C1: + 0.7,
                    C2: + 0.7,
                    D1: - 0.3,
                    D2: - 0.3,
                    D3: - 0.4,
                }
            ],

            [
                coefficients = {
                    
                    A1: - 0.9, 
                    B1: - 0.9,
                    A2: - 0.4,
                    B2: - 0.4,
                    C1: + 0.7,
                    C2: + 0.7,
                    D1: - 0.3,
                    D2: - 0.3,
                    D3: - 0.4,
                }
            ],

            [
                coefficients = {
                
                    A1: - 1.0, 
                    B1: - 1.0,
                    A2: - 0.6,
                    B2: - 0.6,
                    C1: + 0.8,
                    C2: + 0.8,
                    D1: - 0.6,
                    D2: - 0.6,
                    D3: - 0.4,
                }, 

            
            ],
            
            [
                coefficients = {
                    
                    A1: - 1.0, 
                    B1: - 1.0,
                    A2: - 0.5,
                    B2: - 0.5,
                    C1: + 0.8,
                    C2: + 0.8,
                    D1: - 0.3,
                    D2: - 0.3,
                    D3: - 0.4,
                } 
            ]
        ],

        coefficients_90: 
        [
            [
                coefficients = {
                A1: + 0.7, 
                B1: - 0.4,
                A2: + 0.7,
                B2: - 0.4,
                C1: - 0.8,
                C2: - 0.4,
                D1: - 0.8,
                D2: - 0.4,
                D3: - 0.4,
                }  
            ],
            
            [
                coefficients = {
                A1: + 0.7, 
                B1: - 0.5,
                A2: + 0.7,
                B2: - 0.5,
                C1: - 0.9,
                C2: - 0.5,
                D1: - 0.9,
                D2: - 0.5,
                D3: - 0.4,
                }  
            ],

            [
                coefficients = {
                A1: + 0.7, 
                B1: - 0.5,
                A2: + 0.7,
                B2: - 0.5,
                C1: - 0.9,
                C2: - 0.5,
                D1: - 0.9,
                D2: - 0.5,
                D3: - 0.4,
                }  
            ],
    
            [
                coefficients = {
                A1: + 0.7, 
                B1: - 0.6,
                A2: + 0.7,
                B2: - 0.6,
                C1: - 0.9,
                C2: - 0.5,
                D1: - 0.9,
                D2: - 0.5,
                D3: - 0.4,
                }  
            ],

            [
                coefficients = {
                A1: + 0.8, 
                B1: - 0.6,
                A2: + 0.8,
                B2: - 0.6,
                C1: - 1.0,
                C2: - 0.6,
                D1: - 1.0,
                D2: - 0.6,
                D3: - 0.4,
                }
            ],

            [
                coefficients = {
                A1: + 0.8, 
                B1: - 0.6,
                A2: + 0.8,
                B2: - 0.6,
                C1: - 1.0,
                C2: - 0.6,
                D1: - 1.0,
                D2: - 0.6,
               
                }
            ],
                
        ]    
}

//Coefficients wall
const externalCoefficients = {


    heightRelative(lengthWidthShed, positionArray){
        let arrayMax = []
        
        if (lengthWidthShed > 3/2 && lengthWidthShed < 2 ) {

            const valuescoefficientsMin_0 = tableCoefficientsExternal.coefficients_0[positionArray]
            const valuescoefficientsMin_90 = tableCoefficientsExternal.coefficients_90[positionArray]
            const valuescoefficientsMax_0 = tableCoefficientsExternal.coefficients_0[positionArray + 1]
            const valuescoefficientsMax_90 = tableCoefficientsExternal.coefficients_90[positionArray + 1]

            arrayMaxAux =  valuescoefficientsMax_0.concat(valuescoefficientsMax_90)
            arrayMinAux =  valuescoefficientsMin_0.concat(valuescoefficientsMin_90)
            console.log(Object.keys(coefficients).length)
            console.log(arrayMaxAux)   
            
            
            // for(let i = 0; i < arrayMaxAux.length; i++){
            //     const coefficienMin = arrayMaxAux[i]
            //     const coefficientMax = arrayMinAux[i]

            //     const newValueCoefficients = interpolatorLinear.Interpolation(lengthWidthShed,fatorS1_3,angle_3,fatorS1_6,angle_6)
            //     arrayMax.push(newValueCoefficients)
            // }


        } else {

            let positionHightRelative = 0

            if (lengthWidthShed >= 2 && lengthWidthShed <= 4 ) {
                positionHightRelative = 1
            }

            const valuescoefficientsMax_0 = tableCoefficientsExternal.coefficients_0[positionArray + positionHightRelative]
            const valuescoefficientsMax_90 = tableCoefficientsExternal.coefficients_90[positionArray + positionHightRelative]
            arrayMax =  valuescoefficientsMax_0.concat(valuescoefficientsMax_90)

        }
        console.log(arrayMax)
        //return arrayMax

    },

    Wall(a_lengthShed,b_widthShed,h_heightShed){
        const heightWidthShed = h_heightShed / b_widthShed;
        const lengthWidthShed = a_lengthShed / b_widthShed;
        let posicionArray = 0;


        if(heightWidthShed< 1/2 ) {
            posicionArray = 0
            console.log('0')
        
        } else if (heightWidthShed > 1/2 && heightWidthShed <= 3/2){
            posicionArray = 2
            console.log('1')


        } else if (heightWidthShed > 3/2 && heightWidthShed <= 6){
            posicionArray = 4
            console.log('2')

        }

        const valuescoefficientsExternalWall = externalCoefficients.heightRelative(lengthWidthShed,posicionArray)
        
        return valuescoefficientsExternalWall
    },

    Roof(){

        return coefficients
    }


}

externalCoefficients.Wall(16,10,6)



routes.get('/', (req,res) => res.render(basePath + 'index'))


module.exports = routes;