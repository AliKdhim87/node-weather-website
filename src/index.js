const express = require('express');
const path = require('path');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '../public')))
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        res.statusCode = 400;
        return res.send({
            error: " Provide your location"
        });
    }
    geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {

        if (error) {

            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {

                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        });
    });

});
app.get('*', (req, res) => {
    res.render('404')
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server is reunning' + port);
})