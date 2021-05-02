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
    },
    {
        face: 1,
        cpe: 1,
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
}

export function PointReference(){

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

    let Signal = ""
    const signal = Number(value) < 0 ? "-" : ""
    let step = Number(signal + 0.1)    
    let FirstStep = Number(signal + 0.1)/100000   
    let accumulatedValue = 0
    let SignalLast = signal
    let Coefficient,CoefficientLast = 0
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
        }              

        SignalLast = Signal
        CoefficientLast = Coefficient
        // const accumulatedLast = accumulatedValue
        step += step
        
    }

}  