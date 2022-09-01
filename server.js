const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const db = require('./db/db');

// defines the port
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to display static page in the defined directory
app.use(express.static('public'));

// middleware for parsing urlencoded and JSON data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => {
    // console.log(`Server available at localhost${PORT}`);
    console.log(`Launch Note Taker App: http://localhost:${PORT} 🚀`)
  });
