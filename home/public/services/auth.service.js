(function () {
    "use strict";
    angular.module('refugeeAuthorEnv')
        .factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
            var that = this;
            this.user = false;
            var factory = {};

            factory.isLoggedIn = function () {
                if (that.user) {
                    return true;
                } else {
                    return false;
                }
            };

            factory.getCurrent = function (callback) {
                callback(JSON.parse(window.localStorage.getItem('profile')));
            };

            factory.getRole = function () {
                console.log(JSON.parse(window.localStorage.getItem('profile')).role);
                return JSON.parse(window.localStorage.getItem('profile')).role || -1;
            };

            factory.hasRole = function (role) {
                var deferred = $q.defer();
                $http.get('/api/v1/users/role?role=' + role)
                    .then(function (response) {
                        if (response.status === 200) {
                            deferred.resolve(response.data.message);
                        } else {
                            deferred.reject(response.data.message);
                        }
                    }, function (response) {
                        deferred.reject(response.data.message);
                    });
                return deferred.promise;
            };

            factory.getUserStatus = function () {
                var deferred = $q.defer();
                $http.get('/userstatus')
                    .then(function (response) {
                        that.user = response.data.success;
                        if (response.status !== 200) {
                            window.localStorage.setItem('token', false);
                        }
                        deferred.resolve();
                    }, function (response) {
                        that.user = false;
                        window.localStorage.removeItem('profile');
                        window.localStorage.setItem('token', false);
                        deferred.reject();
                    });
                return deferred.promise;
            };

            factory.login = function (username, password) {
                var deferred = $q.defer();
                $http.post('/login', {username: username, password: password})
                    .then(function success(response) {
                        if (response.status === 200) {
                            that.user = true;
                            window.localStorage.setItem('profile', JSON.stringify(response.data.user));
                            window.localStorage.setItem('token', JSON.stringify(response.data.token));
                            deferred.resolve();
                        } else {
                            that.user = false;
                            deferred.reject();
                        }
                    }, function error(response) {
                        that.user = false;
                        deferred.reject();
                    });
                return deferred.promise;
            };

            factory.logout = function () {
                var deferred = $q.defer();

                $http.get('/logout')
                    .then(function (response) {
                        that.user = false;
                        window.localStorage.removeItem('profile');
                        window.localStorage.setItem('token', false);
                        deferred.resolve();
                    }, function (response) {
                        that.user = false;
                        window.localStorage.removeItem('profile');
                        window.localStorage.setItem('token', false);
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
                    .then(function (response) {
                        if (response.status === 200 && response.data.success) {
                            window.localStorage.setItem('token', JSON.stringify(response.data.token));
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function (response) {
                        deferred.reject();
                    });

                return deferred.promise;
            };
            return factory;
        }]);
})();
