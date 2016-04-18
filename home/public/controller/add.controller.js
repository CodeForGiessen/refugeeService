(function () {
    angular.module('refugeeAuthorEnv')
        .controller('AddController', ['$document', function ($document) {
            $document.ready(function () {
                $document.find('ul.tabs').tabs();
                $document.find('select').material_select();
                $document.find('select').material_select();
                $document.find('select').material_select();
            });

        }]);
})();