(function () {
    "use strict";
    angular.module("refugeeAuthorEnv")
        .controller("CategoryDetailController", ['$scope', '$document', '$routeParams', '$route', '$location', '$translate', 'CategoryCrudService', 'AuthService',
            function ($scope, $document, $routeParams, $route, $location, $translate, CategoryCrudService, AuthService) {
                $scope.loadedData = false;
                $scope.translation = {};
                $scope.categories = [];
                $scope.categoryObject = {};
                CategoryCrudService.readOne($routeParams.catid).then(function (data) {
                    $scope.loadedData = true;
                    $scope.categoryObject = data;
                    var categories = function (obj) {
                        var out = [];
                        for (var k in obj) {
                            out.push({lang: k, text: obj[k]});
                        }
                        return out;
                    };
                    $scope.categories = categories(data.text);
                });

                this.addTranslation = function () {
                    $document.find('#transModal').openModal({
                        ready: function () {
                            $document.find('select').material_select();
                        },
                        complete: function () {
                            if ($scope.translation) {
                                $scope.categoryObject.text[$scope.translation.lang] = $scope.translation.text;
                                $scope.categories.push({
                                    lang:$scope.translation.lang,
                                    text:$scope.translation.text
                                });
                                CategoryCrudService.update($scope.categoryObject);
                                $scope.translation = {};
                            }
                        }
                    });
                };

                this.removeTranslation = function (idx) {
                    if (AuthService.getRole() > 2) {
                        delete $scope.categoryObject.text[$scope.categories[idx].lang];
                        $scope.categories.splice(idx, 1);
                        CategoryCrudService.update($scope.categoryObject).then(function (response) {
                            if(response.status === 200) {
                                Materialize.toast($translate.instant('DELETED_CONF_MSG'), 3000, 'rounded');
                            } else {
                                Materialize.toast($translate.instant('DELETED_ERR_MSG'), 3000, 'rounded');
                            }
                        });
                    } else {
                        Materialize.toast($translate.instant('WRONG_ROLE_TO_DO_THAT_MSG'), 3000, 'rounded');
                    }
                };

                this.editTranslation = function (idx) {
                    $scope.translation.text = $scope.categories[idx].text;
                    $scope.translation.lang = $scope.categories[idx].lang;
                    $document.find('#transModal').openModal({
                        ready: function () {
                            $document.find('.modal-content>h4').text($translate.instant('DETAIL_EDIT_TRANSLATION'));
                            $document.find('#langselect_trans').val($scope.translation.lang);
                            $document.find('#langselect_trans').material_select();
                            $document.find('#translationtext').focus();
                            Materialize.updateTextFields();
                        },
                        complete: function () {
                            delete $scope.categoryObject[$scope.categories[idx].lang];
                            $scope.categoryObject.text[$scope.translation.lang] = $scope.translation.text;
                            $scope.categories[idx].text = $scope.translation.text;
                            $scope.categories[idx].lang = $scope.translation.lang;
                            CategoryCrudService.update($scope.categoryObject);
                            $scope.translation = {};
                        }
                    });
                };

                this.removeCategory = function () {
                    if (AuthService.getRole() > 2) {
                        $document.find('#confModal').openModal({
                            complete: function () {
                                if($scope.remove){
                                    CategoryCrudService.delete($scope.categoryObject).then(function (response) {
                                        if(response.status === 200) {
                                            Materialize.toast($translate.instant('DELETED_CONF_MSG'), 3000, 'rounded');
                                            $location.path('/list');
                                            $route.reload();
                                        } else {
                                            Materialize.toast($translate.instant('DELETED_ERR_MSG'), 3000, 'rounded');
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        Materialize.toast($translate.instant('WRONG_ROLE_TO_DO_THAT_MSG'), 3000, 'rounded');
                    }
                };

            }]);
})();
