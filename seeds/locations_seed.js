
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
         knex('locations').insert([
          {
            id: 1,
            name: 'Denver',
            lat: 39.742043,
            lng: -104.991531,
            drawpoly: false
          },
          {
            id: 2,
            name: 'LA',
            lat: 34.052235,
            lng: -118.243683,
            drawpoly: false
          },
          {
            id: 3,
            name: 'Boston',
            lat: 42.364506,
            lng: -71.038887,
            drawpoly: false
          }
        ])
      ])
      })
      .then(() => {
        return knex.raw('ALTER SEQUENCE locations_id_seq RESTART WITH 4;');
      })
};
