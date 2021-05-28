const express = require('express');
const routes = express.Router();
const WindController = require('./controllers/WindController')

routes.get('/', WindController.indexWind)
// routes.get('/dimensionShed', WindController.SeparetedDimensional)
routes.post('/dimensionShed',WindController.DimensionAngle)
routes.post('/dimensionWind',WindController.DimensionShedWind)
routes.post('/wallCoefficients',WindController.WallCoefficients)
routes.post('/roofCoefficients',WindController.roofCoefficients)
routes.post('/cpiCoefficients',WindController.cpiCoefficients)




module.exports = routes;
