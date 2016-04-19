(function () {
    angular.module('refugeeAuthorEnv')
        .controller('RegisterTabController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
            $scope.user = {};

            this.registerUser = function () {
                console.log($scope.user);
                $scope.user.role = 'newbie';
                AuthService.register($scope.user)
                    .then(function () {
                        AuthService.login($scope.user.username, $scope.user.password)
                            .then(function () {
                                $location.path('/');
                                Materialize.toast("You are now logged in as " + $scope.user.username, 3000, 'rounded');
                                $scope.user = {};
                            })
                            .catch(function () {
                                $scope.user = {};
                                Materialize.toast("Invalid username or password", 3000, 'rounded');
                            });
                    })
                    .catch(function () {
                        $scope.user = {};
                        Materialize.toast("Could not register, maybe try another username?", 3000, 'rounded');
                    });
            };
        }]);
})();
