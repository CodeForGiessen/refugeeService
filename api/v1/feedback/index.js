(function() {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        auth = require('../../../auth/auth'),
        crud = require('./crud');

    /**
     * Post feedback
     * @return {json} returns a status code (200, 400, 404, 500, ...)
     */
    app.post('/api/v1/feedback/', function(req, res, next){
        crud.create(req.body.feedback, function(err, data){
            if(err) {
                res.status(500).send({
                    err: 'unexpected error occurred'
                });
            } else {
                if(!data) {
                    res.status(404);
                } else {
                    res.status(201);
                }
            }
        });
    });
})();
