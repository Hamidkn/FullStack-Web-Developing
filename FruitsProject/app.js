const mongoose = require('mongoose');
// Replace the uri string with your MongoDB deployment's connection string.

// if the database name fruitsDB does not exist it will create it
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No name specified!"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Great"
});

fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
});

// person.save();

const Kiwi = new Fruit({
    name: "kiwi",
    rating: 8,
    review: "not bad"
});
const Banana = new Fruit({
    name: "banana",
    rating: 5,
    review: "not bad"
});

// Fruit.insertMany([Kiwi, Banana], function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully inserted.");
//     }
// });

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();
        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });
    }
});






// mongodb connection and insertion
// const uri =
//     "mongodb://localhost:27017";
// const client = new MongoClient(uri);
// async function run() {
//     try {
//         await client.connect();
//         const database = client.db('fruitsDB');
//         const fruits = database.collection('fruits');
//         // Query for a movie that has the title 'Back to the Future'
//         fruits.insertMany([{
//             name: "Orange",
//             price: 10
//         }, {
//             name: "Apple",
//             price: 8
//         }]);
//         const query = { price: { $gt: 5 } };
//         const fruit = fruits.find(query);
//         console.log(fruit);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);