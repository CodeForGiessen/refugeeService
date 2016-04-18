(function () {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        crud = require('./crud');

    /**
     * Get all Guides.
     */
    app.get('/api/v1/guides', function(req, res, next) {
        crud.read({}, function(err, guides) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if(guides === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = { };
                out._links = {};
                out._links.self = {
                    'href' : '/api/v1/guides/'
                };
                out.guides = guides;
                res.json(out);
            }
        });
    });

    /**
     * Get all guide Ids
     */
    app.get('/api/v1/guides/ids', function (req, res, next) {
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
                    "error" : "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = {};
                out.self = {
                    'href': '/api/v1/guides/ids'
                };
                out._links = [];
                
                ids.forEach(function(elt){
                    var o = {};
                    o[elt] = {
                        'href' : '/api/v1/guides/'+elt
                    };
                    out._links.push(o);
                });
                
                res.json(out);
            }
        });
    });

    /**
     * Get all guides by categoryId
     */
    app.get('/api/v1/guides/categories/:cid', function (req, res, next) {
        crud.read({
            'category': req.params.cid
        }, function (err, guides) {
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if(guides === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = { };
                out._links = {};
                out._links.self = {
                    'href' : '/api/v1/guides/categories/'+req.params.cid
                };
                out.guides = guides;
                res.json(out);
            }
        });
    });

    /**
     * Get all guides by lang
     */
    app.get('/api/v1/guides/lang/:lang', function(req, res, next) {
        crud.read({
            'lang': req.params.lang
        }, function(err, guides){
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if(guides === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = { };
                out._links = {};
                out._links.self = {
                    'href' : '/api/v1/guides/lang/'+req.params.lang
                };
                out.guides = guides;
                res.json(out);
            }
        });

    });

    /**
     * Get one guide by id
     */
    app.get('/api/v1/guides/id/:id', function (req, res, next) {
        crud.readOne({
            '_id': req.params.id
        }, function(err, guide){
            if(err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if(guide === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                res.json(guide);
            }
        });
    });

})();