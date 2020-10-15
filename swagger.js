/* const serverless = require('serverless-http')
const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/swagger', (req, res) => {
    console.log(swaggerUi.serve)
    console.log(swaggerUi.setup(swaggerDocument))
    res.send('Hola mundo con expressJS')
})
module.exports.swagger = serverless(app) */


const serverless = require('serverless-http')

const express = require('express')
const cors = require('cors')
const cluster = require('cluster')
const http = require('http')
const os = require('os')
const config = require('./config')

const app = express();

let workers = [];

//Configure el número de procesos de trabajo para compartir el puerto que se definirá al configurar el servidor
const setupWorkerProcesses = () => {

  console.log("Entro aqui")
  // leer el número de núcleos en el sistema
  let numCores = os.cpus().length;
  console.log('Configuración del clúster maestro ' + numCores + ' trabajadores');

  //numCores = config.numCores > 1 && config.numCores < numCores ? config.numCores : numCores
numCores = 1
  //recorremos en el número de núcleos que debe utilizar una aplicación
  // el ejemplo actual los utilizará todos
  for (let i = 0; i < numCores; i++) {
    // creando trabajadores y empujando la referencia en una matriz
    // estas referencias se pueden utilizar para recibir mensajes de trabajadores
    workers.push(cluster.fork());

    // para recibir mensajes del proceso de trabajo
    workers[i].on('message', function (message) {
        console.log("for de workers")
      console.log(message);
    });
  }

  // el proceso está agrupado en un núcleo y se asigna la identificación del proceso
  cluster.on('online', function (worker) {
    console.log('trabajador esta escuchando en: ' + worker.process.pid);
  });

  // Si alguno de los procesos de trabajo muere, se comienza uno nuevo simplemente bifurcando otro
  cluster.on('exit', function (worker, code, signal) {
    workers.push(cluster.fork());
    // recibir mensajes del proceso de trabajo
    workers[workers.length - 1].on('message', function (message) {
        console.log("Recibiendo trabajo de otro proceso")
      console.log(message);
    });
  });
};

const setUpExpress = () => {

  // inciar server
  app.server.listen(config.port, () => {
    //log.prod.info(`El servidor esta corriendo en => http://localhost:${app.server.address().port} con el id del proceso ${process.pid}`);
    console.log(`El servidor esta corriendo el id del proceso ${process.pid}`)
});

  // si ocurre algun error
  app.on('error', (appErr, appCtx) => {
    log.prod.error('app error', appErr.stack);
    log.prod.error('en la url', appCtx.req.url);
    log.prod.error('con cabecera', appCtx.req.headers);
  });
};


  // crear server
  app.server = http.createServer(app);

  app.use(cors({ origin: '*' }));

  // parser application/json
/*   app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json()) */

  app.disable('x-powered-by');

  // routes
  //setRouter(app);

/*   app.use(middlewares.errorHandler);
  app.use(middlewares.notFoundHandler); */

  app.get('/swagger', (req, res) => {
      res.json({msm: 'Reto Rimac'})
  })

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */
const setupServer = () => {

  // si es un proceso maestro, se llama a la configuración del proceso de trabajo

  console.log(config)
  console.log(config.isClusterRequired)
  if (config.isClusterRequired && cluster.isMaster) {

    console.log("aaaa")
    setupWorkerProcesses();
  } else {
    console.log("bbbb")
    // para configurar las configuraciones del servidor y compartir la dirección del puerto para las solicitudes entrantes
    setUpExpress();
  }
};

setupServer();


module.exports.swagger = serverless(app)