(function() {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        auth = require('../../../auth/auth'),
        crud = require('./crud');

    /**
     * Post statistics
     * @return {JSON} returns only a status code (200, 500, 404, ...)
     */
    app.post('/api/v1/stats/', function(req, res, next){
        crud.create({
            device: req.body.device,
            created_at: Date.now()
        }, function(err, data){
            if(err) {
                res.send(500).json({
                    err: 'unexpected server error'
                });
            } else {
                if(!data) {
                    res.send(400).json({
                        err: 'not created'
                    });
                } else {
                    res.send(201).send();
                }
            }
        });
    });

})();
