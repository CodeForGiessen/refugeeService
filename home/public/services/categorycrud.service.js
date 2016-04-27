(function () {
    angular.module('refugeeAuthorEnv')
        .factory('CategoryCrudService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            var that = this;

            return {
                'create': function (category) {
                    console.log(category);
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/', {
                        category:category
                    })
                        .success(function (data, status) {
                            if (status === 200) {
                                console.log('Success: '+data.category);
                                deferred.resolve(data.category);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                },
                'read': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/')
                        .success(function (data, status) {
                            if(status === 200){
                                categories = data.categories;
                                deferred.resolve(categories);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                },
                'readIds': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/ids')
                        .success(function (data, status) {
                            if(status === 200){
                                categories = data._links;
                                deferred.resolve(categories);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                },
                'readOne': function (id) {
                    var deferred = $q.defer();
                    var category = {};
                    $http.get('/api/v1/categories/'+id)
                        .success(function (data, status) {
                            if(status === 200) {
                            category = data.category;
                            deferred.resolve(category);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                },
                'update': function (category) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/' + category._id, {category:category})
                        .success(function (data, status) {
                            if (status === 200) {
                                deferred.resolve(data.category);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                },
                'delete': function (category) {
                    var deferred = $q.defer();
                    $http.delete('/api/v1/categories/' + category._id, {category:category})
                        .success(function (data, status) {
                            if (status === 200) {
                                deferred.resolve(data.category);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                    return deferred.promise;
                }
            };
        }]);
})();