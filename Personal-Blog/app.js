//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { json } = require('body-parser');
const _ = require('lodash');
truncate = require('truncate');
const mongoose = require('mongoose');

const homeStartingContent = "In this Blog, I will share my experiences and thoughts about my life. This is the first blog I have written. I hope you enjoy it. Stay tuned for more!";
const aboutContent = "This is a Personal Blog. It is a place where I can write about my life, my work in general. I hope you enjoy it.";
const contactContent = "You can be in touch with me on any of the following platforms: \n Email: hamid.keshmiri@gmail.\n LinkedIn: https://www.linkedin.com/in/hamid-keshmiri-a9b8b8b2   \n Website: https://hamidkeshmiri.com ";
mongoose.connect("mongodb://localhost:27017/personalBlogDB");

const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = 3000;
// let posts = [];

const postItemsSchema = {
    title: String,
    post: String
}

const Post = mongoose.model("Post", postItemsSchema);

const homePost = new Post({
    title: "Home",
    post: homeStartingContent
});

const aboutpost = new Post({
    title: "About",
    post: aboutContent
});

const contactPost = new Post({
    title: "Contact",
    post: contactContent
});

const homePostsItems = [homePost];
// homePost.save();

app.get("/", function(req, res) {
    Post.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
            Post.insertMany(homePostsItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added default items to the database.");
                }
            });
            res.redirect("/");
        } else {
            res.render("home", { posts: foundItems })
        }
    });
    // res.render("home", { homeContent: homeStartingContent, posts: posts });
});

app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    var data = new Post({
        title: req.body.postTitle,
        post: req.body.postBody
    });
    // posts.push(data);
    data.save();
    res.redirect("/");
});

app.get("/posts/:postId", function(req, res) {
    // console.log(req.params.postId); // day 1
    const customPostId = req.params.postId;
    Post.findOne({ _id: customPostId }, function(err, foundItem) {
        res.render("post", { posts: foundItem });
    });
    // posts.forEach(function(post) {
    //     if (_.lowerCase(req.params.postName) == _.lowerCase(post.title)) {
    //         res.render("post", { posts: post });
    //     }
    // });
    // res.send(req.params);
});


app.listen(port, function() {
    console.log(`App is listening on ${port} `);
});