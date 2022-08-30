const express = require('express');
const path = require('path');

// defines the port
const PORT = process.env.PORT || 3001;

const app = express();

// connects to public directory
app.use(express.static('public'));

// middleware for parsing urlencoded and JSON data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// defining the path folder location
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// connect routes to the server
// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    // console.log(`Server available at localhost${PORT}`);
    console.log(`Launch Note Taker App: http://localhost:${PORT} 🚀`)
  });
