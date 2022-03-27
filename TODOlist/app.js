//jshint esversion:6


const express = require('express');
const unirest = require('unirest');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');
// const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

//connect to the database
mongoose.connect("mongodb+srv://admin-Hamid:<Password>@cluster0.oewjw.mongodb.net/todolistDB");
// let data = ["Workout"];
// let workItems = [];
const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist."
});

const item2 = new Item({
    name: "Hit the + button to add new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

    // const day = date.getDate();
    Item.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added default items to the database.");
                }
            });
            res.redirect("/");
        } else {
            res.render("todolist", { listTitle: "Today", newListItems: foundItems })
        }
    })
})

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({ name: customListName }, function(err, foundList) {
            if (!err) {
                if (!foundList) {
                    //Create a new list
                    const list = new List({
                        name: customListName,
                        items: defaultItems
                    });
                    list.save();
                    res.redirect("/" + customListName);
                } else {
                    //Show an existing list
                    res.render("todolist", { listTitle: foundList.name, newListItems: foundList.items })
                }
            }
        })
        // res.send(req.params);
});

app.post("/", function(req, res) {
    let itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    //Today is default page
    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

})

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;
    const checkedname = req.body.listName;

    if (checkedname === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err) {
            if (!err) {
                console.log("Successfully deleted the item");
                res.redirect("/");
            } else {
                console.log("Could not find any item with the provided id!");
            }
        });
    } else {
        List.findOneAndUpdate({ name: checkedname }, { $pull: { items: { _id: checkedItemId } } }, function(err, foundList) {
            if (!err) {
                res.redirect("/" + checkedname);
            }
        })
    }

})


app.post("/work", function(req, res) {
    let workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
})

app.get("/about", function(req, res) {
    res.render("about");
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log(`App is listening on ${port} `);
})