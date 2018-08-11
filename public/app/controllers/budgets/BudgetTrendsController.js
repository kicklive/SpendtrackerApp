(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('BudgetTrendsController', BudgetTrends)

    BudgetTrends.$inject = ['$location', 'BudgetTrendsService', '$stateParams']

    function BudgetTrends($location, BudgetTrendsService, $stateParams) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            vm.budgetId = $stateParams.budgetId;
            vm.GetTrends = function() {

            }
        }
    }
})();