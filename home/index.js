(function () {
    var express = require('express'),
        exphbs = require('express-handlebars'),
        path = require('path'),
        app = module.exports = express();


    var hbs = exphbs.create({
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '/views');

    // static for css, js, fonts and what else is used...
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));

    app.get('/', function(req, res){
        res.render('home', {
            title: 'Dashboard'
        });
    });

    // route everything else back to home
    /*
    app.get('/*', function(req, res){
        res.render('home', {
            title: 'Dashboard'
        });
    });
    */
})();