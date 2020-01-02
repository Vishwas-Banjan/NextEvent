const db = require('../utils/nextEventDB');

exports.getContactUs = function (req, res) { //Navigate to Contact Us page
    db.getData(function (docs) {
        res.render('contact', {db: docs, user: req.session.loggedInUser});
    });
};

exports.getAboutUs = function (req, res) { //Navigate to About Us page
    db.getData(function (docs) {
        res.render('about', {db: docs, user: req.session.loggedInUser});
    });
};

exports.getHomePage = function (req, res) { //Navigate to Home Page
    db.getData(function (docs) {
        res.render('index', {db: docs, user: req.session.loggedInUser});
    });
};
