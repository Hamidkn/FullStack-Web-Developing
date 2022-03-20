//jshint esversion:6


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

let data = ["Workout"];
let workItems = [];

app.get("/", function(req, res) {
    // var day = "";
    let today = new Date();
    // currentday = today.getDay();

    // switch (currentday) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error!");
    // }
    // if (currentday == 6 || currentday == 0) {
    //     day = "weekend";
    //     // res.render("todolist", { day: day });
    // } else {
    //     day = 'week day';
    //     // res.render("todolist", { day: day })
    // }
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    res.render("todolist", { listTitle: day, newListItems: data })

})

app.post("/", function(req, res) {
    console.log(req.body);
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work"); // will go to app.get
    } else {
        data.push(item);
        res.redirect("/"); // will go to app.get
    }



    // console.log(data);
    // res.render("todolist", { kindofday: null, newListItem: data }); 

})


app.get("/work", function(req, res) {
    res.render("todolist", { listTitle: "Work List", newListItems: workItems });
})

app.post("/work", function(req, res) {
    let workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
})

app.listen(port, function() {
    console.log(`App is listening on ${port} `);
})