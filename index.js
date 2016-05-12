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
        home = require('./home'),
        config = require('./config');

    var app = exports.app = express();

    var hostname = config.hostname;
    var port = config.port;

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    app.set('port', port);
    app.set('tokensecret', config.tokensecret);

    //CORS for express
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(api);
    app.use(auth);
    app.use(home);

    //passport config
    var User = require('./models/user').user;
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if(err) return done(err);
            if(!user) {
                return done(null, false, {message: 'No user with this username.'});
            }
            if(!user.authenticate(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }));

    //mongoose
    var database = config.database;
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
