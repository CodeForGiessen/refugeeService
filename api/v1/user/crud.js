(function () {
    'use strict';
    var User = require('../../../models/user').user;

    function read(query, callback) {
        User.find(query, callback);
    }

    function readOne(query, callback) {
        User.findOne(query, callback);
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

})();