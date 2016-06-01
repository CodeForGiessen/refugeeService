(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('ListController', ['$scope', '$document', 'CategoryCrudService',
            function ($scope, $document, CategoryCrudService) {
                $scope.lang = localStorage.getItem('lang');
                $scope.categories = [];
                $scope.languages = function (obj) {
                    var out = [];
                    for (var k in obj) {
                        out.push(k);
                    }
                    return out;
                };
                $scope.loadedData = false;
                CategoryCrudService.read()
                    .then(function (data) {
                        $scope.categories  = data;
                        $scope.loadedData = true;
                    });
                this.addCategory = function () {
                    $document.find('#addModal').openModal({
                        ready: function(){
                            $document.find('#langselect_category').material_select();
                        }
                    });
                };
                this.saveCategory = function () {
                    var category = {};
                    var text = {};
                    text[$scope.categorylang] = $scope.categorytext;
                    category.text = text;
                    CategoryCrudService.create(category)
                        .then(function (ncategory) {
                            $scope.categorytext = "";
                            $document.find('#langselect_category').prop('selectedIndex',0);
                            $document.find('#langselect_category').material_select();
                            $scope.categories.push(ncategory);
                        });
                };
            }]);
})();
