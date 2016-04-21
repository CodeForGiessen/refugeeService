(function () {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        passport = require('passport'),
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
    app.get('/api/v1/guides/category/:cid', function (req, res, next) {
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
                res.json({
                    "guide" : guide
                });
            }
        });
    });

    /*
    post and delete requests only with authentication!
     */

    /**
     * Create a new guide
     */
    app.post('/api/v1/guides/', passport.authenticate('local'), function (req, res, next) {
        crud.create(req.body.guide, function (err, guide) {
            if(err) {
                res.status(500).json({
                    'err': err
                });
            } else {
                res.status(200).json({
                    'guide':guide
                });
            }
        });
    });

    /**
     * Update guide with id :id
     */
    app.post('/api/v1/guides/:id', passport.authenticate('local'), function (req, res) {
        crud.update({
            '_id': req.params.id
        }, req.body.guide, function (err, guide) {
            if(err){
                res.status(500).json({
                    'err':err
                });
            } else {
                res.status(200).json({
                    'guide':guide
                });
            }
        });
    });

    /**
     * Delete guide with id :id
     */
    app.delete('/api/v1/guides/:id', passport.authenticate('local'), function (req, res) {
        crud.del({
            '_id':req.params.id
        }, function (err, guide) {
            if(err) {
                res.status(500).json({
                    'err':err
                });
            } else {
                res.status(200).json({
                    'guide':guide
                });
            }
        });
    });
})();