(function () {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('NavigationController',
            ['$scope', '$document', '$timeout', '$location', '$route', '$translate', 'AuthService',
                function ($scope, $document, $timeout, $location, $route, $translate, AuthService) {
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
                            $document.find('.modal-trigger').leanModal({
                                dismissible: true,
                                in_duration: 300,
                                out_duration: 200
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
                    $scope.openLangModal = function () {
                        $document.find('#lang-modal').openModal();
                    };
                    $scope.chooseLang = function (lang) {
                        localStorage.setItem('lang',lang);
                        $translate.use(lang);
                        $document.find('#lang-modal').closeModal();
                    };
                }]);
})();