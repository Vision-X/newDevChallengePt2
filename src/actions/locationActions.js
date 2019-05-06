require('isomorphic-fetch');

const storeAllLocations = (locations) => {
  return {
    type: 'STORE_LOCATIONS',
    data: locations.locations,
  };
};

const fetchAllLocations = () => {
  return (dispatch) => {
    return fetch('/locations', {
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
