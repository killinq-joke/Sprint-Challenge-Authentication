const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environnement = process.env.DB_ENV || "development"

module.exports = knex(knexConfig.development);
