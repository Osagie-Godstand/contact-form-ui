require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

const logError = (error) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${error.stack}\n`;

  console.error(logMessage);

  fs.appendFile('errors.log', logMessage, (err) => {
    if (err) {
      console.error('Error writing to the error log:', err);
    }
  });
};

// Handling form submission
app.post('/', (req, res) => {
  try {
    const { name, email, phonenumber, message } = req.body;
    // Processing the form data as needed
    console.log('Form data:', { name, email, phonenumber, message });
    // Responding to the client
    res.send('Form submitted successfully!');
  } catch (error) {
    logError(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (_req, res) => {
  try {
    res.sendFile(__dirname + '/src/index.html');
  } catch (error) {
    logError(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
