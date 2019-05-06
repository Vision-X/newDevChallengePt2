// require('dotenv').load();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///locations-db',
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgresql:///locations-db',
    migrations: {
      directory: './migrations/'
    },
    seeds: {
      directory: './seeds/'
    }
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
