(function () {
    'use strict';
    var jwt = require('jsonwebtoken'),
        mongoose = require('mongoose'),
        config = require('../config'),
        User = require('../models/user').user,
        compose = require('composable-middleware');
    
    function authenticateToken() {
        return compose()
            .use(function (req, res, next) {
                var token = req.body.token || req.query.token || req.headers['x-access-token'];
                if(token) {
                    jwt.verify(token, config.tokensecret, function (err, decoded) {
                        if(err) {
                            return res.status(401).json({success: false, status: 'token could not be authenticated', error: err});
                        } else {
                            req.decoded = decoded;
                            next();
                        }
                    });
                } else {
                    return res.status(403).send({
                        success: false,
                        status: 'no token, no authorization'
                    });
                }
            });
    }
    
    function hasRole(requiredRole) {
        if(!requiredRole) throw new Error('No required Role, needs to be set.');
        return compose()
            .use(authenticateToken())
            .use(function (req, res, next) {
                if(config.userRoles.indexOf(req.decoded.role) >= config.userRoles.indexOf(requiredRole)) {
                    next();
                } else {
                    res.status(403).send({
                        success: false,
                        message: 'not authorized'
                    });
                }
            });
    }

    function signToken(id, username, role) {
        return jwt.sign({_id:id, username:username, role:role}, config.tokensecret, {
            expiresIn: 24*60*60
        });
    }

    module.exports.authenticateToken = authenticateToken;
    module.exports.hasRole = hasRole;
    module.exports.signToken = signToken;
})();