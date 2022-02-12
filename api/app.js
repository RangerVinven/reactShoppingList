const express = require("express");
const MongoClient = require("mongodb").MongoClient;
 const cors = require('cors');
const app = express();
// const path = require("path");


let corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    methods: "GET, PUT"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

MongoClient.connect("mongodb+srv://Admin:oR3I2IU2wH8TuRkcuJLvxh9PEK0IIvPbCe6c@shoppinglist.ko151.mongodb.net/shoppingList", (err, client) => {
    if (err) return console.log(err);
    console.log("Connected to database");

    // Gets the database and the collection
    const db = client.db("shoppingList");
    const shoppingListCollection = db.collection("shoppingList");

    // Post request for adding to the database
    app.post("/v1/addToDatabase", (req, res) => {
        shoppingListCollection.insertOne(req.body).then(result => {
            console.log(result);
        }).catch(error => console.log(error));
        res.send(true);
    });

    // Gets the entire shopping list
    app.get("/v1/getShoppingList", (req, res) => {
        shoppingListCollection.find().toArray((err, items) => {
            res.send(items);
        });
    });

    // Deletes the shopping list item
    app.delete("/v1/removeShoppingItem/:id", (req, res) => {
        console.log("Test");
        console.log(req.params.id);
        shoppingListCollection.deleteOne({"_id": Number(req.params.id.replace(":", ""))});
        res.sendStatus(200);
    });

    // Changes the amount for the item with the id that's passed in
    app.put("/v1/changeAmount/:id/:newAmount", (req, res) => {
        console.log(req.params.id);
        console.log(req.params.newAmount);
        shoppingListCollection.updateOne({
            "_id": Number(req.params.id.replace(":", ""))
        }, {
            $set: {
                "amount": Number(req.params.newAmount)
            }
        })
        res.sendStatus(200);
    });

    // Changes the got of the item with the id that's passed in
    app.put("/v1/changeGot/:id/:newGot", (req, res) => {
        console.log(req.params.newGot);
        console.log(req.params.id.replace(":", ""));
        let newGot;
        if(req.params.newGot === "true") {
            newGot = true;
        } else {
            newGot = false;
        }


        shoppingListCollection.updateOne({
            "_id": Number(req.params.id.replace(":", ""))
        }, {
            $set: {
                "got": Boolean(newGot)
            }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
        res.sendStatus(200);
    });

});

app.listen(5000);