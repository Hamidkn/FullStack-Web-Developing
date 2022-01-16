// building a server

const express = require("express");

const app = express();
const port = 3000;

app.get("/", function(request, response) {
    // console.log(request);
    // response.send("Hello World!");
    response.send("<h1>Hello World!</h1>")
});

// if you have different pages like contact, projects and you want to make a route to them: 
app.get("/contact", function(req, res) {
    res.send("Contact me at: hamid@gmail.com.");
});

app.get("/about", function(req, res) {
    res.send("<h1>This is Hamid. I am a developer. Welcome to my page.</h1>")
})

app.listen(port, function() {
    console.log(`server started at http://localhost:${port}`);
});