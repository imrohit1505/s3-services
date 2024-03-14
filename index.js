const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Bucket = require('./models/bucket');
const Object = require('./models/object');
// const database = require('./client/database');

// Create an Express app
const app = express();
app.use(express.json())

// Create a MongoClient
const client = new mongodb.MongoClient('mongodb+srv://rr150500:I%40love15study@s3-services.ftx2any.mongodb.net/?retryWrites=true&w=majority');

// Connect to the database
client.connect(function(err, db) {
    if (err) {
        console.log('Error connecting to database:', err);
        return;
    }

    // Create a database object
    const database = db.db('s3-services');

    // Define the API routes
    app.get('/objects', async (req, res) => {
        // Create a collection object
        const collection = database.collection('objects');

        // Get all objects from the collection
        const objects = await collection.find().toArray();

        // Send the objects back to the client
        res.send(objects);
    });

    app.get('/objects/:id', async (req, res) => {
        // Create a collection object
        const collection = database.collection('objects');

        // Get the object with the specified ID
        const object = await collection.findOne({ _id: new mongodb.ObjectId(req.params.id) });

        // Send the object back to the client
        res.send(object);
    });

    app.get('/objectsbybucketid/:bucketId', async (req, res) => {
        // Create a collection object
        const collection = database.collection('objects');
console.log(req)
        // Get the object with the specified ID
        const object = await collection.findOne({ bucketId: req.params.bucketId });
        console.log(object)

        // Send the object back to the client
        res.send(object);
    });

    app.put('/objects/:id', async (req, res) => {
        // Create a collection object
        const collection = database.collection('objects');

        // Update the object with the specified ID
        const obj = req.body;

        await collection.updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: obj }, {upsert: true});

        // Send the object back to the client
        res.send(obj);
    });

    app.delete('/objects/:id', async (req, res) => {
        // Create a collection object
        const collection = database.collection('objects');

        // Delete the object with the specified ID
        await collection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

        // Send a success message back to the client
        res.send('Object deleted successfully');
    });

    app.get('/buckets', async (req, res) => {
        // Create a collection object
        const collection = database.collection('buckets');

        // Get all buckets from the database
        const buckets = await collection.find().toArray();

        // Send the buckets back to the client
        res.send(buckets);
    });

    // Start the server
    app.listen(3000, function() {
        console.log('Server listening on port 3000');
    });
});