(function() {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('LoginCtrl', ['$document', function($document) {
            $document.ready(function () {
                $document.find('ul.tabs').tabs();
            });
        }]);
})();
