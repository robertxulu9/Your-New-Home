const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if the user already exists
    User.findUserByUsername(username, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).send('User already exists');
        }

        // Create new user if not already existing
        User.createUser(firstName, lastName, username, email, password, (err, result) => {
            if (err) throw err;
            res.send('User registered successfully!');
        });
    });
};

// Log in a user
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findUserByUsername(username, (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            // Compare passwords
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user; // Store user in session
                res.send('Login successful');
            } else {
                res.status(400).send('Incorrect password');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
};
