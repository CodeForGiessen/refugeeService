(function() {
    angular.module('refugeeAuthorEnv')
        .directive('registerTab', function() {
            return {
                restrict: 'A',
                templateUrl: "/public/partials/register-tab.html",
                controller: 'RegisterTabController',
                controllerAs: 'regtabCtrl'
            };
        }).directive('validatePassword', function() {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    ctrl.$validators.validatePassword = function(modelValue, viewValue) {
                        if (ctrl.$isEmpty(modelValue)) {
                            return false;
                        }
                        return scope.user.password === viewValue;
                    };
                }
            };
        });
})();
