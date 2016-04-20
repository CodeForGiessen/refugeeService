(function () {
    angular.module('refugeeAuthorEnv')
        .factory('CategoryCrudService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            var that = this;

            return {
                'createCat': function (category) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/', category)
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
                'readCat': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/')
                        .success(function (data, status) {
                            if(status === 200){
                                categories = data.categories;
                                deferred.resolve(categories);
                            } else {
                                categories.error = data.error;
                                deferred.reject(categories);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            categories.error = data.error;
                            deferred.reject(categories);
                        });
                    return deferred.promise;
                },
                'readCatIds': function () {
                    var deferred = $q.defer();
                    var categories = {};
                    $http.get('/api/v1/categories/ids')
                        .success(function (data, status) {
                            if(status === 200){
                                categories = data._links;
                                deferred.resolve(categories);
                            } else {
                                categories.error = data.error;
                                deferred.reject(categories);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            categories.error = data.error;
                            deferred.reject(categories);
                        });
                    return deferred.promise;
                },
                'readOneCat': function (id) {
                    var deferred = $q.defer();
                    var category = {};
                    $http.get('/api/v1/categories/'+id)
                        .success(function (data, status) {
                            if(status === 200) {
                            category = data.category;
                            deferred.resolve(category);
                            } else {
                                category.error = data.error;
                                deferred.reject(category);
                            }
                        })
                        .error(function (data) {
                            console.log(data.error);
                            category.error = data.error;
                            deferred.reject(category);
                        });
                    return deferred.promise;
                },
                'updateCat': function (category) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/categories/' + category._id, category)
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
                'deleteCat': function (category) {
                    var deferred = $q.defer();
                    $http.delete('/api/v1/categories/' + category._id, category)
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