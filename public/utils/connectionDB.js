var Connection = require('../models/connection');
const shortid = require('shortid');
var moment = require('moment');

db = {
    getAllConnections: function (req, then) {
        Connection.find().exec().then(docs => {
            then(docs);
        }).catch(err => {
            console.log("Error in getting all documents " + err);
        });
    },

    getConnection: function (id, then, error) {
        Connection.findOne({connectionId: id}).exec().then(doc => {
            then(doc);
        }).catch(err => {
            error(err);
            console.log("Error in getting all documents " + err);
        });
    },

    deleteConnection: function (connectionId, userId, then, error) {
        Connection.remove({connectionId: connectionId, connectionCreatedBy: userId}).exec().then(doc => {
            then(doc);
        }).catch(err => {
            error(err);
        });
    },
    addConnection: function (req, then, err) {
        var connection = new Connection({
            connectionId: shortid.generate(),
            connectionCreatedBy: req.session.loggedInUser.userId,
            connectionHost: req.session.loggedInUser.userFirstName + " " + req.session.loggedInUser.userLastName,
            connectionName: req.body.eventNameInput,
            connectionTopic: req.body.options,
            connectionDetails: req.body.eventDetailsInput,
            connectionDate: moment(req.body.eventDateInput).format("dddd D, MMMM, YYYY"),
            connectionTime: moment(req.body.eventDateInput).format("hh:mm a"),
            connectionTimeEnd: moment(req.body.eventDateInput).add(req.body.eventDurationInput, 'h').format("hh:mm a"),
            connectionImage: req.body.options.toLowerCase() == "music" ? "musicEvent1.jpg" : "foodDrinkEvent3.jpg",
            connectionLocation: req.body.eventLocationInput
        });
        connection.save().then(result => {
            then(result);
        }).catch(err => {
            err(err);
        });
    }
};
module.exports = db;
