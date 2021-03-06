const express = require('express');
const server = express();
const routes = require('./routes')
const path = require('path')
// const cors = require('cors')

// server.use(cors())
server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({extended: true}))

server.use(express.static("public"))
server.use(express.json())


server.use(routes)

server.listen(process.env.PORT || 5050);
