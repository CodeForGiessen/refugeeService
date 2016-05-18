(function(){
    'use strict';
    angular.module('refugeeAuthorEnv')
    .controller('UserDetailController', [
        function(){
            this.userProfile = JSON.parse(localStorage.getItem('profile'));
            this.getRole = function () {
                switch (this.userProfile.role){
                    case 0: return "Newbie";
                    case 1: return "Editor";
                    case 2: return "Moderator";
                    case 3: return "Administrator";
                    default: return "Uh.. Something went wrong... :o";
                }
            };
        }
    ]);
})();
