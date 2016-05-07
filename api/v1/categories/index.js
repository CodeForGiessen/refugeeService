(function () {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        auth = require('../../../auth/auth'),
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
                res.json({
                    "category": category
                });
            }
        });
    });

    /*
     post and delete requests only with authentication!
     */

    /**
     * Create a new category
     */
    app.post('/api/v1/categories/', auth.authenticateToken(), function (req, res, next) {
        crud.create(req.body.category, function (err, category) {
            if(err) {
                res.status(500).json({
                    'error':err
                });
            } else {
                res.status(200).json({
                    'category':category
                });
            }
        });
    });

    /**
     * Update a category with :id
     */
    app.post('/api/v1/categories/:id', auth.authenticateToken(), function (req, res, next) {
        crud.update({
            '_id':req.params.id
        }, req.body.category, function (err, category) {
            if(err) {
                res.status(500).json({
                    'error':err
                });
            } else {
                res.status(200).json({
                    'category':category
                });
            }
        });
    });
    
    app.delete('/api/v1/categories/:id', auth.authenticateToken(), function (req, res, next) {
        crud.del({
            '_id':req.params.id
        }, function (err, category) {
            if(err) {
                res.status(500).json({
                    'error':err
                });
            } else {
                res.status(200).json({
                    'category':category
                });
            }
        });
    });

})();