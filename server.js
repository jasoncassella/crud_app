const express = require('express');
const app = express();
const cors = require('cors');
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
  })
  .catch(error => {
    console.error(error);
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
    res.render('index.ejs');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// create port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});