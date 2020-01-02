var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var mongoose = require('mongoose');
app.use(helmet());
mongoose.connect('mongodb://localhost/nextEvent', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'superSecretKey',
    resave: false,
    saveUninitialized: true,
}));

const indexRoutes = require('./routes/index');
const connectionRoutes = require('./routes/connection');
const userRoutes = require('./routes/user');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));

app.use('/connections', connectionRoutes);
app.use('/user', userRoutes);
app.use('/', indexRoutes);

app.use(function (req, res) {
    res.render('404', {user: req.session.loggedInUser});
});

module.exports = app;
