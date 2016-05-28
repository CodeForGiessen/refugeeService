(function() {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('DashboardCtrl', ['$scope', '$document', 'GuideCrudService', 'CategoryCrudService', 'UserCrudService',
            function($scope, $document, GuideCrudService, CategoryCrudService, UserCrudService) {
                $scope.notPublished = [];
                $scope.users = [];
                $scope.guidelines = [];
                $scope.categories = [];
                $scope.guidelinesComp = [];
                $scope.lang = localStorage.getItem('lang');

                GuideCrudService.read().then(function(data){
                    $scope.notPublished = data.map(function(guide){
                        var filteredGuidelines = guide.guidelines.filter(function(guideline){
                            return !guideline.published;
                        });
                        return filteredGuidelines.map(function(guideline){
                            return {
                                _id: guide._id,
                                lang: guideline.lang,
                                text: guideline.text
                            };
                        });
                    }).reduce(function(prev, cur){
                        return prev.concat(cur);
                    });

                    $scope.guidelines = data.filter(function(elt){
                        return elt.langs.indexOf($scope.lang) === -1;
                    });

                    $scope.guidelinesComp = data;
                });

                CategoryCrudService.read().then(function(data){
                    $scope.categories = data.filter(function(elt){
                        return elt.text[$scope.lang] === undefined;
                    });
                });

                UserCrudService.readUsernames().then(function(data){
                    $scope.users = data.map(function(username){
                        var numOfTranslations = $scope.guidelinesComp.reduce(function(prev, cur, idx, guides){
                            return prev + cur.guidelines.reduce(function(prev, cur, idx, guidelines){
                                    if(cur.metadata.author.username === username) {
                                        return prev + 1;
                                    } else {
                                        return prev;
                                    }
                                }, 0);
                        }, 0);
                        return {
                            username: username,
                            translations: numOfTranslations
                        };
                    });
                    $scope.users.sort(function(a, b){
                        if(a.translations < b.translations) {
                            return 1;
                        }
                        if(a.translations > b.translations) {
                            return -1;
                        }
                        return 0;
                    });
                });

                google.charts.setOnLoadCallback(function () {
                    console.log('drawPieChart');
                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Work', 11],
                        ['Eat', 2],
                        ['Commute', 1],
                        ['TV', 3],
                        ['Internet', 5],
                        ['Sleep', 2]
                    ]);

                    var options = {
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('guidelangchart'));

                    chart.draw(data, options);
                });

                $scope.getLangCodes = function(obj) {
                    return Object.keys(obj).join(", ");
                };
            }
        ]);
})();
