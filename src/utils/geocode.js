const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?types=country&access_token=pk.eyJ1IjoiZGFtb2RoYXJqa2RzdmJrdmpid3YiLCJhIjoiY2todndtb3F0MWJlczJycGkwdXo3Yml0MyJ9.JaNO3ph_AOY11mQZs-oNVA';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            //console.log('Unable to connect to location service!');
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.features.length === 0) {
            //console.log('Unable to find location. Try another search.');
            callback('Unable to find location. Try another search.', undefined);
        } else {
            // const latitude = response.body.features[0].center[1];
            // const longitude = response.body.features[0].center[0];
            // console.log(latitude, longitude)
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
                query: response.body.query[0]
            })
        }
    });
}

module.exports = geocode;