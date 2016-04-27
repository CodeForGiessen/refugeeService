(function () {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('NavigationController',
            ['$scope', '$document', '$timeout', '$location', '$route', 'AuthService',
                function ($scope, $document, $timeout, $location, $route, AuthService) {
                    $document.ready(function () {
                        setTimeout(function () {
                            $document.find('.button-collapse').sideNav({});
                            $document.find('.collapsible').collapsible({
                                accordion: true
                            });
                            $document.find('.dropdown-btn').dropdown({
                                inDuration: 300,
                                outDuration: 200,
                                belowOrigin: true,
                                alignment: 'left',
                                constrain_width: false
                            });
                        }, 0);
                    });
                    $scope.isLoggedIn = function () {
                        return AuthService.isLoggedIn();
                    };
                    $scope.logoutBtn = function () {
                        if(!$document.find('#nav-logout-btn').hasClass('disabled')) {
                            AuthService.logout()
                                .then(function () {
                                    $route.reload();
                                    Materialize.toast("You are now logged out.", 3000, 'rounded');
                                });
                        }

                    };
                    $scope.loginBtn = function () {
                        if(!$document.find('#nav-login-btn').hasClass('disabled')) {
                            $location.path('/login');
                            $route.reload();
                        }
                    };
                    $scope.settingsBtn = function () {
                        if(!$document.find('#nav-setting-btn').hasClass('disabled')) {
                            
                        }
                    };
                }]);
})();