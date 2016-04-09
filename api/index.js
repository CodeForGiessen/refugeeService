(function() {
    'use strict';
    
    var express = require('express'),
        app = module.exports = express(),
        v1 = require('./v1');

    app.get('/api/', function (req, res) {
        res.status = 200;
        res.send({
            '_links': {
                'self': {
                    'href': '/api/'
                },
                'v1': {
                    'href': '/api/v1'
                }
            }
        });
    });
    app.use(v1);
})();