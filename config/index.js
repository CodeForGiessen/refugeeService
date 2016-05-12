(function () {
    module.exports = {
        //Token Secret
        'tokensecret': process.env.tokenSecret||'x?kgbCrxs47!@|~',

        // users roles
        'userRoles': [
            'newbie',
            'user',
            'editor',
            'mod',
            'admin'
        ],

        // Server config
        'hostname': process.env.HOST||'0.0.0.0',
        'port': process.env.PORT||8080,
        'database': process.env.DATABASE||'mongodb://localhost:27017/refugees'
    };
})();