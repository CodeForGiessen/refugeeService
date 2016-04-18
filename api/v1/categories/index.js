(function () {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        crud = require('./crud');

    /**
     * Get all categories.
     */
    app.get('/api/v1/categories/', function (req, res, next) {
        crud.read({}, function (err, categories) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }
            if(categories === null) {
                res.statusCode = 404;
                res.json({
                    "error": "CategoryNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = {};
                out._links = {};
                out._links.self = {
                    'href' : '/api/v1/categories'
                };
                out.categories = categories;
                res.json(out);
            }
        });
    });

    /**
     * Get all category IDs
     */
    app.get('/api/v1/categories/ids', function (req, res, next) {
        crud.getAllIds(function (err, ids) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error" : err
                });
                next(err);
            }
            if(ids === null) {
                res.statusCode = 404;
                res.json({
                    "error" : "CategoryNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = {};
                out.self = {
                    'href': '/api/v1/categories/ids'
                };
                out._links = [];

                ids.forEach(function(elt){
                    var o = {};
                    o[elt] = {
                        'href' : '/api/v1/categories/'+elt
                    };
                    out._links.push(o);
                });

                res.json(out);
            }
        });
    });

    /**
     * Get categories by ID
     */
    app.get('/api/v1/categories/:id', function (req, res, next) {
        crud.readOne({
            '_id': req.params.id
        }, function (err, category) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if(category === null) {
                res.statusCode = 404;
                res.json({
                    "error": "CategoryNotFound"
                });
            } else {
                res.statusCode = 200;
                res.json(category);
            }
        });
    });

})();