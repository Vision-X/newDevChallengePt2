require('dotenv');
require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///locations-db'
  },

  test: {
    client: 'pg',
    connection: 'postgresql:///locations-db'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/locations-db',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'locations'
    }
  }

};
