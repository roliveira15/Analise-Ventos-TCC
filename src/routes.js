const express = require('express');
const routes = express.Router();
const DimensionController = require('./controllers/Wind')

routes.get('/', DimensionController.Wind)
routes.get('/api', (req, res) => { return res.json({ resposta: "resposta" })})

module.exports = routes;
