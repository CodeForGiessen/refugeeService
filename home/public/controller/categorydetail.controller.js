(function () {
    "use strict";
    angular.module("refugeeAuthorEnv")
        .controller("CategoryDetailController", ['$scope', '$document', '$routeParams', 'CategoryCrudService',
            function ($scope, $document, $routeParams, CategoryCrudService) {
                $scope.loadedData = false;
                $scope.categories = [];
                $scope.categoryObject = {};
                CategoryCrudService.readOne($routeParams.catid).then(function (data) {
                    $scope.loadedData = true;
                    $scope.categoryObject = data;
                    var categories = function (obj) {
                        var out = [];
                        for (var k in obj) {
                            out.push({lang: k, val: obj[k]});
                        }
                        return out;
                    };
                    $scope.categories = categories(data.text);
                    console.log($scope.categories);
                });

                this.addTranslation = function () {
                    $document.find('#addTransModal').openModal({
                        ready: function () {
                            $document.find('select').material_select();
                        },
                        complete: function () {
                            if ($scope.translation) {
                                $scope.categoryObject.text[$scope.translation.lang] = $scope.translation.text;
                                $scope.categories.push({
                                    lang:$scope.translation.lang,
                                    val:$scope.translation.text
                                });
                                CategoryCrudService.update($scope.categoryObject);
                                $scope.translation = {};
                            }
                        }
                    });
                };
            }]);
})();