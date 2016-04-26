(function () {
    angular.module('refugeeAuthorEnv')
        .controller('AddController', ['$document', '$timeout','CategoryCrudService', function ($document, $timeout, CategoryCrudService) {
            var that = this;
            $document.ready(function () {
                setTimeout(function () {
                    $document.find('ul.tabs').tabs();
                    $document.find('select').material_select();
                    $document.find('select').material_select();
                    $document.find('select').material_select();
                },0);
            });
            this.saveGuide = function () {

            };
            this.saveCategory = function () {
                var category = {};
                var text = {};
                text[that.categorylang] = that.categorytext;
                category.text = text;
                console.log(category);
                CategoryCrudService.create(category);
            };
        }]);
})();