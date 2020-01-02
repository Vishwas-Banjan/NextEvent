var mongoose = require('mongoose');
var helperDataSchema = new mongoose.Schema({
    websiteHeaderTitle: String,
    welcomeTitle: String,
    welcomeSubTitle: String,
    welcomeDescription: String,
    contactUsTitle: String,
    contactUsSubtitle: String,
    contactUsDescriptionTitle1: String,
    contactUsDescription1: String,
    contactUsDescriptionTitle2: String,
    contactUsDescription2: String,
    contactUsDescriptionTitle3: String,
    contactUsDescription3: String,
    aboutUsTitle: String,
    aboutUsSubtitle: String,
    aboutUsDescription: String
});
module.exports = mongoose.model('helper_data', helperDataSchema, "helper_data");
