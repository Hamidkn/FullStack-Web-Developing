const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))
const port = 3000;

app.get("/", function(req, res) {
    // res.send("<h1>Hello World!</h1>");
    // res.sendFile("index.html");
    res.sendFile(__dirname + "/index.html"); // __dirname is the file path of the current file.
});

app.post("/", function(req, res) {
    // console.log(req.body.number1); //{ number1: '1', number2: '2', submit: '' }
    var num1 = Number(req.body.number1);
    var num2 = Number(req.body.number2);
    var result = num1 + num2;
    res.send("the results is " + result + ".");
})

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html"); // __dirname is the file path of the current file.
});

app.post('/bmicalculator', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = weight / Math.pow(height, 2);

    res.send("The result is: " + bmi + ".");
})

app.listen(port, function() {
    console.log(`listen on ${port}.`);
});