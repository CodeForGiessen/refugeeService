(function() {
    'use strict';
    var express = require('express'),
        app = module.exports = express(),
        crud = require('./crud');

    /**
     * Post statistics
     * @return {JSON} returns only a status code (200, 500, 404, ...)
     */
    app.post('/api/v1/stats/', function(req, res, next){
        crud.create({
            device: req.body.device,
            created_at: Date.now()
        }, function(err, data){
            if(err) {
                res.status(500).json({
                    err: 'unexpected server error'
                });
            } else {
                if(!data) {
                    res.status(400).json({
                        err: 'not created'
                    });
                } else {
                    res.status(201).send();
                }
            }
        });
    });

    /**
     * get statistics
     * @return {json} builds a json-object, full of statistics
     * {
     * 	statistics: {
     * 		totalDeviceNum: 3,
     * 		androidDevices: [],
     * 		androidVersions: [],
     * 		iosDeviceNum: [],
     * 	}
     * 	complete: {
     * 		[{
     * 			device: {
     *   			platform: String,
     *          	version: String,
     *           	uuid: String,
     *            	model: String,
     *             	manufacturer: String,
     *              isVirtual: Boolean,
     *              serial: String
     *              },
     *          created_at: Date
     *      }]
     * 	}
     * }
     */
    app.get('/api/v1/stats/', function (req, res, next) {
        crud.read({}, function (err, data) {
            if(err) {
                res.status(500).send({
                    err: 'unexpected server error'
                });
            } else {
                if(!data) {
                    res.status(404).send({
                        err: 'no statistics found'
                    });
                } else {
                    var statistics = {};

                    var totalDeviceNum = data.length;

                    var androidDevices = data.filter(function(elt){
                        return elt.device.platform.toLowerCase === 'android';
                    });
                    var androidDeviceNum = androidDevices.length;
                    var androidVersions = androidDevices.map(function(elt, idx, arr) {
                        return {
                            version: elt.device.version,
                            num: arr.filter(function(device){
                                return device.device.version === elt.device.version;
                            })
                        };
                    });

                    var iosDeviceNum = data.filter(function(elt){
                        return elt.device.platform.toLowerCase === 'ios';
                    }).length;

                    var devicesByDate = data.sort(function(a,b){
                        if(a.created_at < b.created_at) return -1;
                        if(a.created_at > b.created_at) return 1;
                        return 0;
                    }).map(function(elt, idx, arr){
                        return {
                            date: elt.created_at,
                            num: arr.filter(function(stat){
                                return stat.created_at <= elt.created_at;
                            }).length
                        };
                    });
                    statistics.totalDeviceNum = totalDeviceNum;
                    statistics.androidDeviceNum = androidDeviceNum;
                    statistics.iosDeviceNum = iosDeviceNum;
                    statistics.devicesByDate = devicesByDate;
                    var result = {
                        statistics: statistics,
                        complete: data
                    };

                    res.status(200).send({
                        data: result
                    });
                }
            }
        });
    });

})();
