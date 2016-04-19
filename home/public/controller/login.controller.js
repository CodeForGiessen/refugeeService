(function() {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('LoginCtrl', ['$document', function($document) {
            this.currentTab = 1;
            this.isTab = function (tab) {
                return this.currentTab === tab;
            };
            this.setTab = function (tab) {
                this.currentTab = tab;
            };
            
            $document.ready(function () {
                $document.find('ul.tabs').tabs();
            });
        }]);
})();
