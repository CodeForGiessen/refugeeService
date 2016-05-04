(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .factory('GuideCrudService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            return {
                'create': function (guide) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/guides/', {guide: guide})
                        .then(function (response) {
                                if (response.status === 200) {
                                    deferred.resolve(response.data.guide);
                                } else {
                                    deferred.reject(response.data.error);
                                }
                            }
                            , function (response) {
                                deferred.reject(response.data.error);
                            });
                    return deferred.promise;
                },
                'read': function () {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides')
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guides);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readOne': function (id) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/' + id)
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guide);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readIds': function () {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides/ids')
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guides);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readByLang': function (lang) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides?lang=' + lang)
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guides);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'readByCategory': function (categoryId) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/guides?category=' + categoryId)
                        .then(function (response) {
                            if (response.status === 200) {
                                console.log('Guides: '+ JSON.stringify(response.data));
                                deferred.resolve(response.data.guides);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'update': function (guide) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/guides/' + guide._id, {guide: guide})
                        .then (function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guide);
                            } else {
                                deferred.reject(response.data.error);
                            }
                        }, function (response) {
                            deferred.reject(response.data.error);
                        });
                    return deferred.promise;
                },
                'delete': function (guide) {
                    var deferred = $q.defer();
                    $http.delete('/api/v1/guides/' + guide._id, {guide: guide})
                        .then(function (response) {
                            if (response.status === 200) {
                                deferred.resolve(response.data.guide);
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