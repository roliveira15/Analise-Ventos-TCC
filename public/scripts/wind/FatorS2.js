

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

export function FatorS2(RoughnessTerrain,heightAboveTerrain,a_lengthShed,b_widthShed){
    const greaterLengthShed = (a_lengthShed > b_widthShed) ? a_lengthShed: b_widthShed;
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

};

