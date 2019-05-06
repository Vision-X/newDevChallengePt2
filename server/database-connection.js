const CONFIG = require('../knexfile')[process.env.NODE_ENV || "development"];
console.log('DB CONFIG : ', CONFIG);
module.exports = require('knex')(CONFIG);
