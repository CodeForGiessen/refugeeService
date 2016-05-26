(function(){
    'use strict';
    angular.module('refugeeAuthorEnv')
    .service('UserCrudService', ['$q', '$http',
        function($q, $http) {
            return {
                read: function () {
                    var deferred = $q.defer();
                    $http.get('/api/v1/users/all')
                    .then(function(response){
                        if(response.status === 200){
                            deferred.resolve(response.data.users);
                        } else {
                            deferred.reject(response.status);
                        }
                    },
                    function(response) {
                        deferred.reject(response.statstatus);
                    });
                    return deferred.promise;
                },

                readOne: function (uid) {
                    var deferred = $q.defer();
                    $http.get('/api/v1/users/id/'+uid)
                        .then(function(response){
                            if(response.status===200){
                                deferred.resolve(response.data.user);
                            } else {
                                deferred.reject(response.status);
                            }
                        },
                        function(response){
                            deferred.reject(reponse.status);
                        }
                    );
                    return deferred.promise;
                },

                updateUserRole: function (uid, role) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/users/id/'+uid+'?role='+role)
                    .then(function(response){
                        if(response.status === 200) {
                            deferred.resolve(response.data.user);
                        } else {
                            deferred.reject(reponse.data.err);
                        }
                    },
                    function(response){
                        deferred.reject(response.data.err);
                    });
                    return deferred.promise;
                },

                updateUserData: function (uid, changes) {
                    var deferred = $q.defer();
                    $http.post('/api/v1/users/me/'+uid, {user: changes})
                    .then(function(response){
                        if(response.status === 200) {
                            deferred.resolve(response);
                        } else {
                            deferred.reject(reponse.data.err);
                        }
                    },
                    function(response){
                        deferred.reject(response.data.err);
                    });
                    return deferred.promise;
                },

                remove: function (user) {
                    var deferred = $q.defer();
                    deferred.reject('not yet implemented');
                    return deferred.promise;
                }
            };
        }
    ]);
})();
