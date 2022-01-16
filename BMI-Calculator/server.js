const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = weight / Math.pow(height, 2);

    res.send("The result is: " + bmi + ".");

})

app.listen(port);