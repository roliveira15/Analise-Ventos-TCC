let waterproof = [
    
    {
        face: 6,
        cpe: 0.8,
    },
    {
        face: 0.6,
        cpe: 0.6,
    },
    {
        face: 0.23,
        cpe: -1,
    },
    {
        face: 0.23,
        cpe: -0.6,
    },
    {
        face: 2,
        cpe: -0.8,
    }
    
]

const Seek = {

    goal(ci_firts){

        const ci = ci_firts;
        let acumulado = 0;

        const Acumulado = waterproof.map(proof => {

            const face = proof.face
            const ce = proof.cpe
            const ce_ci =  ce - ci
            const dim =  Number((face*Math.sqrt(Math.abs(ce_ci))).toFixed(2));
            
            const parametroNegative = ce_ci < 0 ? (-1 * dim): dim;
            acumulado += parametroNegative
            
            return ({...proof,
                parametroNegative,
                acumulado
            })
        })  
        return Acumulado
    },

    PointReference(){

        let bigger = Seek.goal(0)
        const lenghtTotal = bigger.length 
        const valueLast = bigger[lenghtTotal-1].acumulado
        const value2Last = bigger[lenghtTotal-2].acumulado
        const value = (valueLast - value2Last) < 0 ? 0.05: -0.05;
        console.log(value)
        let ii = 0;
        for (let i = 0; i < 2; i++) {

            // bigger = Seek.goal(value + 0)
            console.log(bigger)
            ii += value;

            let compareted = Math.round(ii).toFixed(0)

            console.log(i,bigger,compareted)
        }
    }
}

Seek.PointReference()
