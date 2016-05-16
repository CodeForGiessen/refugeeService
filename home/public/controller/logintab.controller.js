(function () {
    angular.module('refugeeAuthorEnv')
        .controller('LoginTabController', ['AuthService', '$scope', '$location','$translate', 
            function (AuthService, $scope, $location, $translate) {
            var that = this;
            
            this.login = function () {
                $scope.disabled = true;

                AuthService.login(that.user.username, that.user.password)
                    .then(function () {
                        $scope.disabled = false;
                        $location.path('/');
                        Materialize.toast($translate.instant('LOGINTOAST_SUCCESSMSG',{username: that.user.username}), 3000);
                        that.user = {};
                    })
                    .catch(function () {
                        $scope.disabled = false;
                        that.user = {};
                        Materialize.toast($translate.instant('LOGINTOAST_ERRORMSG'), 3000);
                    });
            };
        }]);
})();
