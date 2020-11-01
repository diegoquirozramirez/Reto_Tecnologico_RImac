const serverless = require('serverless-http')
const express = require('express')
const app = express();
/* const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json'); */
const route = require('./services/router/index')
const bodyParser = require('body-parser')

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* app.get('/swagger', (req, res) => {
    res.send('Hola mundo con expressJS')
}) */
app.use(bodyParser.json())
app.use('/planetv2', route)

module.exports.planet = serverless(app)