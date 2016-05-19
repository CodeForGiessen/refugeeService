(function(){
    'use strict';
    angular.module('refugeeAuthorEnv')
    .controller('UserDetailController', [
        '$scope', '$document','$timeout', 'UserCrudService',
        function($scope, $document, $timeout, UserCrudService){
            $document.ready(function () {

                $document.find('#dropdown_btn').addClass('orange');
            });
            $scope.users = {};
            this.userProfile = JSON.parse(localStorage.getItem('profile'));
            if(this.userProfile.role > 1) {
                UserCrudService.read()
                    .then(function(users){
                        $scope.users = users;
                        $document.find('.dropdown-button').dropdown({
                            inDuration: 300,
                            outDuration: 200,
                            alignment: 'right',
                            constrain_width: false
                        });
                    });
            }
            this.getRole = function (role) {
                switch (role){
                    case 0: return "Newbie";
                    case 1: return "Editor";
                    case 2: return "Moderator";
                    case 3: return "Administrator";
                    default: return "Uh.. Something went wrong... :o";
                }
            };
        }
    ])
    .directive('dropdownDirective', function() {
        return {
            link: function(scope, elt, attrs) {
                elt.children('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 200,
                    alignment: 'right'
                });
            }
        };
    });
})();
