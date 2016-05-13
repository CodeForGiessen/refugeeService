(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .filter('lang', function () {
            return function (input, lang) {
                return input.filter(function (elt) {
                    return elt.lang === lang;
                });
            };
        })
        .controller('GuideListController',
            ['$document', '$scope', '$location', '$routeParams', '$timeout', 'GuideCrudService','langFilter',
            function ($document, $scope, $location, $routeParams, $timeout, GuideCrudService, langFilter) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.$location = $location;
                $scope.guideList = [];
                $scope.dataLoaded = false;
                $scope.categoryId = $routeParams.catid;
                GuideCrudService.readByCategory($scope.categoryId).then(function (data) {
                    $scope.guideList = data;
                    $scope.dataLoaded = true;
                    $document.find('.preloader-wrapper').removeClass('active');
                }).then(function () {
                    $scope.getTextByLang = function (id) {
                        var guide = $scope.guideList.filter(function (elt) {
                            return elt._id === id;
                        });
                        var guideline = guide.guidelines.filter(function (elt) {
                            return elt.lang === $scope.lang;
                        });
                        return guideline.text;
                    };
                });
            }]);
})();
