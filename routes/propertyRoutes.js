// routes/propertyRoutes.js
const express = require('express');
const { getProperties, createProperty } = require('../controllers/propertyController');

const router = express.Router();

router.route('/').get(getProperties).post(createProperty);

module.exports = router;
