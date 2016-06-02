(function () {
    'use strict';
    var Statistic = require('../../../models/statistic.js').statistic;

    function create(stats, callback) {
        var newfb =  new Statistic(stats);
        newfb.save(callback);
    }

    function read(query, callback) {
        Statistic.find(query, callback);
    }

    function readOne(query, callback) {
        Statistic.findOne(query, callback);
    }

    function update(query, changes, callback) {
        Statistic.update(query, changes, callback);
    }

    function updateOne(query, changes, callback) {
        Statistic.findOneAndUpdate(query, changes, callback);
    }

    function remove(query, callback) {
        Statistic.findOneAndRemove(query, callback);
    }

    module.exports.create = create;
    module.exports.read = read;
    module.exports.readOne = readOne;
    module.exports.update = update;
    module.exports.updateOne = updateOne;
    module.exports.remove = remove;

})();
