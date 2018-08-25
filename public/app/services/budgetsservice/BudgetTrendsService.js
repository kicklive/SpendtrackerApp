(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('BudgetTrendsService', BudgetTrends)

    BudgetTrends.$inject = ['$http', 'DataCalculationService'];

    function BudgetTrends($http, DataCalculationService) {
        var service = {
            GetTrends: GetDataAll,
            // _massageData: MassageData
            //GetMostPurchasedItem: GetPurchaseTrends
        };

        return service;

        function GetDataAll() {
            debugger;
            return $http.get('/data/Trends').then(success, failure);

            function success(d) {
                debugger;
                return DataCalculationService.getTrendCal(d.data);
            }

            function failure(err) {
                debugger;
                return err.data.message;
            }
        }

        function GetMostPurchasedItem() {
            debugger;
            return $http.get('/data/PurhaseTrends').then(success, failure);

            function success(d) {
                debugger;
                return d;
            }

            function failure(err) {
                debugger;
                return 'Error ' + err;
            }
        }


    }


})();