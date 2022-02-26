//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser")
const https = require("https");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };
    const jsonData = JSON.stringify(data);

    const listId = "3cdf42b11d";
    const url = `https://us14.api.mailchimp.com/3.0/lists/${listId}`;
    const appid = "e192ae24412843f5f8e2871c09127830-us14";

    const options = {
        method: "POST",
        auth: "hamid:e192ae24412843f5f8e2871c09127830-us14"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

// change the port to the dynamically port by Heroku
app.listen(process.env.PORT || port, function() {
    console.log("server is running....");
})


// API Code
// e192ae24412843f5f8e2871c09127830-us14

// list id or unique id for audiences hamidneghab
// 3cdf42b11d