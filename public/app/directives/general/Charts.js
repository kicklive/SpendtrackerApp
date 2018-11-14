(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('SpendCharts', STCharts);

    STCharts.$inject = ['$window'];

    function STCharts($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            template: '<div></div>',
            restrict: 'E',
            data: '='
        };
        return directive;

        function link(scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }
    }

})();