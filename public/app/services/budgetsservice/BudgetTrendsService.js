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


    function MassageData(data) {
        var comma = '';
        var lineBreak='';
        var stringData = '';
        var spentString= 'Total Spent: $'
        var avgSpentString=''
        var numberOfVisits = data[0].count;
        for (var i = 0, len = data.length; i < len; i++) {
            if (len > 0 && (i + 1) != len){
                comma = '; ';
                lineBreak='\n';
            }
            else{
                comma = '';
                lineBreak='';
            //stringData = stringData + data[i]._id + spentString.bold() + data[i].itemprice + comma;
            stringData = stringData + data[i]._id + spentString.bold() + data[i].itemprice + lineBreak;
            //avgSpentString=avgSpentString
            }
        }
        return {
            'storeinfo': stringData,
            'visits': numberOfVisits,
            //'avgpervist'
        }
    }
})();