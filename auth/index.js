(function() {
    'use strict';

    var express = require('express'),
        passport = require('passport'),
        User = require('../models/user').user,
        app = module.exports = express();

    app.post('/register', function (req, res) {
        //Disable Caching for registering
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");

        User.register(new User({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            role: 'user'
        }), req.body.password, function (err, user) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                return res
            }
            passport.authenticate('local')(req, res, function (err) {
                if(err) {
                    res.statusCode = 404;
                    res.json({
                        "error": err
                    });
                } else {
                    res.statusCode = 200;
                    res.json({
                        "status": "register success"
                    });
                }
            });
        });
    });

    app.post('/login', function (req, res, next) {
        //Disable caching for login
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");

        console.log('User LogIn: ' + req.body.username + ' - ' + req.body.password);
        passport.authenticate('local', function (err, user, info) {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function (err) {
                if(err) {
                    return res.status(500).json({
                        err: 'LogInError'
                    });
                }
                res.statusCode = 200;
                res.json({
                    status: 'LogIn success',
                    user: user
                });
            });
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        //Disable caching for logout
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");

        req.logout();
        res.status(200).json({
            status: 'Logout success'
        });
    });

    app.get('/userstatus', function (req, res) {
        //Disable caching for user-status
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");

        if(!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });
})();
