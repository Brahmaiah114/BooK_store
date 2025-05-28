const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static index.html from project root
app.use(express.static(path.join(__dirname)));

// API routes for books
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
