var mongoose = require('mongoose');

var connectionSchema = new mongoose.Schema({
    connectionId: {type: String, require: true},
    connectionCreatedBy: {type: String, require: true},
    connectionHost: {type: String, require: true},
    connectionName: {type: String, require: true},
    connectionTopic: {type: String, require: true},
    connectionDetails: {type: String, require: true},
    connectionDate: {type: String, require: true},
    connectionTime: {type: String, require: true},
    connectionTimeEnd: {type: String, require: true},
    connectionImage: {type: String, require: true},
    connectionLocation: {type: String, require: true}
});

module.exports = mongoose.model('Connection', connectionSchema);


// var connection = function (connectionId, connectionHost, connectionName, connectionTopic, connectionDetails, connectionDate, connectionTime,
//                            connectionTimeEnd, connectionImage, connectionLocation) {
//     var connectionModel = {
//         connectionId: connectionId,
//         connectionHost: connectionHost,
//         connectionName: connectionName,
//         connectionTopic: connectionTopic,
//         connectionDetails: connectionDetails,
//         connectionDate: connectionDate,
//         connectionTime: connectionTime,
//         connectionTimeEnd: connectionTimeEnd,
//         connectionImage: connectionImage,
//         connectionLocation: connectionLocation
//     };
//     return connectionModel;
// };
// module.exports.connection = connection;
