const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/11b6520248fa9262089cf62026dc69f1/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si `;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', error);
        } else if (body.error) {
            callback('Unable to find your location', error.body);
        } else {
            callback(undefined, {
                icon: body.daily.data[0].icon,
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.daily.data[0].precipProbability

            });
        }
    });
}
module.exports = forecast;