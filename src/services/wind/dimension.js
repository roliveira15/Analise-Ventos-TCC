


const getDimensionWind0 = ((width, length, height) => {

    let length_A1
    const comparete_1 = (width / 3).toFixed(2)
    const comparete_2 = (length / 4).toFixed(2)
    const comparete_3 = (height * 2).toFixed(2)
    const halfLenght = (length/ 2).toFixed(2)

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


module.exports = {
    getAngle(width,heightRoof) {
        return Angle_Roof(width,heightRoof)
    },

    getDimensionsShed(width,lenght, height){
        const Wind_0 = getDimensionWind0(width,lenght, height)
        const Wind_90 = getDimensionWind90(width,lenght, height)
        return {...Wind_0, ...Wind_90}
    }
}