(function () {
    angular.module('refugeeAuthorEnv')
        .factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            this.user = false;
            var factory = {};

                factory.isLoggedIn = function () {
                    if (this.user) {
                        return true;
                    } else {
                        return false;
                    }
                };

                factory.getUserStatus = function () {
                    return $http.get('/userstatus')
                        .success(function (data) {
                            user = data.status;
                        })
                        .error(function (data) {
                            user = false;
                        });
                };

                factory.login = function (username, password) {
                    var deferred = $q.defer();
                    $http.post('/login', {username: username, password: password})
                        .success(function (data, status) {
                            if (status === 200 && data.status) {
                                this.user = true;
                                deferred.resolve();
                            } else {
                                this.user = false;
                                deferred.reject();
                            }
                        })
                        .error(function (data) {
                            this.user = false;
                            deferred.reject();
                        });

                    return deferred.promise;
                };

                factory.logout = function () {
                    var deferred = $q.defer();

                    $http.get('/logout')
                        .success(function (data) {
                            this.user = false;
                            deferred.resolve();
                        })
                        .error(function (data) {
                            this.user = false;
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