const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = (firstName, lastName, username, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const query = 'INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, username, email, hashedPassword], callback);
};

// Find a user by username
exports.findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
};