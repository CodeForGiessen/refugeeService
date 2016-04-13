(function () {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('LoginCtrl', function () {
            this.currentTab = 2; //default value = 1
            this.setTab = function(newTab) {
                this.currentTab = newTab;
            };
            this.isTab = function (tab) {
                return this.currentTab === tab;
            }
        });
})();