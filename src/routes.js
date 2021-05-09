const express = require('express');
const routes = express.Router();
const WindController = require('./controllers/WindController')

routes.get('/', WindController.indexWind)
routes.get('/dimensionShed', WindController.SeparetedDimensional)
routes.get('/calculate', WindController.DimensionAngleHeight)

module.exports = routes;
