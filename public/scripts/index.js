const $nextBtn = document.getElementById('nextBtn');
const $prevBtn = document.getElementById('prevBtn');
const $heightRoof = document.getElementById('heightRoof');
const $angleRoof = document.getElementById('angleRoof');
const $widthShed = document.getElementById('widthShed');
const $lenghtShed = document.getElementById('lenghtShed');
const $btnCalc_Shed = document.getElementById("calculateAngle");
const $btnCalc_Dim = document.getElementById("calculateDimension");
const $btnClose = document.getElementById("btn-close");



let $loadSVG = document.getElementById('img-waterproof');

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

var currentTab = 0


const view = {
    getDimensionsRoof() {
        return {
            height: $heightRoof.value,
            angle: $angleRoof.value,
            width: $widthShed.value,
            length: $lenghtShed.value
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

    validationDimension({length,width,height,angle}){
        let verification,messageInform

        if(width> length ){
            verification  = false;
            messageInform = 'O valor de a(m) deverá obrigatoriamente maior que o b(m)'
            
        }else if(length == ''){
            verification  = false;
            messageInform = 'Favor informar o comprimento a(m) do pavilhão'
            
        } else if(width == ''){
            verification  = false;
            messageInform = 'Favor informar o largura b(m) do pavilhão'
            
        } else if(height == ''){
            verification  = false;
            messageInform = 'Favor informar o altura h(m) do pavilhão'

        } else {
            verification  = true; 
        }

        return {'verification': verification, 
                'messageInform' : messageInform}
    }
}

const controller = {
    initialize() {         
        $nextBtn.addEventListener('click', (evt) => {
            formStep.nextPrev(1)
        });

        $prevBtn.addEventListener('click', (evt) => {
            formStep.nextPrev(-1)
        });

        $btnCalc_Shed.addEventListener('click', (evt) => {
            const dimensionRoof = view.getDimensionsRoof()
            const {verification, messageInform} = services.validationDimension(dimensionRoof)
            
            if (verification) {
                services.getRequest('/dimensionShed',dimensionRoof)
                            .then((resp) => {
                                view.setAngle(resp.angleRoof)
                            })
            } else {
                alert(messageInform)
            }

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

        this.initializeImageWaterproof();

        $btnCalc_Dim.addEventListener('click', (evt) => {
            document.getElementById('modal-wrapper').classList.toggle('on');

        });

        $btnClose.addEventListener('click', (evt) => {
            document.getElementById('modal-wrapper').classList.toggle('on');

        });


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
        if (n == 1 && !this.validateForm()) return false;
        tab[currentTab].style.display = "none";
        currentTab = currentTab + n;

        if (currentTab >= tab.length) {
            document.getElementById("Form-wind").submit();
            return false;
        }

        this.showTab(currentTab);

    },

    validateForm() {

        let i, valid = true;
        let tab = document.getElementsByClassName("tab");
        let input = tab[currentTab].getElementsByTagName("input");

        for (i = 0; i < input.length; i++) {

            if (input[i].value == "") {
                input[i].className += " invalid";
                valid = false;
            }
        }

        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return valid;
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
