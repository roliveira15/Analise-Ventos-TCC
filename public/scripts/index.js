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
var currentTab =5

const $s1_slopes_hill_3 = document.getElementById('s1-3')
const $s1_slopes_hill_1 = document.getElementById('s1-1')
const $s1_slopes_hill_2 = document.getElementById('s1-2')
const $slopesHillsAng = document.getElementById('slopesHillsAng')
const $heightHills = document.getElementById('heightHills')
const $distanceHills = document.getElementById('distanceHills')

const view = {
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

    validationFatorS2(){        
    },
    
    validationCpeWall(){     
    },
    
    validationCpeRoof(){         
    },

    validationCpi(){         
    }

}

const controller = {

    wallCoefficients(){
        const dimensionShed = view.getDimensionsShed()
        services.getRequest('/wallCoefficients',dimensionShed)
                    .then((resp) => {
                        console.log(resp)
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
        console.log(valuePage,n)
        let validation = true

        if(valuePage==0 && n != -1) {
            validation = controller.ErrorDimension ()
        } else if(valuePage==1 && n != -1) {

        } else if(valuePage==2 && n != -1) {
           
            validation = controller.ErrorFatorS1()
        } else if(valuePage==3 && n != -1) {
            
        } else if(valuePage==4 && n != -1) {
            controller.wallCoefficients()
        } else if(valuePage==5 && n != -1) {
            
        } else if(valuePage==6 && n != -1) {
            

        } else if(valuePage==7 && n != -1) {

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
