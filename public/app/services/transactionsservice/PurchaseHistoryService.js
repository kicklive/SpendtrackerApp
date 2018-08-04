(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('PurchaseHistoryService', PurchaseHistory)

    PurchaseHistory.$inject = ['$http'];

    function PurchaseHistory($http) {
        var service = {
            GetAll: GetAllHistory,
            GetByUPC: GetHistoryByUPC,
            GetByDates: GetHistoryByDateRange
        };

        return service;

        function GetAllHistory() {
            return $http.get('/data/AllHistory').then(success, failure);

            function success(d) {
                //debugger;
                return d.data;
            }

            function failure(err) {
                return 'Error ' + err;
            }

        }

        function GetHistoryByUPC(upc) {
            return $http.get('/data/HistoryByUPC', { params: { upc: upc } }).then(success, failure);

            function success(d) {
                //debugger;
                return d.data;
            }

            function failure(err) {
                return 'Error ' + err;
            }

        }

        function GetHistoryByDateRange(startdate, enddate) {
            return $http.get('/data/HistoryByDateRange', { params: { startdate: startdate, enddate: enddate } }).then(success, failure);

            function success(d) {
                //debugger;
                return d.data;
            }

            function failure(err) {
                return 'Error ' + err;
            }

        }
    }
})();