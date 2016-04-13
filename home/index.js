(function() {
    var express = require('express'),
        app = module.exports = express();

    // static for css, js, fonts and what else is used...
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));

    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
})();
