(function () {
    module.exports = {
        //Token Secret
        'tokensecret': 'thisisasupersecret',

        // users roles
        'userRoles': [
            'newbie',
            'user',
            'editor',
            'mod',
            'admin'
        ],

        // Server config
        'hostname': '0.0.0.0',
        'port': process.env.PORT||8080,
        'database': 'mongodb://localhost:27017/refugees'
    };
})();