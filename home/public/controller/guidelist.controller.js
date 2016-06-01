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
                $scope.guideline = {};
                GuideCrudService.readByCategory($scope.categoryId).then(function (data) {
                    $scope.guideList = data;
                    $scope.dataLoaded = true;
                    $document.find('.preloader-wrapper').removeClass('active');
                    CategoryCrudService.readOne($scope.categoryId).then(function (data) {
                        $scope.category = data;
                    });
                });
                this.addGuide = function () {
                    $document.find('#addModal').openModal({
                        ready: function(){
                            $document.find('#langselect_guide').material_select();
                            $document.find('#categoryselect').material_select();
                        }
                    });
                };
                this.saveGuide = function () {
                    var guide = $scope.guideline;
                    guide.category = $scope.categoryId;
                    guide.guidelines = [];
                    $scope.guidelines.published = false;
                    guide.guidelines.push($scope.guidelines);
                    guide.langs = [];
                    guide.langs.push($scope.guidelines.lang);
                    GuideCrudService.create(guide)
                        .then(function (nguide) {
                            $scope.guidelines = {};
                            $scope.guideline = {};
                            $document.find('select').prop('selectedIndex',0);
                            $document.find('select').material_select();
                            $document.find('select').material_select();
                            $scope.guideList.push(nguide);
                        });
                };
            }]);
})();
