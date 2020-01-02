var User = require('../models/user');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

db = {
    userLogin: function (req, then, error) { //Check if email Exits
        User.findOne({
            userEmailAddress: req.body.inputEmail.trim()
        }).exec().then(doc => {
            bcrypt.compare(req.body.inputPassword, doc.userPassword, (err, result) => {
                if (err) {
                    error(err);
                } else if (result) {
                    then(doc);
                } else {
                    then(false)
                }
            });
        }).catch(err => {
            error(err);
        });
    },
    checkEmailExists: function (emailId, then, error) {
        User.findOne({ //Check if user exists
            userEmailAddress: emailId,
        }).exec().then(doc => {
            then(doc)
        }).catch(err => {
            error(err);
        });
    },
    userSignUp: function (req, then, error) { //Sign Up , Create user object and store in database
        bcrypt.hash(req.body.inputPassword, saltRounds, (err, hash) => {
            if (err) {
                error(err);
            } else {
                const user = new User({
                    userId: mongoose.Types.ObjectId(),
                    userFirstName: req.body.inputFirstName.trim(),
                    userLastName: req.body.inputLastName.trim(),
                    userPassword: hash,
                    userEmailAddress: req.body.inputEmail.trim()
                });
                user.save().then(function () {
                    then(user);
                }).catch(err => {
                    error(err);
                });
            }
        });

    }
};
module.exports = db;
