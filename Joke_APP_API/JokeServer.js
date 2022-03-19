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
    res.render("index", { joke: null, error: null });
});

app.post("/", function(req, res) {
    let category = req.body.jokecategory;
    let type = req.body.joketype;
    console.log(type);
    let nsfw = req.body.nsfw;
    let religious = req.body.religious;
    let political = req.body.political;
    let racist = req.body.racist;
    let sexist = req.body.sexist;
    let explicit = req.body.explicit;
    let en = req.body.en;
    let de = req.body.de;
    let es = req.body.es;
    // console.log(religious)
    // exports.myHandler = async(req, res) => {
    //     const {
    //         nsfw,
    //         religious,
    //         political,
    //         racist,
    //         sexist,
    //         explicit
    //     } = req.body
    // }

    exports.myHandler = async(req, res) => {
            const { flags } = req.body
            flags.forEach(flag => console.log(flag))
        }
        // console.log(flags);

    // console.log(nsfw);
    if (de == 'on') {
        lang = 'de'
    } else if (es == 'on') {
        lang = 'es'
    } else if (en == 'on') {
        lang = 'en'
    }
    let url = `https://v2.jokeapi.dev/joke/${category}?lang=${lang}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render("index", { joke: null, jokedelivery: null, error: "Incorrect category!" });
        } else {
            let data = JSON.parse(body);
            if (nsfw == 'on') {
                data.flags.nsfw = true;
            }
            if (religious == 'on') {
                data.flags.religious = true;
            }
            if (political == 'on') {
                data.flags.political = true;
            }
            if (racist == 'on') {
                data.flag.racist = true;
            }
            if (sexist == 'on') {
                data.flags.sexist = true;
            }
            if (explicit == 'on') {
                data.flags.explicit = true;
            }
            console.log(data);
            if (category == undefined) {
                res.render('index', { joke: null, jokedelivery: null, error: 'Error, category is invalid!' });
            }
            if (type == 'single') {

                let JokeText = data.joke;
                res.render('index', { joke: JokeText, jokedelivery: null, error: null });
            } else if (type == 'twopart') {
                let JokeText = data.setup;
                let JokeDelivery = data.delivery;
                res.render('index', { joke: JokeText, jokedelivery: JokeDelivery, error: null });
            } else {
                if (data.setup != null) {
                    let JokeText = data.setup;
                    let JokeDelivery = data.delivery;
                    res.render('index', { joke: JokeText, jokedelivery: JokeDelivery, error: null });
                } else {
                    let JokeText = data.joke;
                    res.render('index', { joke: JokeText, jokedelivery: null, error: null });
                }

            }
            // let JokeText = data.joke;
            // // console.log(data);
            // // let JokeText = `It's ${data.main.temp} degrees in ${data.name}, ${data.sys.country}!`;
            // res.render('index', { joke: JokeText, error: null });
        }
    });
})

app.listen(port, function(req, res) {
    console.log(`Listening on port: ${port}`);
})