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
        //vm.TopActivity = [];
        vm.Activity;
        vm.MostPurchased = [];
        vm.Message = ''
        vm.ShowMessage = true;

        activate();

        function activate() {


            vm.Search = function() {
                //debugger;
                switch (vm.rdoTrends) {
                    case "all":
                        vm.GetAllTrends();
                        break;
                    case "bymonth":
                        vm.GetTrendsByMonth();
                        break;
                    default:
                        notifierService.warning("Please select a search method.");
                }
            };
            vm.GetAllTrends = function() {
                BudgetTrendsService.GetTrends().then(function(ret, err) {
                    debugger
                    if (ret != -1) {
                        vm.ShowMessage = false;
                        vm.Activity = ret;
                    } else {
                        vm.Message = 'There are no tranactions available.'

                        // BudgetTrendsService.GetMostPurchasedItem().then(function(retItems) {
                        //     vm.MostPurchased = retItems;
                        // });
                    }
                });
            };
            vm.GetTrendsByMonth = function() {
                debugger;
                var month = vm.month;
                BudgetTrendsService.GetTrendsByMonoth(month).then(function(ret, err) {
                    debugger
                    if (ret != -1) {
                        vm.ShowMessage = false;
                        vm.Activity = ret;
                    } else {
                        vm.Message = 'There are no tranactions available.'

                        // BudgetTrendsService.GetMostPurchasedItem().then(function(retItems) {
                        //     vm.MostPurchased = retItems;
                        // });
                    }
                });
            };
            vm.AddBold = function(s) {
                if (typeof s != 'undefined')
                    return s.replace('Total Spent:', "<span style='font-weight:bold;>xxx</span>");
            }
        }


    }
})();