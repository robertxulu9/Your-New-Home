const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');

const app = express();

// Connect to MySQL
connectDB();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static('public'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save images to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API Route for Text Submission
app.post('/api/text', async (req, res) => {
  try {
      const { text } = req.body;

      if (!text) {
          return res.status(400).json({ message: 'Text input is required' });
      }

      // Insert the text into the database
      await sequelize.query(
          'INSERT INTO texts (content) VALUES (?)',
          {
              replacements: [text]
          }
      );

      res.status(200).json({ message: 'Text submitted successfully!' });
  } catch (error) {
      console.error('Error submitting text:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Handle form submission and image uploads
app.post('/api/properties', upload.array('images', 10), async (req, res) => {
  try {
    const {
      location,
      city,
      compound,
      street,
      addressDetails,
      floors,
      bedrooms,
      bathrooms,
      lotArea,
      garage,
      yearBuilt,
      price
    } = req.body;

    // Save images file paths in an array
    const imagePaths = req.files.map(file => file.path);

    // Insert the listing data into the database
    const [result] = await sequelize.query(
      `INSERT INTO listings (location, city, compound, street, address_details, floors, bedrooms, bathrooms, lot_area, garage, year_built, price, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          location,
          city,
          compound,
          street,
          addressDetails,
          floors,
          bedrooms,
          bathrooms,
          lotArea,
          garage,
          yearBuilt,
          price,
          JSON.stringify(imagePaths)
        ]
      }
    );

    res.send('Listing submitted successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Sync models with the database
(async () => {
  try {
    await sequelize.sync(); // Synchronize the models with the database
    console.log('Models synchronized with MySQL database');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
