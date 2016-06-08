(function() {
    'use strict';
    var http = require('http'),
        fs = require('fs'),
        path = require('path'),
        FileStreamRotator = require('file-stream-rotator'),
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

    // setup the logger
    console.log(config.environment);
    switch (config.environment) {
        case 'dev':
            {
                app.use(morgan('dev'));
                break;
            }
        case 'prod':
            {
                var logDirectory = path.join(__dirname, 'logs');

                // ensure log directory exists
                if(!fs.existsSync(logDirectory)){ fs.mkdirSync(logDirectory); }

                // create a rotating write stream
                var accessLogStream = FileStreamRotator.getStream({
                    date_format: 'YYYYMMDD',
                    filename: path.join(logDirectory, 'refugees-%DATE%.log'),
                    frequency: 'daily',
                    verbose: false
                });
                console.log('Logging in', logDirectory);
                app.use(morgan('combined', {
                    stream: accessLogStream
                }));
                break;
            }
        default: {
            console.log('no logger...');
            break;
        }
    }
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    app.set('port', port);
    app.set('tokensecret', config.tokensecret);

    //CORS for express
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since");
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
    }, function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {
                    message: 'No user with this username.'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }));

    //mongoose
    var database = config.database;
    mongoose.connect(database);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose connected to database');
    });
    mongoose.connection.on('error', function(err) {
        console.log(err);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose disconnected');
    });

    // https via letsencrypt
    /*    var LEX = require('letsencrypt-express');
        var lex = LEX.create({
            configDir: config.letsencryptPath,
            onRequest: app,
            approveRegistration: function(hostname, cb) {

                cb(null, {
                    domains: [hostname],
                    email: '',
                    agreeTos: true
                });

            }
        });

        lex.listen(
            [port],
            [443, 5001],
            function onListening() {
                var server = this;
                var protocol = ('requestCert' in server) ? 'https' : 'http';
                console.log("Listening at " + protocol + '://localhost:' + this.address().port);
            }
        );
    */

    http.createServer(app).listen(port, hostname, function() {
        console.log('Server started and listening at http://' + hostname + ':' + port + '/');
    });

})();
