(function () {
    angular.module('refugeeAuthorEnv')
        .controller('LoginTabController', ['AuthService', '$scope', '$location', function (AuthService, $scope, $location) {
            var that = this;
            
            this.login = function () {
                $scope.disabled = true;

                AuthService.login(that.user.username, that.user.password)
                    .then(function () {
                        $scope.disabled = false;
                        $location.path('/');
                        Materialize.toast("You are now logged in as " + that.user.username, 3000, 'rounded');
                        that.user = {};
                    })
                    .catch(function () {
                        $scope.disabled = false;
                        that.user = {};
                        Materialize.toast("Invalid username or password", 3000, 'rounded');
                    });
            };
        }]);
})();
