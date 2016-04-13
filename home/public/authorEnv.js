(function () {
    'use strict';
    angular.module('refugeeAuthorEnv', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/public/partials/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'
            }).when('/dashboard', {
                templateUrl: '/public/partials/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashCtrl'
            }).when('/login', {
                templateUrl: '/public/partials/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            }).otherwise({
                redirectTo: '/'
            });
        }]);
})();