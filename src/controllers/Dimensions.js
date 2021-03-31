// --------------------------------- Input do sistema ---------------------------------
// Shed's Dimension 
const h_heightShed = 6;
const b_widthShed = 15;
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

// Roughness of the terrain - FATOR S3
const RoughnessTerrain = 4;

// Wind Speed - Vo (m/s)
const windSpeed = 44;

// --------------------------------- System length ---------------------------------
// greater length
const greaterLengthShed = (a_lengthShed > b_widthShed) ? a_lengthShed: b_widthShed;

// Parameters of root and wall - Cpe 
const heightWidthShed = h_heightShed / b_widthShed;
const lengthWidthShed = a_lengthShed / b_widthShed;

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
            pcategory: [0.06, 0.065, 0.07],
            fcategory: [0.085 , 0.09 , 0.10]
        
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

//Defining the type of topography (Building's Dimension- Fator S1)
//Table 01


//Defining the type of class (Building's Dimension- Fator S3)
const dimensionShed = {

    
    typeclassBuilding (){

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

    typeRoughnessTerrain(RoughnessTerrain){
        const classes = dimensionShed.typeclassBuilding();
        return a = tableParametersMetereological[RoughnessTerrain][0].bcategory[classes];
    }
 
}

console.log(dimensionShed.typeRoughnessTerrain(0))

   //Defining the height of the terrain (Fator S2)
    // typeclassBuilding (greaterLengthShed){
    //     const fatorS2 = b*Fr*(z/10)^p;
    //     return fatorS2
    // }

//S2 = b*Fr*(z/10)^p
//Vk = Vo*S1*S2*S3
//q = 0,613(Vk)^2


