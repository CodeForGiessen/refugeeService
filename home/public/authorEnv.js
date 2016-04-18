(function() {
    'use strict';
    angular.module('refugeeAuthorEnv', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
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
            }).when('/list',{
                templateUrl: '/public/partials/list.html',
                controller: 'ListController',
                controllerAs: 'listCtrl'
            }).when('/list/:id',{
                templateUrl: '/public/partials/guidelist.html',
                controller: 'GuideListController',
                controllerAs: 'glistCtrl'
            }).when('/list/:id/:id',{
                templateUrl: '/public/partials/guidedetails.html',
                controller: 'DetailController',
                controllerAs: 'detailCtrl'
            }).when('/add',{
                templateUrl: '/public/partials/add.html',
                controller: 'AddController',
                controllerAs: 'addCtrl'
            }).when('/search',{
                templateUrl: '/public/partials/search.html',
                controller: 'SearchController',
                controllerAs: 'searchCtrl'
            }).otherwise({
                redirectTo: '/'
            });
        }]);
})();
