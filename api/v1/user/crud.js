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
        User.findOneAndUpdate(query, newdata, callback);
    }

    function del(query, callback) {
        User.findOneAndRemove(query, callback);
    }

    modules.export.read = read;
    modules.export .readOne = readOne;
    modules.export.create = create;
    modules.export.update = update;
    modules.export.del = del;
})();