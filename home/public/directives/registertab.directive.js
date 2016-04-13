(function () {
    angular.module('refugeeAuthorEnv')
        .directive('registerTab', function () {
            return {
                restrict: 'A',
                templateUrl: "/public/partials/register-tab.html",
                controller: 'RegisterTabController',
                controllerAs: 'regtabCtrl'
            };
        });
})();