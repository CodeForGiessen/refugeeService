(function() {
    'use strict';
    angular.module('refugeeAuthorEnv')
        .controller('DashboardCtrl', ['$scope', '$document', 'GuideCrudService', 'CategoryCrudService',
            function($scope, $document, GuideCrudService, CategoryCrudService) {

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
            }
        ]);
})();
