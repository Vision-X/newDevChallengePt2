const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const morgan     = require('morgan');
const proxy      = require('http-proxy-middleware');
const queries    = require('./queries');
const app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));

const initialLocations = [
  {
    id: 'id1',
    name: 'Denver',
    lat: 39.742043,
    lng: -104.991531,
  },
  {
    id: 'id2',
    name: 'LA',
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 'id3',
    name: 'Boston',
    lat: 42.364506,
    lng: -71.038887,
  },
];

app.locals.idIndex = 3;
app.locals.locations = initialLocations;

app.get('/locations', (req, res) => {
  console.log("locations fetch request initiated...");
  res.send({ locations: app.locals.locations });
});

// For handling local proxy and file serving
if (process.env.NODE_ENV !== 'production') {
  console.warn('WARNING: Proxying Traffic to: http://0.0.0.0:3000')
  app.use('/', proxy({ target: 'http://127.0.0.1:3000', changeOrigin: true }))
} else {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
};

app.get('/', (req, res) => {
  console.log("sending build file..........");
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// API Routes

// GET all locations
app.get('/api/locations', (req, res) => {
  console.log("LOCATIONS API ROUTE.......");
  queries.list().then(locations => {
    console.log("api location data: ", locations);
    // res.text(locations)
    res.json({ locations: locations });
  }).catch(console.error)
});

// GET location by ID
app.get('/api/locations/:id', (req, res) => {
  queries.read(req.params.id)
         .then(location => {
           location
              ? res.json({ location })
              : res.sendStatus(404)
         }).catch(console.error);
});

// POST new location
app.post('/api/add-location', (req, res) => {
  queries.create(req.body, 'locations')
         .then(location => {
           res.status(201).json({ location: location })
         }).catch(console.error);
});

// DELETE location
app.delete('/api/locations/:id', (req, res) => {
  queries.delete(req.params.id)
         .then(() => {
           res.sendStatus(204);
         }).catch(console.error);
});

// UPDATE existing location
app.put('/api/locations/:id', (req, res) => {
  queries.update(req.params.id, req.body)
         .then(location => {
           res.json({ location: location[0]});
         }).catch(console.error);
});

// Errors
// app.use((req, res) => {
//   res.sendStatus(404);
// })

module.exports = app;
