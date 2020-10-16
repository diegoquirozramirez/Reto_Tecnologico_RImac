### ServerlessJS + AWS + Lambda + DynamoDB

- Full-featured: ServerlessJS + AWS + Lambda + DynamoDB
# Backend Development

![](http://www.accessyexcel.com/wp-content/uploads/2018/03/aws.png)

![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) 




> Proyecto realizado como parte del Reto Técnico de Rimac
> Amazon Web Services 

### Importante

Existencia de 2 Modelos:
- People (haciendo referencia a los personajes del API Start War)
- Planet (haciendo referencia a los planetas del API Start War)

### Plugins

Este proyecto se uso plugins para mejorar el desarrollo y la rapidez.
Listado:

| Plugin | README |
| ------ | ------ |
| serverless-offline | [https://github.com/dherault/serverless-offline/blob/master/README.md] |
| serverless-plugin-include-dependencies | [https://github.com/dougmoscrop/serverless-plugin-include-dependencies/blob/master/README.md] |
| serverless-mocha-plugin | [https://github.com/nordcloud/serverless-mocha-plugin/blob/master/README.md] |

### Initialitation

This project requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies.

```sh
$ npm install -d
```
or
```sh
$ npm install --save
```

## Serverless Framework

This project requires [Serverless.js](https://www.serverless.com/) to run.

```sh
$ npm install serverless -g
```

### KEYs CONFIGURATION

- Es necesario configurar los KEYS de AWS

```sh
$ serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET_KEY
```
### Simulation Execute Lambdas

Para realizar pruebas antes de un DEPLOY, el siguiente comando:

```sh
sls offline
```

Esto levantará el proyecto por default en 'localhost' en el puerto '3000'

### Testing

Testeo con Mochajs.

Para poder realizar TDD con Mochajs realizar los siguientes comandos. 
Importante:
    - Los nombres de las funciones de testeo deben existir en el proyecto.

Para el modelo People

```sh
export NAME_FUNCTION = people
sls invoke test -f ${NAME_FUNCTION}
```
Esto realizará las pruebas unitarias para el modelo People (haciendo referencia a los personajes del API StarWar)

License
----
Developer Software : DIEGO ANTONIO QUIROZ RAMIREZ | ingquirozramirez@gmail.com
OPEN SOURCE
