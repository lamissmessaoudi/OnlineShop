const express = require('express');
const path = require('path');
const adminData = require('./admin');

const rootDir = require('../util/path');

const router = express.Router();
const productController = require('../controllers/products');


router.get('/', productController.getProducts);

module.exports = router; 