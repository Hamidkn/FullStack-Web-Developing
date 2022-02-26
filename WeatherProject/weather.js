const express = require('express');
// Beacuse request module is depricated in jan 2020 so we are going to use HTTPS module
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const appid = "496d8432fcb8268239987dcacd0f2f31"
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${query}&units=metric`
    https.get(url, function(response) {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The weather is currently ${weatherDescription}</p>`)

            res.write(`<h1>The temprature of the ${query} is ${temp} degrees. </h1>`)
            res.write(`<img src=${imageUrl}>`);
            res.send()
        })
    })

})

app.listen(port, function() {
    console.log("Server is listening!");
})