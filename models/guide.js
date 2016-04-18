(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var metadata = {
        author: {
            userId: Number,
            username: String
        },
        date: Date
    };

    var guideSchema = new Schema({
        text: String,
        category: Number,
        lang: String,
        motd_flag: Boolean,
        published: Boolean,
        metadata: metadata
    });

    var guide = mongoose.model('Guide',guideSchema);

    module.exports.guideSchema = guideSchema;
    module.exports.guide = guide;
})();