(function () {
    'use strict';

    var express = require('express'),
        app = module.exports = express(),
        guides = require('./guides'),
        categories = require('./categories'),
        users = require('./users');


    app.get('/api/v1/', function (req, res) {
        res.status = 200;
        res.send({
            '_links': {
                'self': {
                    'href': '/api/v1'
                },
                'guides': {
                    'guidesAll': {
                        'href': '/api/v1/guides'
                    },
                    'guidesByLang': {
                        'href': '/api/v1/guides?lang=languagecode'
                    },
                    'guidesByCategory': {
                        'href': '/api/v1/guides?category=id'
                    },
                    'guidesByLangAndCategory': {
                        'href': '/api/v1/guides?lang=languagecode&category=id'
                    },
                    'guidesIds' : {
                        'href': '/api/v1/guides/ids'
                    },
                    'guideById': {
                        'href': '/api/v1/guides/:id'
                    }
                },
                'categories': {
                    'categoryAll': {
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
    app.use(users);
})();
