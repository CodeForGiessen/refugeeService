(function () {
    angular.module('refugeeAuthorEnv')
        .controller('RegisterTabController',['$scope', function ($scope) {
            $scope.user = {};

            this.registerUser = function () {
                console.log($scope.user);
            };
        }]);
})();