var mongoose = require('mongoose');
var helperData = require('../models/helperData');
db = {
    getData: function (then) {
        helperData.findOne().then(docs => {
            then(docs);
        })
    },
    websiteHeaderTitle: "NextEvent",
    welcomeTitle: "Welcome to NextEvent",
    welcomeSubTitle: "What are we?",
    welcomeDescription: "NextEvent is a international platform for experiences that allows each person to create, share, discover and attend activities that drive their passions and boost their lives. From music festivals, marathons, meetings, community rallies, and fundraisers, to gaming competitions. Our venture is to carry the world together through experiences.",
    contactUsTitle: "Contact Support",
    contactUsSubtitle: "NextEvent Support",
    contactUsDescriptionTitle1: "Where are my saved events?",
    contactUsDescription1: "Go to /savedConnections or Click on SignUp/Login",
    contactUsDescriptionTitle2: "How to find an event listing and event details?",
    contactUsDescription2: "Go to /connections or Click on Connections in the Navbar, For details click on the event you like.",
    contactUsDescriptionTitle3: "Still need help?",
    contactUsDescription3: "We're working on our customer support portal soon",
    aboutUsTitle: "About NextEvent",
    aboutUsSubtitle: "We're here to shake a leg with you!",
    aboutUsDescription: "NextEvent is bringing people together through the power of live experiences - and NextEvent Customer Experience Team is the team that thrives to make it happen."
};
module.exports = db;
