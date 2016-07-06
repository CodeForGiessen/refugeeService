(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('GuideDetailController',
            ['$document', '$scope', '$routeParams', 'GuideCrudService', 'booleanFilter', 'CategoryCrudService', 'AuthService', '$translate',
                function ($document, $scope, $routeParams, GuideCrudService, booleanFilter, CategoryCrudService, AuthService, $translate) {
                    $scope.authService = AuthService;
                    $document.ready(function () {
                        setTimeout(function () {
                            $document.find('#langselect_trans').material_select();
                        }, 0);
                    });
                    $scope.translation = {};
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
                        $document.find('#addTransModal').openModal({
                            ready: function () {
                                Materialize.updateTextFields();
                            }
                        });
                    };
                    this.removeTranslation = function (idx) {
                        if (AuthService.getRole() > 2) {
                            $scope.guide.langs.splice(
                                $scope.guide.langs.indexOf($scope.guide.guidelines[idx].lang),
                                1
                            );
                            $scope.guide.guidelines.splice(idx, 1);
                            GuideCrudService.update($scope.guide).then(function (response) {
                                if(response.status === 200) {
                                    Materialize.toast($translate.instant('DELETED_CONF_MSG'), 3000);
                                } else {
                                    Materialize.toast($translate.instant('DELETED_ERR_MSG'), 3000);
                                }
                            });
                        } else {
                            Materialize.toast($translate.instant('WRONG_ROLE_TO_DO_THAT_MSG'), 3000);
                        }
                    };
                    this.editTranslation = function (idx) {
                        $scope.translation.text = $scope.guide.guidelines[idx].text;
                        $scope.translation.lang = $scope.guide.guidelines[idx].lang;
                        $document.find('#editTransModal').openModal({
                            ready: function () {
                                $document.find('#langselect_trans_edit').val($scope.translation.lang);
                                $document.find('#langselect_trans_edit').material_select();
                                $document.find('#translationtext_edit').focus();
                                Materialize.updateTextFields();
                            },
                            complete: function () {
                                $scope.guide.guidelines[idx].text = $scope.translation.text;
                                var i = $scope.guide.langs.indexOf($scope.guide.guidelines[idx].lang);
                                $scope.guide.langs[i] = $scope.translation.lang;
                                $scope.guide.guidelines[idx].lang = $scope.translation.lang;

                                AuthService.getCurrent(function (data) {
                                    /*
                                    var author = {
                                        userId: data._id,
                                        username: data.username
                                    };
                                    $scope.guide.guidelines[idx].metadata.author= author;
                                    */
                                    GuideCrudService.update($scope.guide);
                                    $scope.translation = {};
                                });
                            }
                        });
                    };
                    this.saveTranslation = function () {
                        $scope.translation.motd_flag = $scope.guide.guidelines[0].motd_flag;
                        var metadata = {};
                        AuthService.getCurrent(function (data) {
                            var author = {
                                userId: data._id,
                                username: data.username
                            };
                            metadata = {
                                author: author,
                                date: Date.now()
                            };
                            $scope.translation.metadata = metadata;
                            $scope.guide.guidelines.push($scope.translation);
                            $scope.guide.langs.push($scope.translation.lang);
                            GuideCrudService.update($scope.guide);
                            $scope.translation = {};
                        });
                    };
                    this.deleteGuide = function () {
                        if (AuthService.getRole() > 2) {
                            $document.find('#confModal').openModal({
                                complete: function () {
                                    if($scope.remove){
                                        GuideCrudService.delete($scope.guide).then(function (response) {
                                            if(response.status === 200) {
                                                Materialize.toast($translate.instant('DELETED_CONF_MSG'), 3000);
                                                $location.path('/list');
                                                $route.reload();
                                            } else {
                                                Materialize.toast($translate.instant('DELETED_ERR_MSG'), 3000);
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            Materialize.toast($translate.instant('WRONG_ROLE_TO_DO_THAT_MSG'), 3000);
                        }
                    };
                }]);
})();
