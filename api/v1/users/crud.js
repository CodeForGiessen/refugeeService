(function () {
    'use strict';
    var User = require('../../../models/user').user;

    function read(query, callback) {
        User.find(query, '-salt -hashedPassword', callback);
    }

    function readOne(query, callback) {
        User.findOne(query, '-salt -hashedPassword', callback);
    }

    function create(user, callback) {
        var newUser = new User(user);
        newUser.save(callback);
    }

    function update(query, newdata, callback) {
        User.update(query, newdata, callback);
    }

    function del(query, callback) {
        User.findOneAndRemove(query, callback);
    }

    module.exports.read = read;
    module.exports.readOne = readOne;
    module.exports.create = create;
    module.exports.update = update;
    module.exports.del = del;
})();
