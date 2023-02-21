const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const fs = require('fs');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());
// username: dbuser1
// password: aECXWtnABXzWCt3O
const uri = "mongodb+srv://dbuser1:aECXWtnABXzWCt3O@cluster0.jktjr9b.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)


async function run() {
    try {

        const foldersCollection = client.db('folders').collection('start');

        // Route handler function to get the list of folders and subfolders
        app.get('/allfolders', async function (req, res) {

            const query = {}
            const cursor = foldersCollection.find(query);
            const folders = await cursor.toArray();;
            res.send(folders);
        });


        app.put('/allfolders', async (req, res) => {
            const service = req.body;
            console.log(service);
            const result = await foldersCollection.insertMany(service);
            res.send(result);

        })

        app.delete('/allfolders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await foldersCollection.deleteOne(query);
            res.send(result);
        })

    } finally {
        // await client.close();
    }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Server is Running');
});

app.listen(port, () => {
    console.log(`Ostad server running on ${port}`);
})


