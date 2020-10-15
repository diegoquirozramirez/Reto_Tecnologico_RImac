
  // const dotenv = require("dotenv");
//import dotenv from 'dotenv';
const dotenv = require('dotenv')

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


module.exports = {
  isProd: process.env.NODE_ENV === "production",
  logLevel: Number(process.env.LOG_LEVEL) || 0,
  debug: process.env.DEBUG == '1',
  isClusterRequired: Number(process.env.IS_CLUSTER_REQUIRED)  || 1,
  numCores: process.env.NUM_CORES  || 1,
  port: process.env.PORT  || 5000
}