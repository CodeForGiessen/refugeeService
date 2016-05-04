(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('GuideDetailController', ['$scope', '$routeParams', 'GuideCrudService',
            function ($scope, $routeParams, GuideCrudService) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.guide = {};
                var guideId = $routeParams.guideid;
                GuideCrudService.readOne(guideId).then(function (data) {
                    $scope.guide = data;
                });
            }]);
})();