(function () {
    'use strict';
    angular.module('refugeeAuthorEnv', ['ngRoute','pascalprecht.translate'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/public/partials/main.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl',
                access: {restricted: false}
            }).when('/dashboard', {
                templateUrl: '/public/partials/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashCtrl',
                access: {restricted: false}
            }).when('/login', {
                templateUrl: '/public/partials/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl',
                access: {restricted: false}
            }).when('/list', {
                templateUrl: '/public/partials/list.html',
                controller: 'ListController',
                controllerAs: 'listCtrl',
                access: {restricted: true}
            }).when('/list/:catid', {
                templateUrl: '/public/partials/guidelist.html',
                controller: 'GuideListController',
                controllerAs: 'glistCtrl',
                access: {restricted: true}
            }).when('/guide/:guideid', {
                templateUrl: '/public/partials/guidedetails.html',
                controller: 'GuideDetailController',
                controllerAs: 'detailCtrl',
                access: {restricted: true}
            }).when('/category/:catid', {
                templateUrl: '/public/partials/categorydetails.html',
                controller: 'CategoryDetailController',
                controllerAs: 'detailCtrl',
                access: {restricted: true}
            }).when('/add', {
                templateUrl: '/public/partials/add.html',
                controller: 'AddController',
                controllerAs: 'addCtrl',
                access: {restricted: true}
            }).when('/search', {
                templateUrl: '/public/partials/search.html',
                controller: 'SearchController',
                controllerAs: 'searchCtrl',
                access: {restricted: true}
            }).otherwise({
                redirectTo: '/',
                access: {restricted: false}
            });
        }])
        .run(['$http', '$rootScope', '$location', '$route', '$window', 'AuthService',
            function ($http, $rootScope, $location, $route, $window, AuthService) {
                $rootScope.$on('$routeChangeStart', function (event, next, current) {
                    var token = window.localStorage.getItem('token');
                    //Set access token for all requests
                    if (token) {
                        $http.defaults.headers.common['x-access-token'] = JSON.parse(token);
                    }
                    if (next.access.restricted) {
                        AuthService.getUserStatus()
                            .then(function () {
                                console.log("restricted: " + next.access.restricted + " | logged in: " + AuthService.isLoggedIn());
                                if (AuthService.isLoggedIn() === false) {
                                    $location.path('/login');
                                    $route.reload();
                                }
                            })
                            .catch(function () {
                                $location.path('/login');
                                $route.reload();
                            });
                    }
                });
            }]);
})();
