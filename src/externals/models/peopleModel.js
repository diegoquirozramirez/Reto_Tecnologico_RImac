'use strict';

module.exports = class peopleModel{        
        constructor(value){
            this.nombre = value.name;
            this.altura = value.height;
            this.peso = value.mass;
            this.cabello = value.hair_color;
            this.piel = value.skin_color;
            this.ojo = value.eye_color;
            this.nacimiento = value.birth_year;
            this.genero = value.gender;
            this.natal = value.homeworld;
            this.created = value.created;
            this.editad = value.edited;
            this.url = value.url
        }

        set generoValid(name){
            this.genero = name;
        }
}
