(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username: String,
        email: String,
        name: String,
        surname: String,
        role: String,
        password: String
    });

    var user = mongoose.model('User', userSchema);

    module.exports.userSchema = userSchema;
    module.exports.user = user;
})();
