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
    app.get('/api/v1/users/all', auth.hasRole('admin'), function (req, res, next) {
        crud.read({}, function (err, users) {
            if(err) {
                res.status(500).send({
                    'error': 'Internal Server Error'
                });
            } else {
                if (!users) {
                    res.status(404).json({
                        'message': 'No users found'
                    });
                } else {
                    res.status(200);
                    res.json({
                        'users': users
                    });
                }
            }
        });
    });

    /**
     * Get one User by ID
     * Requires Role Admin
     */
    app.get('/api/v1/users/id/:id', auth.hasRole('admin'), function (req, res, next) {
        crud.readOne({
            _id:req.params.id
        }, function (err, user) {
            if(err) {
                res.status(500).send({
                    'error': 'Internal Server Error'
                });
            } else {
                if (!user) {
                    res.status(404).json({
                        'message': 'No users found'
                    });
                } else {
                    res.status(200).json({
                        'user': user
                    });
                }
            }
        });
    });

    /**
     * Get the currently logged in User,
     * @returns users profile
     */
    app.get('/api/v1/users/me', auth.authenticateToken(), function (req, res, next) {
        crud.readOne({
            _id : req.decoded._id
        }, function (err, user) {
            if(err) {
                res.status(501).send({
                    'error': err
                });
            } else {
                if (!user) {
                    res.status(404).json({
                        'message': 'No users found'
                    });
                } else {
                    res.status(200).json({
                        'user': user.profile
                    });
                }
            }
        });
    });

    /**
     * Does User have specified Role?
     */
    app.get('/api/v1/users/role', auth.authenticateToken(), function (req, res, next) {
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

    /**
     * Update Role of User, role specified as query-string
     * Requires Role admin
     *
     */
    app.post('/api/v1/users/id/:id', auth.hasRole('admin'), function (req, res, next) {
        var role = req.query.role;
        var id = req.params.id;
        crud.update({'_id':id}, {role:role}, function (err, user) {
           if(err){
               res.status(500).send({
                   err: 'Unexpected error occurred'
               });
           } else if(!user) {
               res.status(404).send({
                   message: 'user not found'
               });
           } else {
               res.status(200).send({
                   user: user
               });
           }
        });
    });
})();
