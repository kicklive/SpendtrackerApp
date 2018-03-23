(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('transactionservice', Transactions);

    Transactions.$inject = ['$http', '$q'];

    function Transactions($http, $q) {
        var service = {
            addTransaction: AddTransaction,
            GetTransactionData: GetTransData,
            SaveTransaction: SaveModifiedTrans
        };

        return service;

        function AddTransaction(formData) {
            var deferred = $q.defer();
            var httpPromise = $http.post("/data/SaveTransaction", formData);
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }

        function GetTransData(tranId) {
            var deferred = $q.defer();
            var httpPromise = $http.get("/data/gettrandetails/", { params: { id: tranId } });
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }

        function SaveModifiedTrans(tranId) {
            var deferred = $q.defer();
            var httpPromise = $http.put("/data/updatetransaction/" + tranId);
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }


    }
})();