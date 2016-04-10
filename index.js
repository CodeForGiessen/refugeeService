(function () {
    var http = require('http'),
        express = require('express'),
        morgan = require('morgan'),
        api = require('./api'),
        home = require('./home');

    var app = exports.app = express();


    var hostname = 'localhost';
    var port = 8080;

    app.use(morgan('dev'));
    app.set('port', process.env.PORT || port);
    app.use(api);
    app.use(home);

    http.createServer(app).listen(port, hostname, function () {
        console.log('Server started and listening at http://' + hostname + ':' + port + '/');
    });
})();