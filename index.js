// index.js
const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Connect to MySQL
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Sync models with MySQL
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized with MySQL database');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
