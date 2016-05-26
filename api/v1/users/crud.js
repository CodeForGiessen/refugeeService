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
        if(newdata.username === null ||
            newdata.email === null ||
            newdata.name === null ||
            newdata.surname === null ||
            newdata.username === '' ||
            newdata.email === '' ||
            newdata.name === '' ||
            newdata.surname === ''
            ) {
            return callback(new Error('fields cant be empty'));
        } else {
            User.findOne({username: newdata.username}, '-salt -hashedPassword', function(err, user){
                if(err) return callback(err);
                if(user){
                    if(user._id !== query._id) {
                        return callback(new Error('username already used'));
                    }
                }
                User.update(query, newdata, callback);
            });
        }
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
