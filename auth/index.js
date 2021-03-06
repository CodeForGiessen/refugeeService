(function() {
    'use strict';

    var express = require('express'),
        passport = require('passport'),
        auth = require('./auth'),
        User = require('../models/user').user,
        app = module.exports = express();

    app.post('/register', function (req, res) {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            password: req.body.password,
            role: 'newbie'
        });
        newUser.save(function (err, user) {
            if(err){
                res.status(500).send({
                    err: 'internal error occurred'
                });
            } else {
                var token = auth.signToken(user._id, user.username, user.role);
                res.status(200).json({
                    success: true,
                    status: 'register success',
                    token: token
                });
            }
        });

    });

    app.post('/login', function (req, res, next) {
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

            var token = auth.signToken(user._id, user.username, user.role);
            res.status(200).json({
                success: true,
                status: 'Login success',
                user: user.profile,
                token: token
            });
        })(req, res, next);
    });

    /**
     * Logout currently does nothing major, it could be client-side only for now.
     * Later the server could store each token that has been given out for extra security,
     * those tokens should then be removed once the users logs out.
     */
    app.get('/logout', function (req, res) {
        //Disable caching for logout
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");
        res.status(200).json({
            status: 'Logout success'
        });
    });

    app.get('/userstatus',auth.authenticateToken(), function (req, res) {
        //Disable caching for users-status
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", "0");
        if(req.decoded){
            res.status(200).json({
                success: true,
                status: true,
                token:req.body.token
            });
        }
    });
})();
