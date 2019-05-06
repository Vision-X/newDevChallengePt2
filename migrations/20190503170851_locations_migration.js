exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', table => {
      table.increments('id').primary()
      table.text('name')
      table.float('lat')
      table.float('lng')
      table.boolean('drawpoly')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('locations')
  ]);
};
