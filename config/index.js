(function () {
    module.exports = {
        //environment
        'environment': process.env.ENVIRONMENT || 'dev',

        //Token Secret
        'tokensecret': process.env.TOKENSECRET||'x?kgbCrxs47!@|~',

        'letsencryptPath': process.env.LEXPATH||'/etc/letsencrypt',

        // users roles
        'userRoles': [
            'newbie',
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
