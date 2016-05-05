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
        }])
        .controller('GuideDetailController', ['$scope', '$routeParams', 'GuideCrudService', 'booleanFilter',
            function ($scope, $routeParams, GuideCrudService, booleanFilter) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.guide = {};
                var guideId = $routeParams.guideid;
                GuideCrudService.readOne(guideId).then(function (data) {
                    $scope.guide = data;
                });
            }]);
})();