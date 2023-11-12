const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

// Handling form submission
app.post('/submit_form', (req, res) => {
  const { name, email, phonenumber, subject } = req.body;
  // Processing the form data as needed
  console.log('Form data:', { name, email, phonenumber, subject });
  // Responding to the client
  res.send('Form submitted successfully!');
});

// Serving an HTML file for the root path
app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

