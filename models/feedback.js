(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var comment = {
        username: String,
        text: String,
        created_at: Date
    };

    var feedbackSchema = new Schema({
        feedback: {
            email: String,
            rating: Number,
            text: String,
            created_at: Date
        },
        comments: [comment]
    });

    var feedback = mongoose.model('Feedback',feedbackSchema);

    module.exports.feedbackSchema = feedbackSchema;
    module.exports.feedback = feedback;
})();
