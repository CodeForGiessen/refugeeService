(function() {
    angular.module('refugeeAuthorEnv')
        .controller('NavigationController', ['$document', function($document) {
            $document.ready(function() {
                $document.find('.button-collapse').sideNav();
            });
        }]);
})();
