(function () {
    'use strict';
    var Guide = require('../../../models/guide').guide;

    function read(query, callback) {
        Guide.find(query, callback);
    }

    function readOne(query, callback) {
        Guide.findOne(query, callback);
    }
    
    function getAllIds(callback) {
        Guide.find({}, {
            '_id': 1
        }, function (err, guides) {
            var ids = [];
            if(!err) {
                guides.forEach(function (elt, idx) {
                    ids.push(elt._id);
                });
            }
            
            callback(err, ids);
        });
    }

    function create(guide, callback) {
        var newGuide = new Guide(guide);
        newGuide.save(callback);
    }

    function update(query, newdata, callback) {
        Guide.findOneAndUpdate(query, newdata, callback);
    }

    function del(query, callback) {
        Guide.findOneAndRemove(query, callback);
    }

})();