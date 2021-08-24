//'use strict';

const axios = require('axios');
const modelPeople = require('../models/peopleModel')
const modelPlanet = require('../models/planetModel')
const { restClient } = require('../../../config/rest/configAxios');
const responses = require('../../../config/responses/apiResponses')

const getPeople = async (number) => {
    try {
        
        const data = await restClient(`https://swapi.py4e.com/api/peopl/${number}`, 'GET', {});
        const { statusCode, body } = data;
        if(statusCode != 200){
            return data;
        }else{            
            //console.log("el body", JSON.parse(body))
            const people = new modelPeople(JSON.parse(body))
            if(people.genero == "n/a"){
                people.generoValid = "N/A"
            }
            //console.log(people)
            return responses._200({...people});
        }
        
    } catch (error) {
        console.log("en el error del catch", error)
        return responses._500({msm: "Error to execute getPeople", error: error});
    }
}

const getPlanet = async (number) => {
    try {
        const {data} = await axios({
            methos: 'GET',
            url: `https://swapi.py4e.com/api/planets/${number}`
        })
        
        const planet = new modelPlanet(
            data.name,
            data.rotation_period,
            data.orbital_period,
            data.diameter,
            data.climate,
            data.gravity,
            data.terrain,
            data.surface_water,
            data.population,
            data.residents,
            data.films,
            data.created,
            data.edited,
            data.url
        )
        console.log(planet)
        return planet;
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    getPeople,
    getPlanet
}
