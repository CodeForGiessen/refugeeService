(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .filter('boolean', ['$translate', function ($translate) {
            /**
             * Filters a boolean and returns a translatable text (YES or NO)
             */
            return function (input) {
                return input ? 'YES' : 'NO';
            };
        }]);
})();