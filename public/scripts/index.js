import {Angle_Roof,Height_Roof} from './wind/Dimension.js'


var currentTab = 0
const $nextBtn = document.getElementById('nextBtn');
const $prevBtn = document.getElementById('prevBtn');
const $heightRoof = document.getElementById('heightRoof');
const $angleRoof = document.getElementById('angleRoof');
const $widthShed = document.getElementById('widthShed');
const $btnCalc_Shed = document.getElementById("calculate");



const view = {
    getDimensionsRoof() {
        return {
            height: $heightRoof.value,
            angle: $angleRoof.value,
            width: $widthShed.value,
        }
    },

    setCoeficients(dimension) {
        // $heightRoof.innerText = dimension.angleRoof;
        // $angleRoof.innerText = dimension.hightRoof;
    }
}

const services = {

    async get(route) {

        try {
            const response = await fetch(route)
            const data = await response.json()
            console.log(data)
            return data
    
        }catch(error){
            console.log('erro')
        }
    },

    heightRoof() {
        const {width, angle} = view.getDimensionsRoof();
        const dimension = Height_Roof(width, angle);   
        console.log(dimension)   
    },

    angleRoof() {
        const {width, height} = view.getDimensionsRoof();
        const dimension = Angle_Roof(width, height);      
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
            
            
            
            console.log(services.get('/dimensionShed'))

        });
        // $heightRoof.addEventListener('keyup', (evt) => {
        //     services.angleRoof();
        // });

        // $angleRoof.addEventListener('keyup', (evt) => {
        //     services.heightRoof();
        // });


    },
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
  


// const fetchSvg = (image) => {
//     fetch(image.src)
//         .then((response) => response.text())
//         .then((response) => {
//             const span = document.createElement('span');
//             span.innerHTML = response;
//             const inlineSvg = span.getElementsByTagName('svg')[0];
//             // image.parentNode.replaceChild(inlineSvg, image);
//             console.log(span)
//             return true;
//         })
//         // .then(() => { getActions(); });
// };

// const getActions = () => {
//     const states = document.getElementsByClassName('estado');
//     for(let i = 0; i < states.length; i++) {
//         states[i].onclick = () => { stateClicked(states[i]); };
//     }
//     getEstados();
// };

// const getEstados = () => {
//     fetch('estados.json')
//         .then((response) => response.text())
//         .then((response) => {
//             estados.push(...JSON.parse(response));
//         });
// };

// const stateClicked = (state) => {
//     const code = state.getAttribute('code');
//     const uf = estados.find(estado => estado.code === code);
//     if (!uf) return;
//     fillContent(uf);
// };

// const fillContent = ({ nome, sigla, populacao, descricao }) => {
//     const name = document.getElementById('stateName');
//     const population = document.getElementById('statePop');
//     const description = document.getElementById('stateDesc');

//     name.innerText = `${nome} (${sigla})`;
//     population.innerText = `População: ${populacao}`;
//     description.innerText = descricao;
// };