var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');

router.get('/contact', indexController.getContactUs);

router.get('/about', indexController.getAboutUs);

router.get('/', indexController.getHomePage);

module.exports = router;
