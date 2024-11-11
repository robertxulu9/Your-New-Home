const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const session = require('express-session');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



// Use the session middleware
app.use(session({
    secret: 'your-secret-key',  // Replace with a real secret key
    resave: false,
    saveUninitialized: true
}));





// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


// Middleware for admin 
app.set('view engine', 'ejs');

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'realestate_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});



// Route to handle registration
app.post('/register', (req, res) => {

  const { firstName, lastName, username, email, password, confirmPassword } = req.body;

  // Password validation
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

// Insert user into the database with a default role (e.g., 'pending')
const sql = 'INSERT INTO users (firstName, lastName, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)';
const values = [firstName, lastName, username, email, hashedPassword, 'pending'];  // Default role is 'pending'

db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.redirect('/login.html');  // Redirect to login after registration
});
});


app.get('/admin', (req, res) => {
  // Fetch users from the database (optional, if you have user data)
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, users) => {
      if (err) throw err;

      // Render admin.ejs and pass in the user data
      res.render('admin', { users: users });
  });
});

//admin route
app.get('/admin', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.render('admin', { users: results });
  });
});


app.post('/admin/save-user', (req, res) => {
  const updatedUsers = [];

  // Loop through each user in the request body based on the dynamic names
  Object.keys(req.body).forEach((key) => {
    const match = key.match(/^(username|email|firstName|lastName|role)_(\d+)$/);
    if (match) {
      const field = match[1]; // e.g., username, email
      const userId = match[2]; // e.g., 1, 2 (the user ID)
      
      if (!updatedUsers[userId]) {
        updatedUsers[userId] = {};
      }
      updatedUsers[userId][field] = req.body[key];
    }
  });

  // Now update each user based on the parsed data
  updatedUsers.forEach((user, userId) => {
    const sql = 'UPDATE users SET username = ?, email = ?, firstName = ?, lastName = ?, role = ? WHERE id = ?';
    db.query(sql, [user.username, user.email, user.firstName, user.lastName, user.role, userId], (err, result) => {
      if (err) throw err;
    });
  });

  // Re-fetch the updated users and render the page with the updated data
  db.query('SELECT * FROM users', (err, users) => {
    if (err) throw err;
    res.render('admin', { users: users, message: 'Users updated successfully' });
  });
});


//Delete User
app.post('/admin/delete-user', (req, res) => {
  const { userId } = req.body;

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
      if (err) throw err;
      res.redirect('/admin');
  });
});


//Edit User Information
app.post('/admin/edit-user', (req, res) => {
  const { userId } = req.body;
  const { username, email, firstName, lastName } = req.body;

  const sql = 'UPDATE users SET username = ?, email = ?, firstName = ?, lastName = ? WHERE id = ?';
  db.query(sql, [username, email, firstName, lastName, userId], (err, result) => {
      if (err) throw err;
      res.redirect('/admin');
  });
});

//resteting password route
app.post('/admin/reset-password', (req, res) => {
  const { userId } = req.body;

  const defaultPassword = 'password123';
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  db.query(sql, [hashedPassword, userId], (err, result) => {
      if (err) throw err;
      res.redirect('/admin');
  });
});

//Create the Role Assignment Route
app.post('/assign-role', (req, res) => {
  const { username, role } = req.body;

  const sql = 'UPDATE users SET role = ? WHERE username = ?';
  db.query(sql, [role, username], (err, result) => {
      if (err) throw err;
      res.redirect('/admin');  // Redirect back to the admin page after role assignment
  });
});


// Assigning Roles route
app.post('/admin/assign-role', (req, res) => {
  const { userId, role } = req.body;

  const sql = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(sql, [role, userId], (err, result) => {
      if (err) throw err;
      res.redirect('/admin');
  });
});


// search route
// GET route for search page with empty properties list initially
app.get('/properties/search', (req, res) => {
  const { location, compound, priceLimit } = req.query;

  let query = `SELECT p.id, p.price, p.images, p.bedrooms, p.bathrooms, p.lot_area, 
               p.street, p.compound, p.city, p.location, p.agent_id, u.firstName AS agent_name, 
               u.profilePicture AS agent_image
               FROM properties p
               JOIN users u ON p.agent_id = u.id WHERE 1=1`;

  const queryParams = [];

  if (location) {
      query += ` AND city = ?`;
      queryParams.push(location);
  }
  if (compound) {
      query += ` AND compound = ?`;
      queryParams.push(compound);
  }
  if (priceLimit) {
      query += ` AND price <= ?`;
      queryParams.push(priceLimit);
  }

  db.query(query, queryParams, (err, properties) => {
      if (err) {
          req.session.message = "Error fetching properties.";
          return res.redirect('/properties/search');
      }

      const processedProperties = properties.map(property => {
          let imagesArray = [];
          
          // Process the images as before
          try {
              if (typeof property.images === 'string') {
                  imagesArray = property.images.split(',').map(img => img.trim());
              } else if (Array.isArray(property.images)) {
                  imagesArray = property.images;
              }
          } catch (error) {
              console.error('Error processing images:', error);
          }

          return {
              id: property.id,
              price: property.price,
              image: '/uploads/' + (imagesArray.length > 0 ? imagesArray[0] : 'default.jpg'),  // Correct image path
              address: `${property.street}, ${property.compound}, ${property.city}, ${property.location}`,
              bedrooms: property.bedrooms,
              bathrooms: property.bathrooms,
              lot_area: property.lot_area,
              agent: {
                  id: property.agent_id,
                  name: property.agent_name,
                  image: property.agent_image  // Correct agent image
              }
          };
      });

      // Render the results page with processed properties
      res.render('results', { properties: processedProperties, message: req.session.message });
  });
});



//about page
app.get('/about', (req, res) => {
  res.render('about'); // Assumes your file is named about.ejs in the views folder
});



//single propery page
app.get('/properties/:id', (req, res) => {
  const propertyId = req.params.id;

  const sql = `
    SELECT p.id, p.price, p.images, p.bedrooms, p.bathrooms, p.lot_area, 
           p.street, p.compound, p.city, p.location, p.agent_id,
           p.garage, p.year_built, p.floors,
           u.firstName AS agent_name, u.profilePicture AS agent_image,
           u.contactNumber AS agent_contact, u.email AS agent_email 
    FROM properties p
    JOIN users u ON p.agent_id = u.id
    WHERE p.id = ?`;

  db.query(sql, [propertyId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const property = results[0]; // Get the first property result

      // Process images
      let imagesArray = [];
      if (typeof property.images === 'string') {
        imagesArray = property.images.split(',').map(img => img.trim());
      } else if (Array.isArray(property.images)) {
        imagesArray = property.images;
      }

      // Prepare the data for rendering
      const processedProperty = {
        id: property.id,
        price: property.price,
        images: imagesArray.map(img => img), // Adjust path if necessary
        address: `${property.street}, ${property.compound}, ${property.city}, ${property.location}`,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        lot_area: property.lot_area,
        garage: property.garage,         // Add these values to processedProperty
        year_built: property.year_built,
        floors: property.floors,
        agent: {
          name: property.agent_name,
          image: property.agent_image,
          contact: property.agent_contact,
          email: property.agent_email
        }
      };

      console.log(processedProperty);  // Debug log
      res.render('property-details', { property: processedProperty });
    } else {
      res.status(404).send('Property not found');
    }
  });
});


















// app.get('/test', (req, res) => {
//   res.render('test');
// });





// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
          const user = result[0];

          // Check if the password matches
          if (bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;  // Store the userId in session
            req.session.user = user;
            
              // Check the user's role and redirect accordingly
              if (user.role === 'admin') {
                  res.redirect('/admin');
                  console.log('Session data:', req.session);  // Log session data to the console
              } else if (user.role === 'agent') {
                  res.redirect('/agent/profile');
                  console.log('Session data:', req.session);  // Log session data to the console
              } else {
                  res.send('Role not assigned yet. Please contact the admin.');
                  res.redirect('/login.html');
              }
          } else {
              res.send('Incorrect password!');
              res.redirect('/login.html');

          }
      } else {
          res.send('No user found!');
      }
  });
});






// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Display agent profile page
// Route to get agent profile
app.get('/agent/profile', (req, res) => {
  if (req.session.user && req.session.user.role === 'agent') {
      const agentId = req.session.userId; // Assuming the agent is logged in and userId is stored in session

      const sql = 'SELECT * FROM users WHERE id = ?';
      db.query(sql, [agentId], (err, result) => {
          if (err) throw err;
          res.render('agent-profile', { agent: result[0] });
      });
  } else {
      res.redirect('/login.html'); // Redirect if the user is not logged in or not an agent
  }
});

// Handle profile update
app.post('/agent/profile', upload.single('profilePicture'), (req, res) => {
  const { contactNumber, address } = req.body;
  const agentId = req.session.userId; // Assuming the agent is logged in

  let profilePicture = null;
  if (req.file) {
      profilePicture = '/uploads/' + req.file.filename;
  }

  // Update profile picture and contact details in the database
  const sql = 'UPDATE users SET contactNumber = ?, address = ?, profilePicture = ? WHERE id = ?';
  db.query(sql, [contactNumber, address, profilePicture, agentId], (err, result) => {
      if (err) throw err;
      res.redirect('/agent/profile');
  });
});


// adding listing
app.post('/agent/add-listing', upload.array('images',10), (req, res) => {
  const {
    location, city, compound, street, 'address-details': addressDetails, floors, bedrooms,
    bathrooms, 'lot-area': lotArea, garage, 'year-built': yearBuilt, price
  } = req.body;

  const agentId = req.session.userId;  // Ensure agent is logged in and their ID is stored in the session

  // Process file uploads (using multer)
  const images = req.files ? req.files.map(file => file.filename) : [];

  // Insert data into the database
  const sql = `INSERT INTO properties 
  (agent_id, location, city, compound, street, address_details, floors, bedrooms, bathrooms, lot_area, garage, year_built, images, price) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

db.query(sql, [agentId, location, city, compound, street, addressDetails, floors, bedrooms, bathrooms, lotArea, garage, yearBuilt, JSON.stringify(images), price], (err, result) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Error saving the listing');
  }
  res.redirect('/properties');
});

});

///sort listings 
app.get('/properties/sort', async (req, res) => {
  const { sort } = req.query;

  // Define sort criteria based on query parameter
  let sortCriteria = {};
  switch (sort) {
    case 'price_asc':
      sortCriteria.price = 1;
      break;
    case 'price_desc':
      sortCriteria.price = -1;
      break;
    case 'date_newest':
      sortCriteria.created_at = -1;
      break;
    case 'date_oldest':
      sortCriteria.created_at = 1;
      break;
    default:
      sortCriteria = {};
  }

  try {
    const properties = await Property.find().sort(sortCriteria).populate('agent');
    res.json({ properties }); // Send JSON response
  } catch (error) {
    console.error('Error sorting properties:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// agent listings
// Route to display properties on a webpage with agent info
app.get('/properties', (req, res) => {
  // Assuming the logged-in user's ID is stored in the session
  const userId = req.session.userId; // Get the logged-in user's ID

  // Update the SQL query to only select properties for the logged-in user
  const sql = `
    SELECT p.id, p.price, p.images, p.bedrooms, p.bathrooms, p.lot_area, 
           p.street, p.compound, p.city, p.location, p.agent_id, 
           u.firstName AS agent_name, u.profilePicture AS agent_image 
    FROM properties p
    JOIN users u ON p.agent_id = u.id
    WHERE p.agent_id = ?`; // Filter by the logged-in user's ID

  db.query(sql, [userId], (err, properties) => {
    if (err) throw err;

    // Process each property to match the template structure
    const processedProperties = properties.map(property => {
      let imagesArray = [];
    
      // Log the type of property.images to debug
      console.log('Type of property.images:', typeof property.images, property.images);
    
      try {
        // If images is a string, split it. If it's an array, use it directly.
        if (typeof property.images === 'string') {
          // It's a string, so split it into an array
          imagesArray = JSON.parse(property.images); // Use JSON.parse to convert the string to an array
        } else if (Array.isArray(property.images)) {
          // It's already an array, so use it directly
          imagesArray = property.images;
        } else {
          console.error('Unexpected type for images:', property.images);
        }
      } catch (error) {
        console.error('Error processing images:', error);
      }
      console.log('Agent Image:', property.agent_image);
    
      return {
        id: property.id,
        price: property.price,
        image: '/uploads/' + (imagesArray.length > 0 ? imagesArray[0] : 'default.jpg'),
        address: `${property.street}, ${property.compound}, ${property.city}, ${property.location}`,
        bedrooms: property.bedrooms,  
        bathrooms: property.bathrooms,
        lot_area: property.lot_area,  
        agent: {
          id: property.agent_id,
          name: property.agent_name,  
          image: property.agent_image
        }
      };
    });
  
   
    // Render the EJS template with processed properties
    res.render('agent-listings', { properties: processedProperties });
  });
});

//all properties
app.get('/listings', (req, res) => {
  const locationQuery = 'SELECT DISTINCT city FROM properties';
  const compoundQuery = 'SELECT DISTINCT compound FROM properties';

  db.query(locationQuery, (err, locations) => {
    if (err) throw err;

    db.query(compoundQuery, (err, compounds) => {
      if (err) throw err;

      const sql = `
        SELECT p.id, p.price, p.images, p.bedrooms, p.bathrooms, p.lot_area, 
               p.street, p.compound, p.city, p.location, p.agent_id, p.created_at,
               u.firstName AS agent_name, u.profilePicture AS agent_image 
        FROM properties p
        JOIN users u ON p.agent_id = u.id
        ORDER BY p.created_at DESC`; // Order by newest created_at

      db.query(sql, (err, properties) => {
        if (err) throw err;

        const processedProperties = properties.map(property => {
          let imagesArray = [];

          // Process the images as before
          try {
            if (typeof property.images === 'string') {
              imagesArray = property.images.split(',').map(img => img.trim());
            } else if (Array.isArray(property.images)) {
              imagesArray = property.images;
            }
          } catch (error) {
            console.error('Error processing images:', error);
          }

          return {
            id: property.id,
            price: property.price,
            image: '/uploads/' + (imagesArray.length > 0 ? imagesArray[0] : 'default.jpg'),
            address: `${property.street}, ${property.compound}, ${property.city}, ${property.location}`,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            lot_area: property.lot_area,
            agent: {
              id: property.agent_id,
              name: property.agent_name,
              image: property.agent_image
            }
          };
        });

        res.render('property-listings', { properties: processedProperties, locations, compounds });
      });
    });
  });
});

//deliting sold listing
app.post('/properties/sold/:id', (req, res) => {
  const propertyId = req.params.id;

  // First, retrieve the property to get the associated images
  const sqlSelect = 'SELECT images FROM properties WHERE id = ?';
  db.query(sqlSelect, [propertyId], (err, results) => {
      if (err) {
          console.error('Error fetching property:', err);
          return res.status(500).send('Error fetching property');
      }

      if (results.length === 0) {
          return res.status(404).send('Property not found');
      }

      let imagesArray = [];
      try {
          // Log the type of property.images to debug
          console.log('Raw images string:', results[0].images);
          console.log('Type of images:', typeof results[0].images);

          // Attempt to parse the images field
          if (typeof results[0].images === 'string') {
              // Use JSON.parse to convert the string to an array
              imagesArray = JSON.parse(results[0].images);
          } else if (Array.isArray(results[0].images)) {
              // It's already an array, so use it directly
              imagesArray = results[0].images;
          } else {
              console.error('Unexpected type for images:', results[0].images);
          }
      } catch (error) {
          console.error('Error processing images:', error);
          return res.status(500).send('Error processing images');
      }

      // Delete the property from the database
      const sqlDelete = 'DELETE FROM properties WHERE id = ?';
      db.query(sqlDelete, [propertyId], (err) => {
          if (err) {
              console.error('Error deleting property:', err);
              return res.status(500).send('Error deleting property');
          }

          // Delete associated images from the server
          imagesArray.forEach(image => {
              const imagePath = path.join(__dirname, 'public', 'uploads', image);
              fs.unlink(imagePath, (err) => {
                  if (err) {
                      console.error('Error deleting image:', err);
                  }
              });
          });

          res.redirect('/properties'); // Redirect back to the properties page
      });
  });
});


// Display agents page
// Route to get agents
app.get('/agents', (req, res) => {
  const sql = `
      SELECT u.id, u.username AS name, u.profilePicture, COUNT(p.id) AS propertyCount
      FROM users u
      LEFT JOIN properties p ON u.id = p.agent_id
      WHERE u.role = 'agent'
      GROUP BY u.id;
  `;

  db.query(sql, (err, agents) => {
      if (err) {
          console.error("SQL Error:", err);
          return res.status(500).send("Internal Server Error");
      }
      res.render('agents', { agents }); // Render the agents page with agent data
  });
});



// Route to get home page data
app.get('/home', (req, res) => {
  const locationQuery = 'SELECT DISTINCT city FROM properties';
  const compoundQuery = 'SELECT DISTINCT compound FROM properties';

  db.query(locationQuery, (err, locations) => {
    if (err) throw err;

    db.query(compoundQuery, (err, compounds) => {
      if (err) throw err;
  // Query for the latest 6 properties with agent information
  const latestPropertiesQuery = `
      SELECT p.*, u.id AS agent_id, u.username AS agent_name, u.profilePicture AS agent_image
      FROM properties p
      LEFT JOIN users u ON p.agent_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 6;
  `;

  // Query for the 4 agents
  const agentsQuery = `
      SELECT u.id, u.username, u.profilePicture, COUNT(p.id) AS propertyCount
      FROM users u
      LEFT JOIN properties p ON u.id = p.agent_id
      WHERE u.role = 'agent'
      GROUP BY u.id
      LIMIT 4;
  `;

  // Query for the total number of properties
  const totalPropertiesQuery = `
      SELECT COUNT(*) AS totalProperties FROM properties;
  `;

  // Execute the queries in parallel using Promise.all
  Promise.all([
      new Promise((resolve, reject) => {
          db.query(latestPropertiesQuery, (err, properties) => {
              if (err) reject(err);
              else {
                  // Format properties to include agent information in an object
                  const formattedProperties = properties.map(property => {
                      let imagesArray = [];
                      try {
                          if (typeof property.images === 'string') {
                              imagesArray = property.images.split(',').map(img => img.trim());
                          } else if (Array.isArray(property.images)) {
                              imagesArray = property.images;
                          }
                      } catch (error) {
                          console.error('Error processing images:', error);
                      }

                      return {
                          id: property.id,
                          price: property.price,
                          image: '/uploads/' + (imagesArray.length > 0 ? imagesArray[0] : 'default.jpg'),
                          address: `${property.street}, ${property.compound}, ${property.city}, ${property.location}`,
                          bedrooms: property.bedrooms,  
                          bathrooms: property.bathrooms,
                          lot_area: property.lot_area,  
                          agent: {
                              id: property.agent_id,
                              name: property.agent_name,  
                              image: property.agent_image // No prefix here
                          }
                      };
                  });
                  resolve(formattedProperties);
              }
          });
      }),
      new Promise((resolve, reject) => {
          db.query(agentsQuery, (err, agents) => {
              if (err) reject(err);
              else resolve(agents);
          });
      }),
      new Promise((resolve, reject) => {
          db.query(totalPropertiesQuery, (err, result) => {
              if (err) reject(err);
              else resolve(result[0].totalProperties);
          });
      }),
  ])
  .then(([properties, agents, totalProperties]) => {
      res.render('home', { properties, agents, totalProperties,locations, compounds}); // Render the home page with the data
  })
  .catch(err => {
      console.error("SQL Error:", err);
      res.status(500).send("Internal Server Error");
  });
});
});
});







app.listen(3000, () => {
  console.log('Server running on port 3000');
});