const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8000;
require('dotenv').config();

// variables
let db,
  dbConnectionString = process.env.DB_STRING,
  dbName = 'sample_mflix', collection;

// connect to MongoDB
MongoClient.connect(dbConnectionString)
  .then(client => {
    console.log('Connected to database');
    db = client.db(dbName);
    collection = db.collection('movies');
  });

// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// route
app.get('/', async (req, res) => {
  try {
    response.render('index.ejs');
  } catch (err) {
    response.status(500).send({ message: error.message });
  }
});

// create port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});