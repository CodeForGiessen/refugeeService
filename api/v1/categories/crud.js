(function () {
    'use strict';
    var Category = require('../../../models/category').category;

    function read(query, callback) {
        Category.find(query, callback);
    }
    
    function readOne(query, callback) {
        Category.findOne(query, callback);
    }

    function getAllIds(callback) {
        Category.find({}, {
            '_id': 1
        }, function (err, categories) {
            var ids = [];
            if(!err) {
                categories.forEach(function( elt, idx) {
                    ids.push(elt._id);
                });
            }

            callback(err,ids);
        });
    }

    function create(category, callback) {
        var newCategory = new Category(category);
        newCategory.save(callback);
    }

    function update(query,newdata, callback) {
        Category.findOneAndUpdate(query, newdata, callback);
    }

    function del(query, callback) {
        Category.findOneAndRemove(query, callback);
    }

})();