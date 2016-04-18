(function () {
    angular.module('refugeeAuthorEnv')
        .factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            this.user = null;
            var factory = {};

                factory.isLoggedIn = function () {
                    if (user) {
                        return true;
                    } else {
                        return null;
                    }
                };

                factory.getUserStatus = function () {
                    return user;
                };

                factory.login = function (username, password) {
                    var deferred = $q.defer();
                    $http.post('/login', {username: username, password: password})
                        .success(function (data, status) {
                            if (status === 200 && data.status) {
                                user = true;
                                deferred.resolve();
                            } else {
                                user = false;
                                deferred.reject();
                            }
                        })
                        .error(function (data) {
                            user = false;
                            deferred.reject();
                        });

                    return deferred.promise;
                };

                factory.logout = function () {
                    var deferred = $q.defer();

                    $http.get('/logout')
                        .success(function (data) {
                            user = false;
                            deferred.resolve();
                        })
                        .error(function (data) {
                            user = false;
                            deferred.reject();
                        });

                    return deferred.promise;
                };

                factory.register = function (user) {
                    var deferred = $q.defer();

                    $http.post('/register', {
                            username: user.username,
                            email: user.email,
                            name: user.name,
                            surname: user.surname,
                            role: user.role,
                            password: user.password
                        })
                        .success(function (data, status) {
                            if (status === 200 && data.status) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                            }
                        })
                        .error(function (data) {
                            deferred.reject();
                        });

                    return deferred.promise;
                };
            return factory;
        }]);
})();