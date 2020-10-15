const serverless = require('serverless-http')
const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/swagger', (req, res) => {
    res.send('Hola mundo con expressJS')
})
module.exports.planet = serverless(app)