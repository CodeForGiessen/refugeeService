(function() {
    angular.module('refugeeAuthorEnv')
        .directive('loginTab', function() {
            return {
                restrict: 'A',
                templateUrl: "/public/partials/login-tab.html",
                controller: 'LoginTabController',
                controllerAs: 'logintabCtrl'
            };
        });
})();
