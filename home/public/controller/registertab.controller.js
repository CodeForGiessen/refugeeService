(function () {
    angular.module('refugeeAuthorEnv')
        .controller('RegisterTabController', ['$scope', '$location', '$translate', 'AuthService',
            function ($scope, $location, $translate, AuthService) {
            $scope.user = {};

            this.registerUser = function () {
                $scope.user.role = 'newbie';
                AuthService.register($scope.user)
                    .then(function () {
                        Materialize.toast($translate.instant('REGISTERTOAST_SUCCESSMSG'), 3000);
                        AuthService.login($scope.user.username, $scope.user.password)
                            .then(function () {
                                $location.path('/');
                                Materialize.toast($translate.instant('LOGINTOAST_SUCCESSMSG',{username: $scope.user.username}), 3000);
                                $scope.user = {};
                            })
                            .catch(function () {
                                $scope.user = {};
                                Materialize.toast($translate.instant('LOGINTOAST_ERRORMSG'), 3000);
                            });
                    })
                    .catch(function () {
                        $scope.user = {};
                        Materialize.toast($translate.instant('REGISTERTOAST_ERRORMSG'), 3000);
                    });
            };
        }]);
})();
