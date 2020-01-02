var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');
//Routes are defining what HTTP methods are being handled at different URLs

router.get('/savedConnections', userController.getSavedConnections);

router.post('/deleteClicked/:id', userController.deleteSavedConnection);

router.get('/login', userController.getUserLogin);

router.post('/login', userController.validateLogin, userController.userLogin);

router.get('/signup', userController.getUserSignUp);

router.post('/signup', userController.validateSignUp, userController.userSignUp);

router.get('/logout', userController.userLogout);

module.exports = router;
