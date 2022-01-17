const unirest = require("unirest");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const url = "https://api.openweathermap.org/data/2.5/weather?q="
const appid = "496d8432fcb8268239987dcacd0f2f31"
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

const port = 3000;

app.get("/", function(req, res) {
    // console.log(__dirname);
    // res.sendFile(__dirname + "/index.ejs");
    res.render("index", { weather: null, error: null });

});

app.post("/", function(req, res) {

    // var city = req.body.city;
    // var apiurl = url + city + appid;

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appid}`
    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let data = JSON.parse(body)
            const { main, name, sys, weather } = data;
            if (data.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${data.main.temp} degrees in ${data.name}, ${data.sys.country}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }

        // unirest.get("https://api.openweathermap.org/data/2.5/weather")
        //     .header("X-RapidAPI-Key", "496d8432fcb8268239987dcacd0f2f31")
        //     // .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
        //     .query({
        //         'appid': "496d8432fcb8268239987dcacd0f2f31",
        //         'q': city,
        //         // 'lon': '12.4924',
        //         // 'lat': '41.8902',
        //         'units': 'metric',
        //         'mode': 'html'
        //     })
        //     .end(function(result) {
        //         res.writeHead(200, { "Content-Type": "text/html" });
        //         res.write(result.body);

    });
})


app.listen(port, function(req, res) {
    console.log(`Listening on port ${port}.`);
})