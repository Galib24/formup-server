require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z8yqdyj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbConnect = async () => {
    try {
        client.connect();
        console.log("Database Connected Successfully✅");

    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect()


const userInfoCollection = client.db('formDb').collection('userInfo')
const userReviewCollection = client.db('formDb').collection('review')

app.post('/userInfo', async (req, res) => {
    const newItem = req.body;
    console.log(newItem);
    const result = await userInfoCollection.insertOne(newItem);
    res.send(result);

})

app.get('/userInfo', async (req, res) => {
    const result = await userInfoCollection.find().toArray();
    res.send(result);
})


app.post('/review', async (req, res) => {
    const newItem = req.body;
    console.log(newItem);
    const result = await userReviewCollection.insertOne(newItem);
    res.send(result);

})

// test purpose
app.get('/', (req, res) => {
    res.send('it is running form')
})

app.listen(port, () => {
    console.log(`form is running on port ${port}`);
})
