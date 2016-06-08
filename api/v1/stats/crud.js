(function () {
    'use strict';
    var Statistic = require('../../../models/statistic.js').statistic;

    function create(stats, callback) {
        Statistic.findOne({'device.uuid': stats.device.uuid}, function(err, data) {
            if(err){
                return callback(err);
            } else {
                if(data) {
                    callback('entry already exists');
                } else {
                    var newstat =  new Statistic(stats);
                    newstat.save(callback);
                }
            }
        });
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
