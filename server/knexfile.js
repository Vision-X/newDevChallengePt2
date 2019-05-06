// require('dotenv').load();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///locations-db',
  },

  test: {
    client: 'pg',
    connection: 'postgresql:///locations-db',
  },

  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    },
    useNullAsDefault: true
  }

};
