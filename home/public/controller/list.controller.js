(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('ListController', ['$scope','CategoryCrudService',
            function ($scope, CategoryCrudService) {
                $scope.lang = localStorage.getItem('lang');
                $scope.categories = {};
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
            }]);
})();