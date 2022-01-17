const express = require('express');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');


const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))
const port = 3000;
const url = "https://v2.jokeapi.dev/joke/"

app.get("/", function(req, res) {
    // res.sendFile(__dirname + "/views/index.ejs");
    res.render("index", { Joke: null, error: null });
});

app.post("/", function(req, res) {
    let category = req.body.jokecategory;
    let type = req.body.joketype;
    let nsfw = req.body.nsfw;
    let religious = req.body.religious;
    let political = req.body.political;
    let racist = req.body.racist;
    let sexist = req.body.sexist;
    let explicit = req.body.explicit;
    console.log(category);
    let url = `https://v2.jokeapi.dev/joke/${category}`;

    request(url, function(err, res, body) {
        if (err) {
            res.render("index", { Joke: null, error: "Incorrect category!" });
        } else {
            let data = JSON.parse(body);
            if (category == undefined) {
                res.render('index', { Joke: null, error: 'Error, category is invalid!' });
            } else {
                if (type == 'single' || type == 'twopart') {

                }
                let JokeText = `It's ${data.main.temp} degrees in ${data.name}, ${data.sys.country}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

app.listen(port, function(req, res) {
    console.log(`Listening on port: ${port}`);
})