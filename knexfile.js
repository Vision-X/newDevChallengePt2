require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql:///locations-database'
  },

  test: {
    client: 'pg',
    connection: 'postgresql:///locations-database'
  },

  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}?ssl=true`,
    pool: {
      min: 2,
      max: 10
    }
  }
};
