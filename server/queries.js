const db = require('./database-connection');

module.exports = {
  list() {
    return db('locations')
  },
  read(id) {
    return db('locations')
          .select('*')
          .where('id', id)
          .first()
  },
  create(location) {
    return db('locations')
          .insert(location)
          .returning('*')
          .then(location => location[0])
  },
  update(id, location) {
    return db('locations')
          .update(location)
          .where('id', id)
          .returning('*')
          .then(location => location[0])
  },
  delete(id) {
    return db('locations')
          .select('*')
          .where('id', id)
          .del()
  }
}
