(function () {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        auth = require('../../../auth/auth'),
        crud = require('./crud');

    /**
     * Get all Guides.
     */
    app.get('/api/v1/guides', function (req, res, next) {
        var query = {};
        var lang = req.query.lang;
        var category = req.query.category;
        var pub = req.query.published;
        if (lang) {
            query['guidelines.lang'] = lang.toString();
        }
        if (category) {
            query.category = category.toString();
        }
        if(pub){
            query['guidelines.published'] = pub;
        }
        crud.read(query, function (err, guides) {
            if (err) {
                res.statusCode = 500;
                res.json({
                    "error": 'An unexpected server error occurred'
                });
            }

            if (guides === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                var result = [];
                if (lang || category) {
                    result = guides.filter(function (elt) {
                        if (lang) {
                            elt.guidelines = elt.guidelines.filter(function (elt) {
                                return elt.lang === lang;
                            });
                        }

                        if(pub) {
                            elt.guidelines = elt.guidelines.filter(function (elt) {
                                return elt.published;
                            });
                        }

                        if (category) {
                            return elt.category === category;
                        } else {
                            return true;
                        }
                    });
                } else {
                    result = guides;
                }
                res.statusCode = 200;
                var out = {};
                out._links = {};
                out._links.self = {
                    'href': '/api/v1/guides/'
                };
                out.guides = result;
                res.json(out);
            }
        });
    });

    /**
     * Get all guide Ids
     */
    app.get('/api/v1/guides/ids', function (req, res, next) {
        crud.getAllIds(function (err, ids) {
            if (err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }
            if (ids === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                res.statusCode = 200;
                var out = {};
                out.self = {
                    'href': '/api/v1/guides/ids'
                };
                out._links = [];

                ids.forEach(function (elt) {
                    var o = {};
                    o[elt] = {
                        'href': '/api/v1/guides/' + elt
                    };
                    out._links.push(o);
                });

                res.json(out);
            }
        });
    });

    /**
     * Get one guide by id
     */
    app.get('/api/v1/guides/:id', function (req, res, next) {
        var query = {};
        query._id = req.params.id;
        var lang = req.query.lang;
        if(lang) query['guidelines.lang'] = lang;

        crud.readOne(query, function (err, guide) {
            if (err) {
                res.statusCode = 500;
                res.json({
                    "error": err
                });
                next(err);
            }

            if (guide === null) {
                res.statusCode = 404;
                res.json({
                    "error": "GuideNotFound"
                });
            } else {
                if(lang) {
                    var filteredGuideline = guide.guidelines.filter(function (elt) {
                        return elt.lang === lang;
                    });
                    guide.guidelines = filteredGuideline;
                }

                res.statusCode = 200;
                res.json({
                    "guide": guide
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
    app.post('/api/v1/guides/', auth.hasRole('editor'), function (req, res, next) {
        console.log(JSON.stringify(req.body.guide));
        console.log('Building metadata for guide');
        var guide = req.body.guide;
        var metadata = {
            author: {
                userId: req.decoded._id,
                username: req.decoded.username
            },
            date: Date.now()
        };
        guide.guidelines[guide.guidelines.length-1].metadata = metadata;
        guide.guidelines.published = false;
        crud.create(guide, function (err, guide) {
            if (err) {
                console.log(err);
                res.status(500).json({
                    'err': err
                });
            } else {
                res.status(200).json({
                    'guide': guide
                });
            }
        });
    });

    /**
     * Update guide with id :id
     */
    app.post('/api/v1/guides/:id', auth.hasRole('editor'), function (req, res) {
        var guide = req.body.guide;
        var metadata = {
            author: {
                userId: req.decoded._id,
                username: req.decoded.username
            },
            date: Date.now()
        };
        guide.metadata = metadata;
        crud.update({
            '_id': req.params.id
        }, guide, function (err, guide) {
            if (err) {
                res.status(500).json({
                    'err': err
                });
            } else {
                res.status(200).json({
                    'guide': guide
                });
            }
        });
    });

    /**
     * Delete guide with id :id
     */
    app.delete('/api/v1/guides/:id', auth.hasRole('mod'), function (req, res) {
        crud.del({
            '_id': req.params.id
        }, function (err, guide) {
            if (err) {
                res.status(500).json({
                    'err': err
                });
            } else {
                res.status(200).json({
                    'guide': guide
                });
            }
        });
    });
})();
