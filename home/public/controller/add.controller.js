(function () {
    angular.module('refugeeAuthorEnv')
        .controller('AddController', ['$document', '$timeout','CategoryCrudService', 'AuthService',
            function ($document, $timeout, CategoryCrudService, AuthService) {
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
                var guideline = that.guideline;
                var metadata = {};
                var user = AuthService.getUser();
                metadata.author.userId = user._id;
                
                guideline.published = false;
                
            };
            this.saveCategory = function () {
                var category = {};
                var text = {};
                text[that.categorylang] = that.categorytext;
                category.text = text;
                console.log(category);
                CategoryCrudService.create(category)
                    .then(function () {
                        that.categorylang = "";
                        that.categorytext = "";
                    });
            };
        }]);
})();