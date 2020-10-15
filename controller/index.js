const { getPlanet  } = require('../services/consumer/index')
const AWS = require('aws-sdk')
const modelPlanet = require('../services/models/planetModel')
const Dynamo = require('../db/dynamoDB')
const md5 = require('md5')
const responses = require('../responses/apiResponses')


function sortBtId(a,b){
    if(a.createdAt > b.createdAt) return -1;
    return 1;
  }

const createPlanet = async (req, res) => {
    try {
        console.log(req.params.number)
        const resPlanet = await Dynamo.getByID(md5(req.params.number), 'planet');   
        console.log(resPlanet)     
        if(!resPlanet || !resPlanet.Item){
        const planetConsumer = await getPlanet(req.params.number);
        if(planetConsumer){
            const post = {
            id: md5(req.params.number),
            createdAt: new Date().toISOString(),
            type: 2, // indicando que es para planets
            ...planetConsumer
            }
            const resSave = await Dynamo.saveItem('planet', post);
            res.json(responses._201(post))
        }
        }else{
            res.json(responses._200((resPlanet.Item)))
        }      
    } catch (error) {
        console.log("Error en createPlanet")
        res.json(responses._500({body: 'Error en createPlanet'}))
    }
}

/** REALIZA LA QUERY A DYNAMODB, OBTIENE TODOS LOS DATOS GUARDADOS  */
const getAllPlanet = async (req, res) => {
    try {
      const result = await Dynamo.getAll('planet', 2);
      console.log("###########")
      console.log(result)
      res.json(responses._200(result.Items.sort(sortBtId)))
    } catch (error) {
      res.json(responses._500({msm: error}))
    }
  };
  
  /** REALIZA LA QUERY A DYNAMODB DE CIERTO RANGO DE REGISTROS */
  const getPlanets = async (req, res) => {    
    try {
      const numberPlanet = req.params.number;
      const result = await Dynamo.getItemLimit('planet', numberPlanet);
      res.json(responses._200(result.Items.sort(sortBtId)));
    } catch (error) {
      res.json(responses._500({error: 'Error getPlanets'}))
    }
  };
  
  /** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
  const getOnePlanet = async (req, res) => {  
    try {
      const idPlanet = req.params.id;
      const result = await Dynamo.getByID(idPlanet, 'planet');
      if(!result || !result.Item) res.json(responses._200({msm: 'Not found'}));
      res.json(responses._200(result.Item));
    } catch (error) {
      res.json(responses._500({msm: error}))
    }
  };
  
  /** REALIZA LA QUERY A DYNAMODB, ACTUALIZA SI EXISTE, SINO NO ACTUALIZA */
  const putPlanet = async (req, res) => {
    try {
      const idPlanet = req.params.id;
      console.log("el id para update", idPlanet)
      //const dataForm = req.body
      const paramName = req.body.paramName;
      const paramValue = req.body.paramValue;
  
      const result = await Dynamo.updateItem(idPlanet, 'planet', paramName, paramValue);
      res.json(responses._200({message: 'Update Success'}));
    } catch (error) {
      res.json(responses._500({msm: error}))
    }
  };
  
  /** REALIZA LA QUERY A DYNAMODB, ELIMINA EL REGISTRO */
  const deletePlanet = async (req, res) => {
    try {
      const idPlanet = req.params.id;
      await Dynamo.deleteIten(idPlanet, 'planet');
      res.json(responses._200({message: 'Delete Success'}))
    } catch (error) {
      res.json(responses._500({msm: error}))
    }
  };


module.exports = {
    createPlanet,
    getAllPlanet,
    getPlanets,
    getOnePlanet,
    putPlanet,
    deletePlanet
}