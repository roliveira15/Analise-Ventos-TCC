const $nextBtn = document.getElementById('nextBtn');
const $prevBtn = document.getElementById('prevBtn');
const $heightRoof = document.getElementById('heightRoof');
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
var currentTab = 0

const $s1_slopes_hill_3 = document.getElementById('s1-3')
const $s1_slopes_hill_1 = document.getElementById('s1-1')
const $s1_slopes_hill_2 = document.getElementById('s1-2')
const $slopesHillsAng = document.getElementById('slopesHillsAng')
const $heightHills = document.getElementById('heightHills')
const $distanceHills = document.getElementById('distanceHills')

const view = {
    getDimensionsRoof() {
        return {
            height: $heightRoof.value,
            angle: $angleRoof.value,
            width: $widthShed.value,
            length: $lenghtShed.value
        }
    },

    getSlopesHills(){
        return {
            angle: $slopesHillsAng.value,
            height: $heightHills.value,
            distance: $distanceHills.value
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

    validationDimension({width, height, length}){

        let verification  = false
        let messageInform = ''

            
        if(length == ''){
            messageInform = 'Favor informar o comprimento a(m) do pavilhão'
            
        } else if(width == ''){
            messageInform = 'Favor informar o largura b(m) do pavilhão'
            
        } else if(height == ''){
            messageInform = 'Favor informar o altura h(m) do pavilhão'

        } else if((Number(width) > Number(length))){
                messageInform = 'O valor de a(m) deverá ser obrigatoriamente maior que o b(m)'
        } else {
            verification  = true; 
        }

        return {'verification': verification, 
                'messageInform' : messageInform}
    }
}

const controller = {

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
            const dimensionRoof = view.getDimensionsRoof()
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

            const dimensionRoof = view.getDimensionsRoof()
            const {verification, messageInform} = services.validationDimension(dimensionRoof)
        
            if (verification) {
                document.getElementById('modal-wrapper').classList.toggle('on');
                
                services.getRequest('/dimensionWind',dimensionRoof)
                            .then((resp) => {
                                view.dimensionWind(resp)
                            })
                
                this.calulateAngle(dimensionRoof)
                $messageError.classList.remove("messageError-on")
                
            } else {
                $messageError.classList.add("messageError-on")
                view.setMessageInform(messageInform)
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

        });

        $s1_slopes_hill_2.addEventListener('click', (evt) => {
            view.updateSlopesHills('','','')
            const dimensioHills = document.getElementById('dimension-Hills')
            dimensioHills.classList.remove('on-dimension-Hills');

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

    validateForm(n) {
        let verification = true;
        let messageInform = '';

        if(n==1) {
            const dimensionRoof = view.getDimensionsRoof()
            const {verification, messageInform} = services.validationDimension(dimensionRoof)
        } else if(n==2) {

        } else if(n==3) {

        } else if(n==4) {

        } else if(n==5) {

        } else if(n==6) {

        } else if(n==7) {

        } else if(n==8) {

        } else if(n==9) {

        }

        if (verification) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }

        return {verification, messageInform}
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

        const {verification, messageInform} = this.validateForm(n) 

        console.log(verification, messageInform, 'oi')

        if (verification) {
           
            tab[currentTab].style.display = "none";
            currentTab = currentTab + n;

            if (currentTab >= tab.length) {
                document.getElementById("Form-wind").submit();
                return false;
            }

            this.showTab(currentTab);

        } else {
            alert(messageInform)
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
