var connectionDB = require('../utils/connectionDB');
var userConnectionDB = require('../utils/userConnectionDB');
const {check, validationResult} = require('express-validator');


exports.validateAddNewEvent = [ //Validating input value
    check('eventNameInput').isLength({min: 3, max: 50}),
    check('eventDetailsInput').isLength({min: 3, max: 200}),
    check('eventLocationInput').isLength({min: 3, max: 100})
];
exports.addNewEvent = function (req, res, next) {
    if (req.session.loggedInUser == null) {
        res.redirect('/');
    } else if (req.body.options != "music" && req.body.options != "food-drinks") { //Redirect if input not from our view and user not logged in to create an event
        res.redirect('/');
    } else {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            connectionDB.addConnection(req, function (result) {
                res.redirect('../connections');
            }, function (err) {
                res.redirect('../connections');
            });
        } else {
            console.log(errors);
            res.redirect('../connections');
        }
    }
};

exports.goToAddNewEvent = function (req, res) { //Display Create Event page
    if (req.session.loggedInUser == null) {
        res.redirect('/user/login');
    } else {
        res.render('newConnection', {user: req.session.loggedInUser});
    }
};

exports.getEventWithId = function (req, res) { //Display particular connection
    if (!req.session.allConnections) res.redirect('../connections');
    //Checking if the connection exists in the database
    connectionDB.getConnection(req.params.eventId, function (doc) {
        if (doc) {
            res.render('connection', {
                connectionInfo: doc,
                user: req.session.loggedInUser,
                allConnections: req.session.allConnections
            });
        } else {
            console.log("Document not found!");
            res.redirect('../connections');
        }
    }, function (err) {
        console.log("Error in getting all documents " + err);
        res.redirect('../connections');
    });
};

exports.updateGoingYes = function (req, res) { //Update user RSVP to a particular event
    if (req.session.loggedInUser == null || req.body.connectionId != req.params.id || !req.body.allConnections.includes(req.params.id)) { //Checking if the request came from View and a logged in User (Refer Client.js)
        res.redirect('/user/login');
    } else {
        let user = req.session.loggedInUser;
        //Updating the database and session value
        var status = "Yes";
        userConnectionDB.addUpdateUserSavedConnection(user, req, status, function (connectionObj) {
            req.session.savedConnections.push(connectionObj);
            res.redirect('/user/savedConnections');
        }, function (err) {
            console.log("Error updateGoingYes " + err);
        });
    }
};

exports.updateGoingNo = function (req, res) { //Update user RSVP to a particular event
    if (req.session.loggedInUser == null || req.body.connectionId != req.params.id || !req.body.allConnections.includes(req.params.id)) { //Checking if the request came from View and a logged in User (Refer Client.js)
        res.redirect('/user/login');
    } else {
        let user = req.session.loggedInUser;
        //Updating the database and session value
        var status = "No";
        userConnectionDB.addUpdateUserSavedConnection(user, req, status, function (connectionObj) {
            req.session.savedConnections.push(connectionObj);
            res.redirect('/user/savedConnections');
        }, function (err) {
            console.log("Error updateGoingNo " + err);
        });
    }
};

exports.updateGoingMaybe = function (req, res) { //Update user RSVP to a particular event
    if (req.session.loggedInUser == null || req.body.connectionId != req.params.id || !req.body.allConnections.includes(req.params.id)) { //Checking if the request came from View and a logged in User (Refer Client.js)
        res.redirect('/user/login');
    } else {
        let user = req.session.loggedInUser;
        //Updating the database and session value
        var status = "Maybe";
        userConnectionDB.addUpdateUserSavedConnection(user, req, status, function (connectionObj) {
            req.session.savedConnections.push(connectionObj);
            res.redirect('/user/savedConnections');
        }, function (err) {
            console.log("Error updateGoingMaybe " + err);
        });
    }
};

exports.deleteConnection = function (req, res) {
    if (req.session.loggedInUser == null || req.body.connectionId != req.params.id || !req.body.allConnections.includes(req.params.id)) { //Checking if the request came from View and a logged in User (Refer Client.js)
        res.redirect('/user/login');
    } else {
        connectionDB.deleteConnection(req.body.connectionId, req.session.loggedInUser.userId, function (doc) {
            res.redirect('../connections');
        }, function (err) {
            res.redirect('../connections');
        })
    }
};

exports.getAllConnections = function (req, res) { //Display All Connections
    connectionDB.getAllConnections(req, function (docs) {
        if (docs.length > 0) {
            req.session.allConnections = docs;
            res.render('connections', {
                connections: req.session.allConnections,
                user: req.session.loggedInUser
            });
        } else {
            console.log("No Connections Found");
        }
    });
};

exports.redirectToConnections = function (req, res) { //Redirect if navigating to unknown connection
    res.redirect('../connections');
};
