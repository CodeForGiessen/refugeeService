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

    function update(query, newdata, callback) {
        Category.findOne(query, function(err, data){
            if(err) {
                return callback(err);
            } else if (!data) {
                return callback(null,data);
            } else {
                console.log(JSON.stringify(data.text));
                console.log(JSON.stringify(newdata.text));
                data.text = newdata.text;
                console.log(JSON.stringify(data.text));
                data.markModified('text');
                //data.visits.$inc();
                data.save(callback);
            }
        });
    }

    function del(query, callback) {
        Category.findOneAndRemove(query, callback);
    }

    module.exports.read = read;
    module.exports.readOne = readOne;
    module.exports.getAllIds = getAllIds;
    module.exports.create = create;
    module.exports.update = update;
    module.exports.del = del;
})();
