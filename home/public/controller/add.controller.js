(function () {
    angular.module('refugeeAuthorEnv')
        .controller('AddController', ['$document', '$timeout', 'CategoryCrudService', 'GuideCrudService',
            function ($document, $timeout, CategoryCrudService, GuideCrudSerive) {
                var that = this;
                this.categories= {};
                CategoryCrudService.read()
                    .then(function (data) {
                        console.log(data);
                        var lang = window.localStorage.getItem('lang');
                        that.categories = data;
                        that.categories.forEach(function (elt) {
                            $document.find('select#categoryselect').append(
                                "<option value='"+elt._id+"'>"+elt.text[lang]+"</option>"
                            );
                        });
                        $document.find('select#categoryselect').material_select();
                    });
                $document.ready(function () {
                    setTimeout(function () {
                        $document.find('ul.tabs').tabs();
                        //$document.find('select#categoryselect').material_select();
                        $document.find('select').material_select();
                        $document.find('select').material_select();
                    }, 0);
                });
                this.saveGuide = function () {
                    var guide = that.guideline;
                    guide.published = false;
                    guide.guidelines = [];
                    guide.guidelines.push(that.guidelines);
                    guide.langs = [];
                    guide.langs.push(that.guidelines.lang);
                    console.log(guide);
                    GuideCrudSerive.create(guide);
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