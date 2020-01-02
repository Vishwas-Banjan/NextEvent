var UserConnection = require("../models/userConnection");
var UserProfile = require("../models/userProfile");

db = {
    getUserSavedConnection: function (doc, then, error) { //Get User's All saved Connections
        UserProfile.findOne({userId: doc.userId}).exec().then(doc => {
            then(doc);
        }).catch(err => {
            error(err);
        });
    },
    deleteUserSavedConnection: function (user, connectionId, then, error) { //Delete User Saved Connection in Database
        UserProfile.update({userId: user.userId}, {$pull: {userSavedConnections: {connectionId: connectionId}}}).then(function () {
            then();
        }).catch(err => {
            error(err);
        });
    },
    addUpdateUserSavedConnection: function (user, req, status, then, error) { //Add or Update User Saved Connections in Database
        UserProfile.update({userId: user.userId}, {$pull: {userSavedConnections: {connectionId: req.params.id}}}).then(function () {
            req.session.savedConnections = req.session.savedConnections.filter(connection => connection.connectionId !== req.params.id); // Removing from session variable
            var connectionObj = new UserConnection({
                connectionId: req.params.id,
                status: status
            });
            UserProfile.update({userId: user.userId}, {
                $push: {
                    userSavedConnections: connectionObj
                }
            }, {upsert: true}).then(function () {
                then(connectionObj);
            });
        }).catch(err => {
            error(err);
        });
    }
};
module.exports = db;
