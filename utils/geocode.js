const request = require('request');
const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiYWxpa2FkaGltIiwiYSI6ImNqenZ0bDFzdzBhdGozbnBrMDFleDZ3dHQifQ.ak4IhXE5LXp1b3ofQC5l_Q&limit=1`;
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.features.length === 0) {
            callback(`Unable to find your location`);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    });
}

module.exports = geocode;