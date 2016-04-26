(function () {
    'use strict';

    var express = require('express'),
        app = module.exports = express(),
        guides = require('./guides'),
        categories = require('./categories');


    app.get('/api/v1/', function (req, res) {
        res.status = 200;
        res.send({
            '_links': {
                'self': {
                    'href': '/api/v1'
                },
                'guides': {
                    'allGuides': {
                        'href': '/api/v1/guides'
                    },
                    'guidesIds' : {
                        'href': '/api/v1/guides/ids'
                    },
                    'guidesByCategory': {
                        'href': '/api/v1/guides/categories/:categoryid'
                    },
                    'guidesByLanguage': {
                        'href': '/api/v1/guides/lang/:langcode'
                    },
                    'guideById': {
                        'href': '/api/v1/guides/:id'
                    }
                },
                'categories': {
                    'allCategories': {
                        'href': '/api/v1/categories'
                    },
                    'categoryIds' : {
                        'href': '/api/v1/categories/ids'
                    },
                    'categoryById': {
                        'href': '/api/v1/categories/:id'
                    }
                }
            }
        });
    });
    app.use(guides);
    app.use(categories);
})();
