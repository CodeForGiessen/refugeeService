(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('GuideDetailController',
            ['$document', '$scope', '$routeParams', 'GuideCrudService', 'booleanFilter', 'CategoryCrudService',
            function ($document, $scope, $routeParams, GuideCrudService, booleanFilter, CategoryCrudService) {
                $document.ready(function () {
                    setTimeout(function () {
                        $document.find('#langselect_trans').material_select();
                    },0);
                });
                $scope.lang = window.localStorage.getItem('lang');
                $scope.guide = {};
                $scope.category = {};
                $scope.loadedData = false;
                var guideId = $routeParams.guideid;
                GuideCrudService.readOne(guideId).then(function (data) {
                    $scope.guide = data;
                    $scope.loadedData = true;
                    $document.find('.preloader-wrapper').removeClass('active');
                    CategoryCrudService.readOne($scope.guide.category).then(function (data) {
                        $scope.category = data;
                    });
                });
                this.publish = function (idx) {
                    $scope.guide.guidelines[idx].published = !$scope.guide.guidelines[idx].published;
                    GuideCrudService.update($scope.guide);
                };
                this.addTranslation = function () {
                    $document.find('#addTransModal').openModal();

                };
                this.saveTranslation = function () {
                    $scope.translation.motd_flag = $scope.guide.guidelines[0].motd_flag;
                    /* Fixme: Uncomment when userCrud is implemented
                    UserCrudService.getCurrent().then(function(data) {
                        var metadata = {
                            author: {
                                userId: data._id,
                                username: data.username
                            },
                            date: new Date().now();
                        }
                        $scope.translation.metadata = metadata;
                        $scope.guide.guidelines.push($scope.translation);
                        GuideCrudService.update($scope.guide);
                    });
                     */
                    $scope.guide.guidelines.push($scope.translation);
                };
            }]);
})();