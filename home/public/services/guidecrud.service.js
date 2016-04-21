(function () {
    angular.module('refugeeAuthorEnv')
        .factory('GuideCrudSerive',['$q','$timeout','$http', function ($q, $timeout, $http) {
            return {
                'create': function (guide) {
                    
                },
                'read': function () {

                },
                'readOne': function (id) {

                },
                'readIds': function () {

                },
                'readByLang': function (lang) {

                },
                'readByCategory': function (categoryId) {

                },
                'update': function (guide) {

                },
                'delete': function (guide) {

                }
            };
        }]);
})();