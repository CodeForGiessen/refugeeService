(function() {
    'use strict';
    var http = require('http'),
        express = require('express'),
        passport = require('passport'),
        mongoose = require('mongoose'),
        LocalStrategy = require('passport-local').Strategy,
        morgan = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        api = require('./api'),
        auth = require('./auth'),
        home = require('./home');

    var app = exports.app = express();

    var hostname = '0.0.0.0';
    var port = 8080;

    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    //app.use(cookieParser);
    app.use(require('express-session')({
        secret: 'sosecretsuchencryptionmuchwow',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('port', process.env.PORT || port);

    app.use(api);
    app.use(auth);
    app.use(home);

    //passport config
    var User = require('./models/user').user;
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //mongoose
    var database = 'localhost:27017/refugees';
    mongoose.connect(database);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to database');
    });
    mongoose.connection.on('error', function (err) {
        console.log(err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });

    http.createServer(app).listen(port, hostname, function() {
        console.log('Server started and listening at http://' + hostname + ':' + port + '/');
    });
})();
