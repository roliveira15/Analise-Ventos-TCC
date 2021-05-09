import * as Wind from './Wind.js';
import {dimensionWind_0} from './wind/Dimension.js';

const $widthShed = document.getElementById('widthShed');
const $lengthShed = document.getElementById('lenghtShed');
const $heightShed = document.getElementById('heightShed');
const $coefB1 = document.getElementById('coef-b1');
const $coefB2 = document.getElementById('coef-b2');
const $coefB3 = document.getElementById('coef-b3');
const $coefD1 = document.getElementById('coef-d1');
const $coefD2 = document.getElementById('coef-d2');

const view = {
    getDimensions() {
        return {
            width: $widthShed.value,
            height: $heightShed.value,
            length: $lengthShed.value
        }
    },
    setCoeficients(coefs) {
        $coefB1.innerText = coefs.B1;
        $coefB2.innerText = coefs.B2;
        $coefB3.innerText = coefs.B3;
        $coefD1.innerText = coefs.D1;
        $coefD2.innerText = coefs.D2;
    }
}

const controller = {
    initialize() {         
        $widthShed.addEventListener('keypress', (evt) => {
            this.calculateCoefs();
        });
        $lengthShed.addEventListener('keypress', (evt) => {
            this.calculateCoefs();
        });
        $heightShed.addEventListener('keypress', (evt) => {
            this.calculateCoefs();
        });
    },
    calculateCoefs() {
        const {height, width, length} = view.getDimensions();
        const coefs = dimensionWind_0(width, length, height);
        view.setCoeficients(coefs)
    }   
}

console.log('rodando')

controller.initialize();