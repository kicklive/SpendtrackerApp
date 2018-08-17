(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('BudgetTrendsController', BudgetTrends)

    BudgetTrends.$inject = ['BudgetTrendsService', '$stateParams'];

    function BudgetTrends(BudgetTrendsService, $stateParams) {
        /* jshint validthis:true */
        var vm = this;
        vm.budgetId = $stateParams.budgetId;
        vm.TopActivity = [];
        vm.MostPurchased = [];

        activate();

        function activate() {
            BudgetTrendsService.GetTrends().then(function(ret) {
                debugger
                vm.TopActivity = ret;
                // BudgetTrendsService.GetMostPurchasedItem().then(function(retItems) {
                //     vm.MostPurchased = retItems;
                // });
            });
        }
    }
})();