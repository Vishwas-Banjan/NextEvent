var mongoose = require('mongoose');

var userConnectionSchema = new mongoose.Schema({
    connectionId: {type: String, require: true},
    status: {type: String, require: true}
});
module.exports = mongoose.model('User_Connection', userConnectionSchema);

// var userConnection = function (connectionId, rsvpStatus) {
//     var userConnectionModel = {
//         connectionId: connectionId,
//         status: rsvpStatus
//     };
//     return userConnectionModel;
// };
// module.exports.userConnection = userConnection;
