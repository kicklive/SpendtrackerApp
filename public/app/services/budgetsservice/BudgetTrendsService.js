(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('BudgetTrendsService', BudgetTrends)

    BudgetTrends.$inject = ['$http'];

    function BudgetTrends($http) {
        var service = {
            GetTrends: GetDataAll,
            //GetMostPurchasedItem: GetPurchaseTrends
        };

        return service;

        function GetDataAll() {
            debugger;
            return $http.get('/data/Trends').then(success, failure);

            function success(d) {
                return MassageData(d.data);
            }

            function failure(err) {
                debugger;
                return 'Error ' + err;
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


    function MassageData(data) {
        var comma = "";
        var stringData = "";
        var numberOfVisits = data[0].count;
        for (var i = 0, len = data.length; i < len; i++) {
            if (len > 0 && (i + 1) != len)
                comma = "; ";
            else
                comma = "";
            stringData = stringData + data[i]._id + ' Total Spent: $' + data[i].itemprice + comma;
        }
        return {
            'storeinfo': stringData,
            'visits': numberOfVisits,
        }
    }
})();