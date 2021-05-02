export function dimensionWind_0(b_widthShed, a_lengthShed, h_heightShed){
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
};

export function dimensionWind_90(b_widthShed, a_lengthShed, h_heightShed){
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
};
