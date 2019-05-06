require('isomorphic-fetch');

const API_URL = 'http://localhost:3001';

const storeAllLocations = (locations) => {
  return {
    type: 'STORE_LOCATIONS',
    data: locations.locations,
  };
};

const fetchAllLocations = () => {
  return (dispatch) => {
    return fetch(API_URL + '/api/locations', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      // .then(locations => locations.text())
      // .then(text => console.log(text))
      // .then(text => dispatch(storeAllLocations(text)));
      .then(locations => locations.json())
      .then(json => dispatch(storeAllLocations(json)));
  };
};

export default fetchAllLocations;
