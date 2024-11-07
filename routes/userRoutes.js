// /routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Check if user already exists
  const sqlCheck = 'SELECT * FROM users WHERE email = ?';
  db.query(sqlCheck, [email], (err, result) => {
    if (result.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      // Insert new user into the database
      const sqlInsert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sqlInsert, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User registered');
      });
    });
  });
});

module.exports = router;
