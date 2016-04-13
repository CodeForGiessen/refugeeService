(function() {
    angular.module('refugeeAuthorEnv')
        .directive('headerNavigation', function() {
            return {
                restrict: 'A',
                templateUrl: "/public/partials/header-navigation.html",
                controller: 'NavigationController',
                controllerAs: 'navCtrl'
            };
        });
})();
