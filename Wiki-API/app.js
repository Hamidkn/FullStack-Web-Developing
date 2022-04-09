const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

//refactoring the methods using route methods
// requests targetting all articles
app.route("/articles")
    .get(function(req, res) {
        Article.find(function(err, foundArticles) {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticles);
            }
        });
    })
    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully added a new article.");
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted all articles.");
            }
        });
    });

//Get a specific article
app.route("/articles/:articleTitle")
    .get(function(req, res) {
        Article.findOne({
            title: req.params.articleTitle
        }, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticle);
            }
        });
    })
    .put(function(req, res) {
        Article.update({
            title: req.params.articleTitle
        }, {
            title: req.body.title,
            content: req.body.content
        }, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully updated article.");
            }
        });
    })
    .patch(function(req, res) {
        Article.updateOne({
            title: req.params.articleTitle
        }, {
            $set: req.body
        }, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully updated article.");
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteOne({
            title: req.params.articleTitle
        }, function(err, foundArticle) {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully deleted article.");
            }
        });
    });

app.listen(port, function() {
    console.log(`App is listening on ${port} `);
});