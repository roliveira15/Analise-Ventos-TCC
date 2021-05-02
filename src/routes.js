const express = require('express');
const routes = express.Router();
const DimensionController = require('./controllers/Wind')

routes.get('/', DimensionController.Wind)

module.exports = routes;
