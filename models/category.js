(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var categorySchema = new Schema({
        text: {}
    });

    var category = mongoose.model('Category', categorySchema);

    module.exports.categorySchema = categorySchema;
    module.exports.category = category;
})();