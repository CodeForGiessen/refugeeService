(function () {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('NavigationController', ['$scope','$document','$timeout','AuthService', function ($scope,$document,$timeout,AuthService) {
            $document.ready(function () {
                $document.find('.button-collapse').sideNav({});
                $document.find('.collapsible').collapsible({
                    accordion: true
                });
                setTimeout(function () {
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
            $scope.logout = function () {
                AuthService.logout()
                    .then(function () {
                        Materialize.toast("You are now logged out.", 3000, 'rounded');
                    });
            };
        }]);
})();