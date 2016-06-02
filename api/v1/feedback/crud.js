(function () {
    'use strict';
    var Feedback = require('../../../models/feedback.js').feedback;

    function create(feedback, callback) {
        var newfb =  new Feedback(feedback);
        newfb.save(callback);
    }

    function read(query, callback) {
        Feedback.find(query, callback);
    }

    function readOne(query, callback) {
        Feedback.findOne(query, callback);
    }

    function update(query, changes, callback) {
        Feedback.update(query, changes, callback);
    }

    function updateOne(query, changes, callback) {
        Feedback.findOneAndUpdate(query, changes, callback);
    }

    function remove(query, callback) {
        Feedback.findOneAndRemove(query, callback);
    }

    module.exports.create = create;
    module.exports.read = read;
    module.exports.readOne = readOne;
    module.exports.update = update;
    module.exports.updateOne = updateOne;
    module.exports.remove = remove;

})();
