import {dimensionWind_90,dimensionWind_0} from './wind/Dimension.js'
import {Interpolation} from './wind/interpolator.js'
import {FatorS1} from './wind/FatorS1.js'
import {FatorS2} from './wind/FatorS2.js'
import {FatorS3} from './wind/FatorS3.js'
import {dynamicWindPressure} from './wind/Effort.js'
import {CoefficientsWall_0,CoefficientsWall_90} from './wind/CpeWall.js'
import {CoefficientsRoof_0,CoefficientsRoof_90} from './wind/CpeRoof.js'
import {PointReference} from './wind/Cpi.js'

dimensionWind_0(b_widthShed, a_lengthShed, h_heightShed)


export function definitionInternalCoefficientes_0 (a_lengthShed,b_widthShed,h_heightShed, angleShed) {   
    const higherCoefficients = new Object
    const coefficientsRoof_0 = CoefficientsRoof_0(angleShed,a_lengthShed, b_widthShed,h_heightShed)
    const coefficientsWall_0 = CoefficientsWall_0(a_lengthShed, b_widthShed,h_heightShed)

    return {...higherCoefficients,
                'A1': coefficientsWall_0.A1,
                'B1': coefficientsWall_0.B1,
                'E': coefficientsRoof_0.E,
                'G': coefficientsRoof_0.G}
}

export function definitionInternalCoefficientes_90 (a_lengthShed,b_widthShed,h_heightShed, angleShed) {
    const higherCoefficients = new Object
    const coefficientsRoof_90 = CoefficientsRoof_90(angleShed, b_widthShed,h_heightShed)
    const coefficientsWall_90 = CoefficientsWall_90(a_lengthShed,b_widthShed,h_heightShed)
    
    return {...higherCoefficients,
                'A': coefficientsWall_90.A,
                'B': coefficientsWall_90.B,
                'E': coefficientsRoof_90.E,
                'G': coefficientsRoof_90.G}
}

export function combinations_0(a_lengthShed,b_widthShed,h_heightShed, angleShed){
    let valuesCoefficients= new Object

    const externalCoefficients_0 = definitionInternalCoefficientes_0(a_lengthShed,b_widthShed,h_heightShed, angleShed)
    const internalCoefficients_0 = PointReference()

    valuesCoefficients = Object.values(externalCoefficients_0)
    
    const Combinations = valuesCoefficients.map(item => {
        return Number((item * internalCoefficients_0).toFixed(2));
        });

        return Combinations
}

export function combinations_90(a_lengthShed,b_widthShed,h_heightShed, angleShed){
    let valuesCoefficients= new Object

    const externalCoefficients_90 = definitionInternalCoefficientes_90(a_lengthShed,b_widthShed,h_heightShed, angleShed)
    const internalCoefficients_90 = PointReference()

    valuesCoefficients = Object.values(externalCoefficients_90)
    
    const Combinations = valuesCoefficients.map(item => {
        return Number((item * internalCoefficients_90).toFixed(2));
        });
    //  console.log(externalCoefficients_0,internalCoefficients_0)
        return Combinations
}

export function effort_0(valuefator, angle,heightTerrain,heightAboveTerrain, RoughnessTerrain, group, windSpeed, a_widthShed,b_widthShed,h_heightShed, angleShed){
    let valuesCoefficients = new Object

    const fatorS1 = FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain)
    const fatorS2 = FatorS2(RoughnessTerrain,heightAboveTerrain)
    const fatorS3 = FatorS3 (group)

    const valueEffort =  dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3)
    const coefficients = combinations_0(a_lengthShed,b_widthShed,h_heightShed, angleShed)

    return 
}

export function effort_90(valuefator, angle,heightTerrain,heightAboveTerrain, RoughnessTerrain, group, windSpeed, a_widthShed,b_widthShed,h_heightShed, angleShed){
    let valuesCoefficients = new Object

    const fatorS1 = FatorS1(valuefator, angle,heightTerrain,heightAboveTerrain)
    const fatorS2 = FatorS2(RoughnessTerrain,heightAboveTerrain)
    const fatorS3 = FatorS3 (group)

    const Effort = dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3)

    return 
}
