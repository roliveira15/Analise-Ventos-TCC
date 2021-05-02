import {Interpolation} from './interpolator.js'
// const {Interpolation} = require('./interpolator.js') 

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
export function FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain){

    if (valuefator == 1) {
            return 1
        } else {

            return typeTerrain(angle,heightTerrain,heightAboveTerrain)
    }

};

