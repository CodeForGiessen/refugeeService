(function () {
    module.exports = {
        //Token Secret
        'tokensecret': 'thisisasupersecret',

        // user roles
        'userRoles': [
            'admin',
            'mod',
            'editor',
            'user',
            'newbie'
        ],

        // Server config
        'hostname': '0.0.0.0',
        'port': process.env.PORT||8080,
        'database': 'mongodb://localhost:27017/refugees'
    };
})();