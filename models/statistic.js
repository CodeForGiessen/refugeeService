(function () {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var statisticSchema = new Schema({
        device: {
            platform: String,
            version: String,
            uuid: String,
            model: String,
            manufacturer: String,
            isVirtual: Boolean,
            serial: String
        },
        created_at: Date
    });

    var statistic = mongoose.model('Statistic',statisticSchema);

    module.exports.statisticSchema = statisticSchema;
    module.exports.statistic = statistic;
})();
