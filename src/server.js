const express = require('express');
const server = express();
const PORT = 5050;
const routes = require('./routes')

server.set('view engine', 'ejs')

server.use(express.static("public"))

server.use(routes)

server.listen(PORT, () => console.log('rodando'))
