(function() {
    'use strict';

    var express = require('express'),
        app = module.exports = express();

    app.get('/api/v1/', function(req, res) {
        res.status = 200;
        res.send({
            '_links': {
                'self': {
                    'href': '/api/v1'
                }
            }
        });
    });
})();
