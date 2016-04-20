(function () {
    angular.module('refugeeAuthorEnv')
        .controller('AddController', ['$document', '$timeout', function ($document, $timeout) {
            $document.ready(function () {
                setTimeout(function () {
                    $document.find('ul.tabs').tabs();
                    $document.find('select').material_select();
                    $document.find('select').material_select();
                    $document.find('select').material_select();
                },0);
            });

        }]);
})();