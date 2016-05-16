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
            ['$document', '$scope', '$location', '$routeParams', '$timeout', 'GuideCrudService', 'CategoryCrudService', 'langFilter',
            function ($document, $scope, $location, $routeParams, $timeout, GuideCrudService, CategoryCrudService, langFilter) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.$location = $location;
                $scope.guideList = [];
                $scope.dataLoaded = false;
                $scope.categoryId = $routeParams.catid;
                $scope.category = {};
                GuideCrudService.readByCategory($scope.categoryId).then(function (data) {
                    $scope.guideList = data;
                    $scope.dataLoaded = true;
                    $document.find('.preloader-wrapper').removeClass('active');
                    CategoryCrudService.readOne($scope.categoryId).then(function (data) {
                        $scope.category = data;
                    });
                });
            }]);
})();
