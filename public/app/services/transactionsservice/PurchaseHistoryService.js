(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('PurchaseHistoryService', PurchaseHistory)

    PurchaseHistory.$inject = ['$http'];

    function PurchaseHistory($http) {
        var service = {
            GetAll: GetAllHistory
        };

        return service;

        function GetAllHistory() {
            return $http.get('/data/AllHistory').then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                return 'Error ' + err;
            }

        }
    }
})();