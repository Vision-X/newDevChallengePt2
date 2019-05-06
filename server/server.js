const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const port       = parseInt(process.env.PORT || 3001);
const proxy      = require('http-proxy-middleware');
const app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/locations', (req, res) => res.send({ locations: app.locals.locations }));

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

const portNumber = process.env.PORT || 3001;

app.listen(portNumber, () => {
  console.log('RrrarrrrRrrrr server alive on port 3001');
});
