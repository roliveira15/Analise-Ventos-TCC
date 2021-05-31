const express = require('express');
const routes = express.Router();
const WindController = require('./controllers/WindController')

routes.get('/', WindController.indexWind)

routes.post('/dimensionShed',WindController.DimensionAngle)
routes.post('/dimensionWind',WindController.DimensionShedWind)
routes.post('/wallCoefficients',WindController.WallCoefficients)
routes.post('/roofCoefficients',WindController.roofCoefficients)
routes.post('/cpiCoefficients',WindController.cpiCoefficients)
routes.post('/fators1',WindController.Definitionfators1)
routes.post('/fators2',WindController.Definitionfators2)
routes.post('/fators3',WindController.Definitionfators3)
routes.post('/vk_pressure',WindController.Definition_vk_pressure)
routes.post('/effort',WindController.effort)

module.exports = routes;
