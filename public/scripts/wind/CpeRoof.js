
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
 
}   

//iNPUT
export function CoefficientsRoof_0(angleShed,a_widthShed, b_widthShed,h_heightShed) {
    let coefficientsRoof
    const lengthWidthShed = a_widthShed / b_widthShed;
    const coefficients = tableCoefficientsExternalRoof.coefficients_0
    coefficientsRoof = externalCoefficients.DefinitionCoefficientsRoof(angleShed, b_widthShed,h_heightShed, coefficients)
    coefficientsRoof = externalCoefficients.includeIJ_0(coefficientsRoof,lengthWidthShed)
    
    return coefficientsRoof
    
}
//iNPUT
export function CoefficientsRoof_90(angleShed, b_widthShed,h_heightShed) {
    let coefficientsRoof
    const coefficients = tableCoefficientsExternalRoof.coefficients_90
    coefficientsRoof = externalCoefficients.DefinitionCoefficientsRoof(angleShed, b_widthShed,h_heightShed, coefficients)
    coefficientsRoof = externalCoefficients.includeIJ_90(coefficientsRoof)
    return  coefficientsRoof
}