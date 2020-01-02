var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    userFirstName: {type: String, require: true},
    userLastName: {type: String, require: true},
    userPassword: {type: String, require: true},
    userEmailAddress: {type: String, require: true}
});
module.exports = mongoose.model('User', userSchema);

// var user = function (userId, userFirstName, userLastName, userPassword, userEmailAddress, userSavedConnection) {
//     var userModel = {
//         userId: userId,
//         userFirstName: userFirstName,
//         userLastName: userLastName,
//         userPassword: userPassword,
//         userEmailAddress: userEmailAddress,
//         userSavedConnection: userSavedConnection
//     };
//     return userModel;
// };
// module.exports.user = user;
