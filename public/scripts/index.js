const $nextBtn = document.getElementById('nextBtn');
const $prevBtn = document.getElementById('prevBtn');
const $heightRoof = document.getElementById('heightRoof');
const $heightShed = document.getElementById('heightShed');

const $angleRoof = document.getElementById('angleRoof');
const $widthShed = document.getElementById('widthShed');
const $lenghtShed = document.getElementById('lenghtShed');
const $btnCalc_Shed = document.getElementById("calculateAngle");
const $btnCalc_Dim = document.getElementById("calculateDimension");
const $btnClose = document.getElementById("btn-close");
const $messageError = document.getElementById("messageError");
const $messageText = document.getElementById("messageText");

let $loadSVG = document.getElementById('img-waterproof');

// Waterproof
const $a1 = document.getElementById('area-a1');
const $a2 = document.getElementById('area-a2');
const $a3 = document.getElementById('area-a3');
const $b1 = document.getElementById('area-b1');
const $b2 = document.getElementById('area-b2');
const $b3 = document.getElementById('area-b3');
const $c1 = document.getElementById('area-c1');
const $c2 = document.getElementById('area-c2');
const $d1 = document.getElementById('area-d1');
const $d2 = document.getElementById('area-d2');

// Wind Dimension
const $dimension_wind_a1 = document.getElementById('a1-0');
const $dimension_wind_a2 = document.getElementById('a2-0');
const $dimension_wind_a3 = document.getElementById('a3-0');
const $dimension_wind_b = document.getElementById('b-90');
const $dimension_wind_d = document.getElementById('d-0');
const $dimension_wind_d1 = document.getElementById('d1-90');
const $dimension_wind_d2 = document.getElementById('d2-90');


// Taludes e morros
const $s1_slopes_hill_3 = document.getElementById('s1-3')
const $s1_slopes_hill_1 = document.getElementById('s1-1')
const $s1_slopes_hill_2 = document.getElementById('s1-2')
const $slopesHillsAng = document.getElementById('slopesHillsAng')
const $heightHills = document.getElementById('heightHills')
const $distanceHills = document.getElementById('distanceHills')

// Coefficientes Wall
const $cpe_a1_0 = document.getElementById('cpe-a1-0')
const $cpe_a2_0 = document.getElementById('cpe-a2-0')
const $cpe_a3_0 = document.getElementById('cpe-a3-0')
const $cpe_c_0  = document.getElementById('cpe-c-0')
const $cpe_d_0  = document.getElementById('cpe-d-0')

const $cpe_a_90 = document.getElementById('cpe-a-90')
const $cpe_b_90 = document.getElementById('cpe-b-90')
const $cpe_d1_90 = document.getElementById('cpe-d1-90')
const $cpe_d2_90  = document.getElementById('cpe-d2-90')

// Coefficientes Roof
const $cpe_e_0 = document.getElementById('E_0')
const $cpe_f_0 = document.getElementById('F_0')
const $cpe_i_0 = document.getElementById('I_0')
const $cpe_g_0  = document.getElementById('G_0')
const $cpe_h_0  = document.getElementById('H_0')
const $cpe_j_0  = document.getElementById('J_0')

const $cpe_e_90 = document.getElementById('E_90')
const $cpe_f_90 = document.getElementById('F_90')
const $cpe_i_90 = document.getElementById('I_90')
const $cpe_g_90  = document.getElementById('G_90')
const $cpe_h_90  = document.getElementById('H_90')
const $cpe_j_90  = document.getElementById('J_90')

const $cpi_0  = document.getElementById('cpi-0')
const $cpi_90  = document.getElementById('cpi-90')
const $cpi_180  = document.getElementById('cpi-180')
const $cpi_270  = document.getElementById('cpi-270')

const $cpe_a1_left_0  = document.getElementById('cpe-a1-left-0')
const $cpe_e_left_0  = document.getElementById('cpe-e-left-0')
const $cpe_b1_right_0  = document.getElementById('cpe-b1-right-0')
const $cpe_g_right_0  = document.getElementById('cpe-g-right-0')

const $cpe_a_left_90  = document.getElementById('cpe-a-left-90')
const $cpe_e_left_90  = document.getElementById('cpe-e-left-90')
const $cpe_b_right_90  = document.getElementById('cpe-b-right-90')
const $cpe_g_right_90  = document.getElementById('cpe-g-right-90')

const $cpe_a1_left_180  = document.getElementById('cpe-a1-left-180')
const $cpe_e_left_180  = document.getElementById('cpe-e-left-180')
const $cpe_b1_right_180  = document.getElementById('cpe-b1-right-180')
const $cpe_g_right_180  = document.getElementById('cpe-g-right-180')

const $cpe_a_left_270 = document.getElementById('cpe-a-left-270')
const $cpe_e_left_270 = document.getElementById('cpe-e-left-270')
const $cpe_b_right_270 = document.getElementById('cpe-b-right-270')
const $cpe_g_right_270 = document.getElementById('cpe-g-right-270')

const $fator_s1 = document.getElementById('fator_s1')
const $fator_s2 = document.getElementById('fator_s2')
const $fator_s3 = document.getElementById('fator_s3')
const $windSpeed = document.getElementById('speedWind')

const $vk_wind = document.getElementById('vk-wind')
const $pressure_wind = document.getElementById('pressure-wind')

const $effort_a1_left_0  = document.getElementById('effort-a1-left-0')
const $effort_e_left_0  = document.getElementById('effort-e-left-0')
const $effort_b1_right_0  = document.getElementById('effort-b1-right-0')
const $effort_g_right_0  = document.getElementById('effort-g-right-0')

const $effort_a_left_90  = document.getElementById('effort-a-left-90')
const $effort_e_left_90  = document.getElementById('effort-e-left-90')
const $effort_b_right_90  = document.getElementById('effort-b-right-90')
const $effort_g_right_90  = document.getElementById('effort-g-right-90')

const $effort_a1_left_180  = document.getElementById('effort-a1-left-180')
const $effort_e_left_180  = document.getElementById('effort-e-left-180')
const $effort_b1_right_180  = document.getElementById('effort-b1-right-180')
const $effort_g_right_180  = document.getElementById('effort-g-right-180')

const $effort_a_left_270 = document.getElementById('effort-a-left-270')
const $effort_e_left_270 = document.getElementById('effort-e-left-270')
const $effort_b_right_270 = document.getElementById('effort-b-right-270')
const $effort_g_right_270 = document.getElementById('effort-g-right-270')

const $effort_0  = document.getElementById('effort-0')
const $effort_90  = document.getElementById('effort-90')
const $effort_180  = document.getElementById('effort-180')
const $effort_270  = document.getElementById('effort-270')


var currentTab = 0

const view = {

    setEffort({effort_e_0, effort_g_0,effort_a1_0,effort_b1_0,effort_e_90,effort_g_90,
        effort_a_90,effort_b_90,effort_e_180,effort_g_180,effort_a1_180,effort_b1_180,
        effort_e_270,effort_g_270,effort_a_270,effort_b_270}){

        $effort_a1_left_0.innerText = effort_a1_0;
        $effort_e_left_0.innerText = effort_e_0;
        $effort_b1_right_0.innerText = effort_b1_0;
        $effort_g_right_0.innerText = effort_g_0;

        $effort_a_left_90.innerText = effort_a_90;
        $effort_e_left_90.innerText = effort_e_90;
        $effort_b_right_90.innerText = effort_b_90;
        $effort_g_right_90.innerText = effort_g_90;

        $effort_a1_left_180.innerText = effort_a1_180;
        $effort_e_left_180.innerText = effort_e_180;
        $effort_b1_right_180.innerText = effort_b1_180;
        $effort_g_right_180.innerText = effort_g_180;

        $effort_a_left_270.innerText = effort_a_270;
        $effort_e_left_270.innerText = effort_e_270;
        $effort_b_right_270.innerText = effort_b_270;
        $effort_g_right_270.innerText = effort_g_270;
            
    },

    getWindFactores(){
        return {
            windSpeed: $windSpeed.value,
            fatorS1: $fator_s1.innerText,
            fatorS2: $fator_s2.innerText,
            fatorS3: $fator_s3.innerText
        }
    },

    getDinamicPressure() {
        return {
            dinamicPressure: $pressure_wind.innerText,
        }
    },

    getCoefficientsWall() {
        return {
            cpe_a1: $cpe_a1_0.innerText,
            cpe_a2: $cpe_a2_0.innerText,
            cpe_a3: $cpe_a3_0.innerText,
            cpe_b1: $cpe_a1_0.innerText,
            cpe_b2: $cpe_a2_0.innerText,
            cpe_b3: $cpe_a3_0.innerText,
            cpe_c: $cpe_c_0.innerText,
            cpe_d: $cpe_d_0.innerText,
            cpe_a: $cpe_a_90.innerText,
            cpe_b: $cpe_b_90.innerText,
            cpe_d1: $cpe_d1_90.innerText,
            cpe_d2: $cpe_d2_90.innerText,
            cpe_c1: $cpe_d1_90.innerText,
            cpe_c2: $cpe_d2_90.innerText,
            
        }
    },

    getCoefficientsRoof() {
        return {
            cpe_e_0: $cpe_e_0.innerText,
            cpe_g_0: $cpe_g_0.innerText,

            cpe_e_90: $cpe_e_90.innerText,
            cpe_g_90: $cpe_g_90.innerText,
            
        }
    },

    getCoefficientsCpi() {
        return {
            cpi_0: $cpi_0.innerText,
            cpi_90: $cpi_90.innerText,
            cpi_180: $cpi_180.innerText,
            cpi_270: $cpi_270.innerText,
        }
    },

    getAreaWaterproof(){
        return {
            A1: $a1.value, A2: $a2.value, A3: $a3.value,
            B1: $b1.value, B2: $b2.value, B3: $b3.value,
            C1: $c1.value, C2: $c2.value,
            D1: $d1.value, D2: $d2.value,
        }
    },

    getDimensionsShed() {
        return {
            heightRoof: $heightRoof.value,
            angle: $angleRoof.value,
            width: $widthShed.value,
            length: $lenghtShed.value,
            height: $heightShed.value,
        }
        
    },

    getSlopesHills(){
        return {
            angle: $slopesHillsAng.value,
            height: $heightHills.value,
            distance: $distanceHills.value
            
        }
    },

    getValueS1(){
        return {
            flatTerrain: $s1_slopes_hill_1.checked,
            deepValleys: $s1_slopes_hill_2.checked,
            slopeshill: $s1_slopes_hill_3.checked
        }
    },

    setVk(vk){
        $vk_wind.innerText = vk
    },

    setDynamicPressure(pressure){
        $pressure_wind.innerText = pressure
    },

    setFatorS3(s3){
        $fator_s3.innerText = s3
    },

    setFatorS2(s2){
        $fator_s2.innerText = s2
    },

    setFatorS1(s1){
        $fator_s1.innerText = s1
    },

    setCoefficientsCpi_0(cpi){
        $cpi_0.innerText = cpi
        $effort_0.innerText = 'Cpi: ' + cpi
    },

    setCoefficientsCpi_90(cpi){
        $cpi_90.innerText = cpi
        $effort_90.innerText ='Cpi: ' +  cpi
    },

    setCoefficientsCpi_180(cpi){
        $cpi_180.innerText = cpi
        $effort_180.innerText ='Cpi: ' +  cpi
    },

    setCoefficientsCpi_270(cpi){
        $cpi_270.innerText = cpi
        $effort_270.innerText ='Cpi: ' +  cpi
    },

    setCoefficientsWall({A1, A2, A3, C, D, A, B , D1, D2}){

        $cpe_a1_0.innerText = A1;
        $cpe_a2_0.innerText = A2;
        $cpe_a3_0.innerText = A3;
        $cpe_c_0.innerText = C;
        $cpe_d_0.innerText = D;
        $cpe_a_90.innerText = A;
        $cpe_b_90.innerText = B;
        $cpe_d1_90.innerText = D1;
        $cpe_d2_90.innerText = D2;

        $cpe_a1_left_0.innerText = A1;
        $cpe_b1_right_0.innerText = A1;
        $cpe_a_left_90.innerText = A;
        $cpe_b_right_90.innerText = B;

        $cpe_a1_left_180.innerText = A1;
        $cpe_b1_right_180.innerText = A1;
        $cpe_a_left_270.innerText = A;
        $cpe_b_right_270.innerText = B;
    },

    setCoefficientsRoof({E_0, F_0, I_0, G_0, H_0, J_0, 
                        E_90, F_90, I_90, G_90, H_90, J_90}){

        $cpe_e_0.innerText = E_0;
        $cpe_f_0.innerText = F_0;
        $cpe_i_0.innerText = I_0;
        $cpe_g_0.innerText = G_0;
        $cpe_h_0.innerText = H_0;
        $cpe_i_0.innerText = I_0;
        $cpe_j_0.innerText = J_0;
        $cpe_e_90.innerText = E_90;
        $cpe_f_90.innerText = F_90;
        $cpe_i_90.innerText = I_90;
        $cpe_g_90.innerText = G_90;
        $cpe_h_90.innerText = H_90;
        $cpe_i_90.innerText = I_90;
        $cpe_j_90.innerText = J_90;
        
        $cpe_e_left_0.innerText = E_90;
        $cpe_g_right_0.innerText = G_90;
        $cpe_e_left_90.innerText = E_90;
        $cpe_g_right_90.innerText = G_90;

        $cpe_e_left_180.innerText = E_90;
        $cpe_g_right_180.innerText = G_90;
        $cpe_e_left_270.innerText = E_90;
        $cpe_g_right_270.innerText = G_90;
        
    },

    setAngle(angle) {
        $angleRoof.innerText = angle;
    },

    setHeight(height) {
        $heightRoof.innerText = height;
    },

    setWidth(Width) {
        $widthShed.innerText = Width;
    },

    setLength(length) {
        $lenghtShed.innerText = length;
    },

    dimensionWind({A1, A2, A3, D, B, D1, D2}){
        $dimension_wind_a1.innerText = `${A1}m`;
        $dimension_wind_a2.innerText = `${A2}m`;
        $dimension_wind_a3.innerText = `${A3}m`;
        $dimension_wind_b.innerText = `${B}m`;
        $dimension_wind_d.innerText = `${D}m`;
        $dimension_wind_d1.innerText = `${D1}m`;
        $dimension_wind_d2.innerText = `${D2}m`;
    },

    updateSlopesHills(angle,height,distance) {
 
        $slopesHillsAng.value = angle;
        $heightHills.value = height;
        $distanceHills.value = distance;
 
    },

    setMessageInform(message){
        $messageText.innerText = message;
    }
}

const services = {

    async getRequest(route, dimension) {
        
        try {
            const url = route;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dimension)
            }

            const response = await fetch(url,options);
            const json = await response.json()
            
            return json
    
        }catch(error){
            console.log('erro')
        }
    },

    validationDimension({width, height, length, heightRoof}){
        let verification  = false

        try{
            if(length == ''){
                throw 'Favor informar o comprimento a(m) do pavilhão'
                
            } else if(width == ''){
                throw 'Favor informar o largura b(m) do pavilhão'
                
            } else if(height == ''){
                throw 'Favor informar o altura h(m) do pavilhão'

            } else if(heightRoof == ''){
                throw 'Favor informar o altura do h(m) do pavilhão'

            } else if((Number(width) > Number(length))){

                throw 'O valor de a(m) deverá ser obrigatoriamente maior que o b(m)'
            } else {
                verification  = true; 
            }
            $messageError.classList.remove("messageError-on")
        
        }catch(e){
                   
            $messageError.classList.add("messageError-on")
            view.setMessageInform(e)
        }

        return verification
                
    },

    validationFatorS1({angle, height, distance}){
        let verification  = false

        try{
            if(angle == ''){
                throw 'Favor informar o ângulo (θ) de inclinação do terreno'
                
            } else if(distance == ''){
                throw 'Favor informar a diferença de nível entre a base e o topo de morro ou talude (d)'
                
            } else if(height == ''){
                throw 'Favor informar a cota acima do terreno (Z)'

            } else {
                verification  = true; 
            }
            
            $messageError.classList.remove("messageError-on")
        
        }catch(e){
    
            $messageError.classList.add("messageError-on")
            view.setMessageInform(e)
        }
        return verification 
    },
    
}

const controller = {

    definitionEffort(){
        const coefficientsCpeWall = view.getCoefficientsWall()
        const coefficientsCpeRoof = view.getCoefficientsRoof()
        const coefficientsCpi = view.getCoefficientsCpi()
        const dinamicPressure = view.getDinamicPressure()
        const coefficients = {...coefficientsCpeWall,...coefficientsCpeRoof,...coefficientsCpi, ...dinamicPressure}

        services.getRequest('/effort',coefficients)
                    .then((resp) => {
                        
                        view.setEffort(resp)

                    })
                    
    },
    definitionFatorS3() {
        const idCheked = document.querySelector('input[name="group-FatorS3"]:checked')['id']
        const group = {'group': Number(idCheked.split("-", 2)[1])}

        services.getRequest('/fators3',group)
                    .then((resp) => {
                        
                        view.setFatorS3(resp)

                    }).then((resp) => {controller.Definition_vk_pressure()})
                    
    },

    Definition_vk_pressure(){
        const pressure = view.getWindFactores()

        services.getRequest('/vk_pressure',pressure)
                    .then((resp) => {
                        view.setVk(resp.vk)
                        view.setDynamicPressure(resp.dynamicPressure)
                    })
    },

    definitionFatorS2() {
        const idCheked = document.querySelector('input[name="category-fatorS2"]:checked')['id']
        const resultadoEspaco = {'RoughnessTerrain': Number(idCheked.split("-", 2)[1])}
        const dimensionShed = view.getDimensionsShed()
        const dimension = {...resultadoEspaco,...dimensionShed}

        services.getRequest('/fators2',dimension)
                    .then((resp) => {
                        
                        view.setFatorS2(resp)
                    })
    },

    definitionFatorS1() {
        const idCheked = document.querySelector('input[name="s1-1"]:checked')['id']
        const SlopesHills = view.getSlopesHills()
        
        const resultadoEspaco = {'valuefator': Number(idCheked.split("-", 2)[1])}

        const dimension = {...resultadoEspaco,...SlopesHills}

        services.getRequest('/fators1',dimension)
                    .then((resp) => {
                        
                        view.setFatorS1(resp)
                    })
    },
    
    cpiCoefficients(){
        const areaWaterproof = view.getAreaWaterproof()
        const CoefficientsWall = view.getCoefficientsWall()

        const dimension_0 = [
            {
                face: Number(areaWaterproof.A1),
                cpe: Number(CoefficientsWall.cpe_a1),
            },
            {
                face: Number(areaWaterproof.A2),
                cpe: Number(CoefficientsWall.cpe_a2),
            },
            {
                face: Number(areaWaterproof.A3),
                cpe: Number(CoefficientsWall.cpe_a3),
            },
            {
                face: Number(areaWaterproof.B1),
                cpe: Number(CoefficientsWall.cpe_b1),
            },
            {
                face: Number(areaWaterproof.B2),
                cpe: Number(CoefficientsWall.cpe_b2),
            },
            {
                face: Number(areaWaterproof.B3),
                cpe: Number(CoefficientsWall.cpe_b3),
            },
            {
                face: Number(areaWaterproof.C1) +  Number(areaWaterproof.C2),
                cpe: Number(CoefficientsWall.cpe_c),
            },
            {
                face: Number(areaWaterproof.D1) + Number(areaWaterproof.D2),
                cpe: Number(CoefficientsWall.cpe_d),
            },
        ]

        const dimension_90 = [
            {
                face: Number(areaWaterproof.A1) + Number(areaWaterproof.A2) + Number(areaWaterproof.A3),
                cpe: Number(CoefficientsWall.cpe_a),
            },
            {
                face: Number(areaWaterproof.B1) + Number(areaWaterproof.B2) + Number(areaWaterproof.B3),
                cpe: Number(CoefficientsWall.cpe_b),
            },
            {
                face: Number(areaWaterproof.C1),
                cpe: Number(CoefficientsWall.cpe_c1),
            },
            {
                face: Number(areaWaterproof.C2),
                cpe: Number(CoefficientsWall.cpe_c2),
            },
            {
                face: Number(areaWaterproof.D1),
                cpe: Number(CoefficientsWall.cpe_d1),
            },
            {
                face: Number(areaWaterproof.D2),
                cpe: Number(CoefficientsWall.cpe_d2),
            },
        ]

        const dimension_180 = [
            {
                face: Number(areaWaterproof.A3),
                cpe: Number(CoefficientsWall.cpe_a1),
            },
            {
                face: Number(areaWaterproof.A2),
                cpe: Number(CoefficientsWall.cpe_a2),
            },
            {
                face: Number(areaWaterproof.A1),
                cpe: Number(CoefficientsWall.cpe_a3),
            },
            {
                face: Number(areaWaterproof.B3),
                cpe: Number(CoefficientsWall.cpe_b1),
            },
            {
                face: Number(areaWaterproof.B2),
                cpe: Number(CoefficientsWall.cpe_b2),
            },
            {
                face: Number(areaWaterproof.B1),
                cpe: Number(CoefficientsWall.cpe_b3),
            },
            {
                face: Number(areaWaterproof.C1) +  Number(areaWaterproof.C2),
                cpe: Number(CoefficientsWall.cpe_d),
            },
            {
                face: Number(areaWaterproof.D1) + Number(areaWaterproof.D2),
                cpe: Number(CoefficientsWall.cpe_c),
            },
        ]

        const dimension_270 = [
            {
                face: Number(areaWaterproof.A1) + Number(areaWaterproof.A2) + Number(areaWaterproof.A3),
                cpe: Number(CoefficientsWall.cpe_b),
            },
            {
                face: Number(areaWaterproof.B1) + Number(areaWaterproof.B2) + Number(areaWaterproof.B3),
                cpe: Number(CoefficientsWall.cpe_a),
            },
            {
                face: Number(areaWaterproof.C1),
                cpe: Number(CoefficientsWall.cpe_c2),
            },
            {
                face: Number(areaWaterproof.C2),
                cpe: Number(CoefficientsWall.cpe_c1),
            },
            {
                face: Number(areaWaterproof.D1),
                cpe: Number(CoefficientsWall.cpe_d2),
            },
            {
                face: Number(areaWaterproof.D2),
                cpe: Number(CoefficientsWall.cpe_d1),
            },
        ]


        services.getRequest('/cpiCoefficients',dimension_0)
                    .then((resp) => {
                        
                        view.setCoefficientsCpi_0(resp)
                    })

        services.getRequest('/cpiCoefficients',dimension_90)
                    .then((resp) => {
                        
                        view.setCoefficientsCpi_90(resp)
                    })

        services.getRequest('/cpiCoefficients',dimension_180)
                    .then((resp) => {
                        
                        view.setCoefficientsCpi_180(resp)
                    })
                    
        services.getRequest('/cpiCoefficients',dimension_270)
                    .then((resp) => {
                        
                        view.setCoefficientsCpi_270(resp)
                    })
    },

    roofCoefficients(){
        const dimensionShed = view.getDimensionsShed()
        services.getRequest('/roofCoefficients',dimensionShed)
                    .then((resp) => {
                        view.setCoefficientsRoof(resp)
                    })
        
    },

    wallCoefficients(){
        const dimensionShed = view.getDimensionsShed()
        services.getRequest('/wallCoefficients',dimensionShed)
                    .then((resp) => {
                        
                        view.setCoefficientsWall(resp)
                    })
        
    },

    ErrorDimension (){
        const dimensionRoof = view.getDimensionsShed()
        const verification = services.validationDimension(dimensionRoof)
        return verification
    },

    ErrorFatorS1 (){
        let verification = true
        const SlopesHills = view.getSlopesHills()
        const {slopeshill} = view.getValueS1()

        if(slopeshill == true){
            verification = services.validationFatorS1(SlopesHills)
            
        }

        return verification
        
    },

    calulateAngle(dimensionRoof){
        
        services.getRequest('/dimensionShed',dimensionRoof)
                        .then((resp) => {
                            view.setAngle(resp.angleRoof)
                        })
    },

    initialize() {  

        $nextBtn.addEventListener('click', (evt) => {
            formStep.nextPrev(1)
        });

        $prevBtn.addEventListener('click', (evt) => {
            formStep.nextPrev(-1)
        });

        $heightRoof.addEventListener('change', (evt) => {
            const dimensionRoof = view.getDimensionsShed()
            this.calulateAngle(dimensionRoof)


        });

        window.addEventListener('load', (evt) => {
            fetch( $loadSVG.src)
                .then((response) => response.text())
                .then((response) => {
                    const span = document.createElement('span');
                    span.innerHTML = response;
                    const inlineSvg = span.getElementsByTagName('svg')[0];
                    $loadSVG.parentNode.replaceChild(inlineSvg, $loadSVG);
                    
                })            
        });

        $btnCalc_Dim.addEventListener('click', (evt) => {

            const dimensionRoof = view.getDimensionsShed()
            const verification = controller.ErrorDimension ()

            if (verification) {
                document.getElementById('modal-wrapper').classList.toggle('on');
                
                services.getRequest('/dimensionWind',dimensionRoof)
                            .then((resp) => {
                                view.dimensionWind(resp)
                            })
                
                this.calulateAngle(dimensionRoof)
            }

        });

        $btnClose.addEventListener('click', (evt) => {
            document.getElementById('modal-wrapper').classList.toggle('on');

        });

        $s1_slopes_hill_3.addEventListener('click', (evt) => {

            const dimensioHills = document.getElementById('dimension-Hills')
            dimensioHills.classList.add('on-dimension-Hills');

        });

        $s1_slopes_hill_1.addEventListener('click', (evt) => {
            view.updateSlopesHills('','','')
            const dimensioHills = document.getElementById('dimension-Hills')
            dimensioHills.classList.remove('on-dimension-Hills');
            $messageError.classList.remove("messageError-on")

        });

        $s1_slopes_hill_2.addEventListener('click', (evt) => {
            view.updateSlopesHills('','','')
            const dimensioHills = document.getElementById('dimension-Hills')
            dimensioHills.classList.remove('on-dimension-Hills');
            $messageError.classList.remove("messageError-on")


        });

        this.initializeImageWaterproof();

        this.sizeModal();

    },

    sizeModal(){
        const widhtOpen = "13rem";
        const widhtClose = "3.5rem";
        const sideProprietary = document.getElementById('sidebar');
        const modal = document.getElementById('modal-wrapper');
        const classAtive = (sideProprietary.classList == 'active')
    
        if(classAtive) {
            modal.style.marginLeft = widhtClose;
            
        } else {
            modal.style.marginLeft = widhtOpen;
        }
    
    },

    initializeImageWaterproof(){
        $a1.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.a1')[0]
            const ValueZero = $a1.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');
        });

        $a2.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.a2')[0]
            const ValueZero = $a2.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');
        });

        $a3.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.a3')[0]
            const ValueZero = $a3.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');
        });

        $b1.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.b1')[0]
            const ValueZero = $b1.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');
        });

        $b2.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.b2')[0]
            const ValueZero = $b2.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });

        $b3.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.b3')[0]
            const ValueZero = $b3.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });

        $c1.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.c1')[0]
            const ValueZero = $c1.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });

        $c2.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.c2')[0]
            const ValueZero = $c2.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });

        $d1.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.d1')[0]
            const ValueZero = $d1.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });
        
        $d2.addEventListener('change', (evt) => {
            const classAdd = document.querySelectorAll('.d2')[0]
            const ValueZero = $d2.value > 0 ? classAdd.classList.add('wall-active') : classAdd.classList.remove('wall-active');

        });
    }
}

const formStep = {
    
    validateForm(valuePage,n) {

        let validation = true

        if(valuePage==0 && n != -1) {
            validation = controller.ErrorDimension ()

            
        } else if(valuePage==1 && n != -1) {


        } else if(valuePage==2 && n != -1) {
            validation = controller.ErrorFatorS1()
            if(validation) {
                controller.definitionFatorS1()
            }
        } else if(valuePage==3 && n != -1) {
            controller.definitionFatorS2()

        } else if(valuePage==4 && n != -1) {
            controller.wallCoefficients()
            controller.definitionFatorS3()
            

        } else if(valuePage==5 && n != -1) {
            controller.roofCoefficients()

        } else if(valuePage==6 && n != -1) {
            controller.cpiCoefficients()

        } else if(valuePage==7 && n != -1) {
            controller.definitionEffort()
        } else if(valuePage==8 && n != -1) {

        } else if(valuePage==9 && n != -1) {

        }
        
        return validation
    },

    showTab(n) {

        let tab = document.getElementsByClassName("tab");
        tab[n].style.display = "block";

        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }

        if (n == (tab.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Avançar";
        }

        this.fixStepIndicator(n)
        
    },

    nextPrev(n) {

        let tab = document.getElementsByClassName("tab");

        const verification = this.validateForm(currentTab,n) 

        if (verification) {
            tab[currentTab].style.display = "none";
            currentTab = currentTab + n;

            if (currentTab >= tab.length) {
                document.getElementById("Form-wind").submit();
                return false;
            }

            document.getElementsByClassName("step")[currentTab].className += " finish"; 
            this.showTab(currentTab);

        }
    },

    fixStepIndicator(n) {
        let i
        let step = document.getElementsByClassName("step");

        for (i = 0; i < step.length; i++) {
            step[i].className = step[i].className.replace(" active", "");

        }
        step[n].className += " active";
    },
}

controller.initialize()
formStep.showTab(currentTab); 
