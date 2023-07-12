const express = require('express');
const app = express();
const path = require('path');

// Serve the static files in the 'public' directory
app.use(express.static('public'));

// Parse JSON and URL-encoded bodies from the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the template engine and view directory
app.set('view engine', 'ejs'); // Replace 'ejs' with the template engine you installed
app.set('views', path.join(__dirname, 'views')); // Replace 'views' with your directory name

// Function to generate the CV
function generateCV(name, age) {
  // Your logic to generate the CV based on the provided data
  // Example: Return a string with the CV information
  const cv = `
    <h2>Name: ${name}</h2>
    <h2>Age: ${age}</h2>
    <!-- Add more CV details and sections as needed -->
  `;
  return cv;
}

// Route to serve the 'new.html' file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/new.html');
});

// Route to display the CV
app.get('/cv', (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  const cv = generateCV(name, age);
  res.render('cv', { cvData: cv });
});

// Route to handle the form submission
app.post('/submit', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const cv = generateCV(name, age);
  res.send(cv);
});

// Start the server
app.listen(3074, () => {
  console.log('Server is running on http://localhost:3074');
});