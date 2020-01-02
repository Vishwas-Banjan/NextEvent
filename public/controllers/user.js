const userDB = require('../utils/userDetailsDB');
const userConnectionsDB = require('../utils/userConnectionDB');
var connectionDB = require('../utils/connectionDB');
const {check, validationResult} = require('express-validator');

exports.getSavedConnections = function (req, res) {
    if (req.session.loggedInUser == null) {
        res.redirect('./login');
    } else {
        var savedConnectionDetails = [];
        if (req.session.savedConnections) { // Fetching savedConnections from session and displaying it
            req.session.savedConnections.forEach(element => {
                connectionDB.getConnection(element.connectionId, function (doc) {
                    if (doc) {
                        savedConnectionDetails.push({
                            connectionName: doc.connectionName,
                            connectionId: doc.connectionId,
                            connectionTopic: doc.connectionTopic,
                            connectionStatus: element.status
                        });
                        if (savedConnectionDetails.length == req.session.savedConnections.length) {
                            res.render('savedConnections', {
                                savedConnectionDetails: savedConnectionDetails,
                                user: req.session.loggedInUser
                            });
                        }
                    } else {
                        //If connection has been deleted, delete from user saved connections as well
                        userConnectionsDB.deleteUserSavedConnection(req.session.loggedInUser, element.connectionId, function () {
                            req.session.savedConnections = req.session.savedConnections.filter(connection => connection.connectionId !== req.params.id); // Removing from session variable
                            res.render('savedConnections', {
                                savedConnectionDetails: savedConnectionDetails,
                                user: req.session.loggedInUser
                            });
                        }, function (err) {
                            console.log(err);
                            res.redirect('../connections');
                        });
                    }
                }, function () {
                    console.log("Error: getSavedConnections " + err);
                });
            });
            if (req.session.savedConnections.length == 0) {
                res.render('savedConnections', {
                    savedConnectionDetails: savedConnectionDetails,
                    user: req.session.loggedInUser
                });
            }
        }
    }
};

exports.deleteSavedConnection = function (req, res) {
    if (req.session.loggedInUser == null || req.body.connectionId != req.params.id) { //Checking if the request came from View and a logged in User (Refer Client.js)
        res.redirect('./login');
    } else {
        let user = req.session.loggedInUser;
        userConnectionsDB.deleteUserSavedConnection(user, req.params.id, function () {
            req.session.savedConnections = req.session.savedConnections.filter(connection => connection.connectionId !== req.params.id); // Removing from session variable
            res.redirect('../savedConnections');
        }, function () {
            console.log("deleteSavedConnection" + err);
            res.redirect('../savedConnections');
        });
    }
};

exports.getUserLogin = function (req, res) { //Display LOGIN page
    if (req.session.loggedInUser) { //Redirect if User already logged in
        res.redirect('../connections');
    } else {
        res.render('login', {
            authFail: {is: false, message: ""}, user:
            req.session.loggedInUser
        });
    }
};

exports.getUserSignUp = function (req, res) { //Display SIGN UP page
    if (req.session.loggedInUser) { //Redirect if User already logged in
        res.redirect('../connections');
    } else {
        res.render('signup', {
            authFail: {is: false, message: ""},
            user: req.session.loggedInUser
        });
    }
};

exports.validateLogin = [
    check('inputEmail').isEmail(),
    check('inputPassword')
        .isLength({min: 6})
];

exports.userLogin = function (req, res) {
    if (req.session.loggedInUser) { //Redirect if User already logged in
        res.redirect('../connections');
    } else if (req.body.inputEmail.trim() != null && req.body.inputPassword.trim() != null) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            userDB.userLogin(req, function (doc) { //Check if User exists in DB
                if (doc) { //If exists
                    req.session.loggedInUser = doc; //Fetching user data from database and storing in session
                    userConnectionsDB.getUserSavedConnection(doc, function (doc) { //Get User saved connections
                        if (doc) {
                            req.session.savedConnections = doc.userSavedConnections; //Fetching userSavedConnection from DB and saving it to session.
                        } else {
                            req.session.savedConnections = []; //User has no saved connections yet
                        }
                        res.redirect('../connections');
                    }, function (err) {
                        console.log("Error: userLogin UserProfile " + err);
                        res.render('./login', {
                            authFail: {is: true, message: "Oops! Something's not right"},
                            user: req.session.loggedInUser
                        });
                    });
                } else { //User does not exists
                    res.render('./login', {
                        authFail: {is: true, message: "Authorization Failed!"},
                        user: req.session.loggedInUser
                    });
                }
            }, function (err) {
                console.log("Error : userLogin User");
                res.render('./login', {
                    authFail: {is: true, message: "Oops! Something's not right"},
                    user: req.session.loggedInUser
                });
            });
        } else {
            res.render('./login', {
                authFail: {is: true, message: "Invalid Input!"},
                user: req.session.loggedInUser
            });
        }
    } else {
        res.render('./login', {authFail: {is: true, message: "Invalid Input!"}, user: req.session.loggedInUser});
    }
};

exports.validateSignUp = [
    check('inputEmail').isEmail(),
    check('inputPassword')
        .isLength({min: 6}),
    check('inputFirstName').isAlpha(),
    check('inputLastName').isAlpha(),
];

exports.userSignUp = function (req, res) {
    if (req.session.loggedInUser) { //Redirect if User already logged in
        res.redirect('../connections');
    } else if (req.body.inputEmail.trim() != null && req.body.inputPassword.trim() != null
        && req.body.inputFirstName.trim() != null && req.body.inputLastName.trim() != null) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            userDB.checkEmailExists(req.body.inputEmail.trim(), function (doc) {
                if (doc) { //If email Id exists
                    res.render('./signup', {
                        authFail: {is: true, message: "Email already in use"},
                        user: req.session.loggedInUser
                    }); //User Email Exists
                } else { //Create User
                    userDB.userSignUp(req, function (user) {
                        req.session.loggedInUser = user; //Adding user to session
                        req.session.savedConnections = []; //User has no saved Connections
                        res.redirect('../connections');
                    }, function (err) {
                        console.log(err);
                        res.render('./signup', {
                            authFail: {is: true, message: "Oops! Something's not right"},
                            user: req.session.loggedInUser
                        }); //User Email Exists
                    });
                }
            }, function (err) {
                console.log("Error: Sign Up " + err);
                res.render('./signup', {
                    authFail: {is: true, message: "Oops! Something's not right"},
                    user: req.session.loggedInUser
                }); //User Email Exists
            });
        } else {
            res.render('./signup', {
                authFail: {is: true, message: "Invalid Input!"},
                user: req.session.loggedInUser
            }); //User Email Exists
        }
    } else {
        res.render('./signup', {authFail: {is: true, message: "Invalid Input!"}, user: req.session.loggedInUser}); //User Email Exists
    }
};

exports.userLogout = function (req, res) {
    req.session.destroy(); //User logs out, session is cleared
    res.redirect('/');
};
