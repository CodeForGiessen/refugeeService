(function () {
    angular.module('refugeeAuthorEnv')
        .controller('LoginTabController', function () {
            this.user = {
                username: '',
                password: ''
            };
        });
})();