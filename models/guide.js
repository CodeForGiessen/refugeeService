(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var metadata = {
        author: {
            userId: String,
            username: String
        },
        date: Date
    };

    var guideline = {
        lang: String,
        text: String,
        motd_flag: Boolean,
        metadata: metadata,
        published: Boolean
    };

    var guideSchema = new Schema({
        guidelines: [guideline],
        category: String,
        langs: [String]
    });

    var guide = mongoose.model('Guide',guideSchema);

    module.exports.guideSchema = guideSchema;
    module.exports.guide = guide;
})();