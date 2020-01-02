var mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    userSavedConnections: [{
        connectionId: {type: String, require: true},
        status: {type: String, require: true}
    }]
});
module.exports = mongoose.model('User_Profile', userProfileSchema);

// var userProfile = function (userId, userSavedConnections) {
//     var userProfileModel = {
//         userId: userId,
//         userSavedConnections: userSavedConnections
//     };
//     return userProfileModel;
// };
// module.exports.userProfile = userProfile;
