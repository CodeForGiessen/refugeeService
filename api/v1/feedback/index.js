(function() {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        crud = require('./crud');

    /**
     * Post feedback
     * @return {json} returns a status code (200, 400, 404, 500, ...)
     */
    app.post('/api/v1/feedback/', function(req, res, next){
        var feedback = req.body.feedback;
        feedback.created_at = Date.now();
        crud.create({
            feedback: feedback
        }, function(err, data){
            if(err) {
                res.status(500).send({
                    err: 'unexpected error occurred'
                });
            } else {
                if(!data) {
                    res.status(400).send({
                        err: 'not created'
                    });
                } else {
                    res.status(201).send();
                }
            }
        });
    });
    /**
     * get all feedback entries
     * @return {json} returns all feedback entries
     */
    app.get('/api/v1/feedback', function(req, res, next){
        crud.read({}, function(err, data){
            if(err) {
                res.status(500).send({
                    'err': 'internal server error'
                });
            } else {
                if(!data) {
                    res.status(404).send({
                        err: 'no feedback found'
                    });
                } else {
                    res.status(200).send({
                        feedback: data
                    });
                }
            }
        });
    });
})();
