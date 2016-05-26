(function(){
    'use strict';
    angular.module('refugeeAuthorEnv')
    .controller('UserDetailController', [
        '$scope', '$document','$timeout', '$translate', 'UserCrudService',
        function($scope, $document, $timeout, $translate, UserCrudService){
            $scope.users = [];
            $scope.userProfile = JSON.parse(localStorage.getItem('profile')) || {_id:'',name:'',username:'',role:0};
            if($scope.userProfile.role > 1) {
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
            this.editUser = function () {
                $document.find('#usermodal').openModal({
                    dismissible: true,
                    in_duration: 200,
                    out_duration: 150,
                    ready: function() {
                        Materialize.updateTextFields();
                    },
                    complete: function() {
                        // TODO: get inputs and update user.
                        var userChanges = {
                            username: $scope.userProfile.username,
                            name: $scope.userProfile.name,
                            surname: $scope.userProfile.surname,
                            email: $scope.userProfile.email
                        };
                        UserCrudService.updateUserData($scope.userProfile._id, userChanges)
                        .then(function(user){
                            localStorage.setItem('profile', JSON.stringify($scope.userProfile));
                        }, function(err){
                            $scope.userProfile = JSON.parse(localStorage.getItem('profile')) || {_id:'',name:'',username:'',role:0};
                            $scope.userProfile.surname = $scope.userProfile.name.split(' ')[1];
                            $scope.userProfile.name = $scope.userProfile.name.split(' ')[0];
                        });
                    }
                });
            };
            this.adjustRole = function (index) {
                console.log("adjust role\n", index, $scope.users[index]);
                var oldRole = $scope.users[index].role;
                $document.find('#rolemodal').openModal({
                    dismissible: true,
                    in_duration: 200,
                    out_duration: 150,
                    ready: function(){
                        switch(oldRole) {
                            case 'newbie': $document.find('#r1').attr('checked',true);break;
                            case 'editor': $document.find('#r2').attr('checked',true);break;
                            case 'mod': $document.find('#r3').attr('checked',true);break;
                            case 'admin': $document.find('#r4').attr('checked',true);break;
                        }
                    },
                    complete: function(){
                        var newRole = $document.find('input[name="grp1"]:checked').val();
                        if(newRole !== oldRole) {
                            $scope.users[index].role = newRole;
                            UserCrudService.updateUserRole($scope.users[index]._id, newRole).then(function(user){
                                if($scope.users[index]._id === $scope.userProfile._id){
                                    switch($scope.users[index].role) {
                                        case 'newbie': $scope.userProfile.role = 0; break;
                                        case 'editor': $scope.userProfile.role = 1; break;
                                        case 'mod': $scope.userProfile.role = 2; break;
                                        case 'admin': $scope.userProfile.role = 3; break;
                                    }
                                    localStorage.setItem('profile', JSON.stringify($scope.userProfile));
                                }
                                Materialize.toast($translate.instant('USERCTRL_ADJROLESUCC',{username: $scope.users[index].username, role: newRole}), 3000);
                            }, function(error){
                                $scope.users[index].role = oldRole;
                                Materialize.toast($translate.instant('USERCTRL_ADJROLEERR',{username: $scope.users[index].username, role: oldRole}), 3000);
                            });
                        }
                    }
                });
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
