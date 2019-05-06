
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          id: 1,
          name: 'Denver',
          lat: 39.742043,
          lng: -104.991531,
          drawPoly: false
        },
        {
          id: 2,
          name: 'LA',
          lat: 34.052235,
          lng: -118.243683,
          drawPoly: false
        },
        {
          id: 3,
          name: 'Boston',
          lat: 42.364506,
          lng: -71.038887,
          drawPoly: false
        }
      ]);
    })
    .then(() => {
      return knex.raw('ALTER SEQUENCE locations_id_seq RESTART WITH 4;');
    })
};
