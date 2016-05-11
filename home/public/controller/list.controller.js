(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('ListController', ['$scope','CategoryCrudService',
            function ($scope, CategoryCrudService) {
                $scope.lang = window.localStorage.getItem('lang');
                $scope.categories = {};
                $scope.loadedData = false;
                CategoryCrudService.read()
                    .then(function (data) {
                        $scope.categories  = data;
                        $scope.loadedData = true;
                    });
            }]);
})();