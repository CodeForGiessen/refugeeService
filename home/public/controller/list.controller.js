(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .controller('ListController', ['$scope','CategoryCrudService', 'GuideCrudService',
            function ($scope, CategoryCrudService, GuideCrudService) {
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