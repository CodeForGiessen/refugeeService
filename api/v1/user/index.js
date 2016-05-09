(function () {
    'use strict';
    /**
     * API Endpoints to get and set Users. Authentication is required for all Endpoints.
     */
    var express = require('express'),
        app = module.exports = express(),
        auth = require('../../../auth/auth'),
        crud = require('./crud');
    /**
     * Get all Users
     * Requires Role Admin
     */
    app.get('/users/all', auth.hasRole('admin'), function (req, res, next) {
        crud.read({}, function (err, users) {
            if(err) res.status(500).json({
                'error': 'Internal Server Error'
            });
            if(users === null) {
                res.status(404).json({
                    'message': 'No users found'
                });
            } else {
                var resultUsers = [];
                res.status(200);
                users.forEach(function (user) {
                    resultUsers.push(user.profile);
                });
                res.json({
                    'users': resultUsers
                });
            }
        });
    });

    /**
     * Get one User
     * Requires Role Admin
     */
    app.get('/users/:id', auth.hasRole('admin'), function (req, res, next) {
        crud.readOne({
            _id:req.params.id
        }, function (err, user) {
            if(err) {
                res.status(500).json({
                    'error': 'Internal Server Error'
                });
            }
            if(user === null) {
                res.status(404).json({
                    'message': 'No user found'
                });
            } else {
                res.status(200).json({
                    'user': user.profile
                });
            }
        });
    });

    /**
     * Get the currently logged in User
     */
    app.get('/users/me', auth.authenticateToken(), function (req, res, next) {
        crud.readOne({
            _id : req.decoded._id
        }, function (err, user) {
            if(err) {
                res.status(500).json({
                    'error': 'Internal Server Error'
                });
            }
            if(user === null) {
                res.status(404).json({
                    'message': 'No user found'
                });
            } else {
                res.status(200).json({
                    'user': user.profile
                });
            }
        });
    });

    /**
     * Does User have specified Role?
     */
    app.get('/users/role', auth.authenticateToken(), function (req, res, next) {
        var reqRole = req.query.role;
        var hasRole = req.decoded.role;
        if(reqRole === hasRole) {
            res.status(200).json({
                'message': 'Role is ok'
            });
        } else {
            res.status(400).json({
                'message': 'Role not authorized'
            });
        }
    });
})();