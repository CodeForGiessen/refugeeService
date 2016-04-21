(function () {
    angular.module('refugeeAuthorEnv')
        .factory('GuideCrudSerive',['$q','$timeout','$http', function ($q, $timeout, $http) {
            return {
                'create': function (guide) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/guides/', guide)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guide);
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
                    $http.get('/api/v1/guides')
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guides);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'readOne': function (id) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/'+id)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guide);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'readIds': function () {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/ids')
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guides);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'readByLang': function (lang) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/lang/'+lang)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guides);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'readByCategory': function (categoryId) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/category/'+categoryId)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guides);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'update': function (guide) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/guides/'+guide._id, guide)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guide);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                },
                'delete': function (guide) {
                    var deferred = $q.defer();
                    $http.delete('/api/v1/guides/'+guide._id, guide)
                        .success(function (data, status) {
                            if(status === 200) {
                                deferred.resolve(data.guide);
                            } else {
                                deferred.reject(data.error);
                            }
                        })
                        .error(function (data) {
                            deferred.reject(data.error);
                        });
                }
            };
        }]);
})();