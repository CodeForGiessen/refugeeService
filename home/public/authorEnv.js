(function() {
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
            }).when('/list',{
                templateUrl: '/public/partials/list.html',
                controller: 'ListController',
                controllerAs: 'listCtrl',
                access: {restricted: true}
            }).when('/list/:id',{
                templateUrl: '/public/partials/guidelist.html',
                controller: 'GuideListController',
                controllerAs: 'glistCtrl',
                access: {restricted: true}
            }).when('/list/:id/:id',{
                templateUrl: '/public/partials/guidedetails.html',
                controller: 'DetailController',
                controllerAs: 'detailCtrl',
                access: {restricted: true}
            }).when('/add',{
                templateUrl: '/public/partials/add.html',
                controller: 'AddController',
                controllerAs: 'addCtrl',
                access: {restricted: true}
            }).when('/search',{
                templateUrl: '/public/partials/search.html',
                controller: 'SearchController',
                controllerAs: 'searchCtrl',
                access: {restricted: true}
            }).otherwise({
                redirectTo: '/',
                access: {restricted: false}
            });
        }])
        .run(['$rootScope', '$location', '$route', '$window', '$translate', 'AuthService', function ($rootScope, $location, $route, $window, $translate, AuthService) {
            var lang = localStorage.getItem('lang');
            if(lang){
                $translate.use(lang);
            }
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                AuthService.getUserStatus()
                    .then(function () {
                        console.log("restricted: "+next.access.restricted + " | logged in: "+AuthService.isLoggedIn());
                        if(next.access.restricted && AuthService.isLoggedIn() === false) {
                            $location.path('/login');
                            $route.reload();
                        }
                    });
            });
        }]);
})();
