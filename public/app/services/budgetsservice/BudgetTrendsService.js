(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('BudgetTrendsService', BudgetTrends)

    BudgetTrends.$inject = ['$http', 'DataCalculationService'];

    function BudgetTrends($http, DataCalculationService) {
        var service = {
            GetTrends: GetDataAll,
            GetTrendsByMonoth: GetDataByMonth
                // _massageData: MassageData
                //GetMostPurchasedItem: GetPurchaseTrends
        };

        return service;

        function GetDataAll() {
            //debugger;
            return $http.get('/data/Trends').then(success, failure);

            function success(d) {
                //debugger;
                return DataCalculationService.getTrendCal(d.data[0], 0, null);
                //return d.data[0];
            }

            function failure(err) {
                //debugger;
                return err.data.message;
            }
        }

        function GetDataByMonth(m) {
            //debugger;
            // return $http.get('/data/TrendsByMonth').then(success, failure);
            return $http.get('/data/TrendsByMonth', { params: { m: m } }).then(success, failure).catch(angular.noop);

            function success(d) {
                //debugger;
                return DataCalculationService.getTrendCal(d.data[0], 1, m);
            }

            function failure(err) {
                //debugger;
                return 'There was an retrieving data. Contact Administrator.' + err;
            }
        }

        function GetMostPurchasedItem() {
            //debugger;
            return $http.get('/data/PurhaseTrends').then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                //debugger;
                return 'Error ' + err;
            }
        }


    }


})();