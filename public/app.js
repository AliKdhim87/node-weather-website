let myInput = document.getElementById('input')
const weatherForm = document.querySelector('form');
const forecast = document.getElementById('forecast');
const locationName = document.getElementById('location');
const showWeather = document.querySelector('.show-weather');
const img = document.querySelector('img');
weatherForm.addEventListener('submit', (e) => {
    const location = myInput.value
    e.preventDefault();
    fetch(`/weather?adress=${encodeURIComponent(location)}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                forecast.textContent = data.error;
                img.src = '';
                locationName.textContent = '';
            } else {
                forecast.textContent = `${data.forecast.summary} It is currently  ${Math.floor(data.forecast.temperature)}  °C. 
                The hight tody is ${Math.floor(data.forecast.temperatureMax)}°C  with a low of ${Math.floor(data.forecast.temperatureMin)}°C  There is a ${data.forecast.precipProbability} % chance of rain `;
                locationName.textContent = data.location;
                img.src = `/animated/${data.forecast.icon}.svg`
            }
        })
});