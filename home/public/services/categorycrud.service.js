(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .factory('CategoryCrudService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            return {
                'create': function (category) {
                    console.log(category);
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/', {
                            category: category
                        })
                        .then(function (response) {
                            if (response.status === 200) {
                                console.log('Success: ' + JSON.stringify(response.data.category));
                                deferred.resolve(response.data.category);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {        
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'read': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/',{headers:{'cache-control':'no-cache'}})
                        .then(function (response) {
                            if (response.status === 200) {
                                categories = response.data.categories;
                                deferred.resolve(categories);
                            } else {
                                console.log("!200");
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            console.log(response.data.error);
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readIds': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/ids',{headers:{'cache-control':'no-cache'}})
                        .then(function (response) {
                            if (response.status === 200) {
                                categories = response.data._links;
                                deferred.resolve(categories);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            console.log(response.data.error);
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readOne': function (id) {
                    var deferred = $q.defer();
                    var category = {};
                    $http.get('/api/v1/categories/' + id,{headers:{'cache-control':'no-cache'}})
                        .then(function (response) {
                            if (response.status === 200) {
                                category = response.data.category;
                                deferred.resolve(category);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            console.log(response.data.error);
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'update': function (category) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/' + category._id, {category: category})
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.category);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'delete': function (category) {
                    var deferred = $q.defer();
                    $http.delete('/api/v1/categories/' + category._id, {category: category})
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.category);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                }
            };
        }]);
})();