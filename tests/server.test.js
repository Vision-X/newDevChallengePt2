process.env.NODE_ENV = 'test';
const chai           = require('chai');
const expect         = chai.expect;
const chaiHttp       = require('chai-http');
const server         = require('../server/server.js');
const config         = require('../knexfile.js')['test'];
const db             = require('knex')(config);

chai.should();
chai.use(chaiHttp);

const API_URL = 'http://localhost:3000';

describe('Running tests on the express server', () => {
  it('Should exist', () => {
    expect(server).to.exist;
  });
});

describe('Initiate migrations and seeds for server testing', () => {
    beforeEach((done) => {
      db.migrate.latest()
        .then(() => db.seed.run())
        .then(() => done());
    });

    afterEach((done) => {
      db.seed.run()
        .then(() => done());
    });

  describe('Testing API Routes', () => {
    it('Should respond with 404 at unspecified endpoints', (done) => {
      chai.request(server)
          .get('/red-wine')
          .end((err, res) => {
            res.should.have.status(404);
            res.text.should.include('Not Found');
            done();
          });
      });
  });

  describe('API Route testing - get all route', () => {
    describe('GET route for /locations', () => {
      it('Should respond with 200 & return all locations', (done) => {
        chai.request(server)
            .get('/api/locations')
            .end((err, res) => {
              const location = res.body.locations[0];

              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.locations.should.be.a('array');
              res.body.locations.length.should.equal(3);

              location.should.have.property('id');
              location.should.have.property('name');
              location.should.have.property('lat');
              location.should.have.property('lng');

              done();
            })
      });
    });
  });

  describe('POST /api/add-location', () => {
    describe('POST route for adding new location', () => {

      let data = {
          "name": "dummy",
          "lat": 11.111,
          "lng": 100.000,
          "drawPoly": false
      };

      it('Should respond with 201', (done) => {
          chai.request(server)
              .post('/api/add-location')
              .send(data)
              .end((err, res) => {
                  if (err) return done(err);
                  const location = res.body.location;

                  res.should.have.status(201);
                  res.should.be.json;

                  location.should.be.a('object');
                  location.should.have.property('id');
                  location.should.have.property('name');
                  location.should.have.property('lat');
                  location.should.have.property('lng');
                  done();
              });
      });
    })
  });

  describe('POST /api/add-location', () => {
    describe('POST route error handling for invalid lat/lng', () => {

      let data = {
        "name": "Houston",
        "lat": 1000,
        "lng": -1000,
        "drawPoly": true
      };

      it('Should respond with 422 (Unprocessable Entity)', (done) => {
          chai.request(server)
              .post('/api/add-location')
              .send(data)
              .end((err, res) => {
                  if (err) return done(err);
                  res.should.have.status(422);
                  res.error.text.should.include("Invalid Coords");
                  done();
              });
      });


    })
  });

  // Next Test / PUT name, coords(validate), drawPoly
  // if POST item any key:values exists already in state, lets swap to PUT route

});
