(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('GuideListController', ['$scope', '$location', '$routeParams', '$timeout', 'GuideCrudService',
            function ($scope, $location, $routeParams, $timeout, GuideCrudService) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.$location = $location;
                $scope.guideList = [];
                var categoryid = $routeParams.catid;

                GuideCrudService.readByCategory(categoryid).then(function (data) {
                    $scope.guideList = data;
                }).then(function () {
                    $scope.getTextByLang = function (id) {
                        var guide = $scope.guideList.filter(function (elt) {
                            return elt._id === id;
                        });
                        var guideline = guide.guidelines.filter(function (elt) {
                            return elt.lang === $scope.lang;
                        });
                        return guideline.text;
                    }
                });
            }]);
})();