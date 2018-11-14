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
            SaveTransaction: SaveModifiedTrans,
            DeleteTrans: DeleteTransaction
        };

        return service;

        function AddTransaction(formData) {
            return $http.post('/data/SaveTransaction', formData).then(success, failure);

            function success(data) {
                return data;
            }

            function failure(err) {
                return 'Error ' + err;
            }
            // var deferred = $q.defer();
            // var httpPromise = $http.post("/data/SaveTransaction", formData);
            // httpPromise.then(success, failure);

            // function success(data) {
            //     deferred.resolve(data);
            // }

            // function failure(err) {
            //     console.error('Error ' + err);
            // }
            // return deferred.promise
        }

        function GetTransData(tranId) {
            return $http.get('/data/gettrandetails/', { params: { id: tranId } }).then(success, failure);

            function success(data) {
                return data;
            }

            function failure(err) {
                return 'Error ' + err;
            }
            // var deferred = $q.defer();
            // var httpPromise = $http.get("/data/gettrandetails/", { params: { id: tranId } });
            // httpPromise.then(success, failure);

            // function success(data) {
            //     deferred.resolve(data);
            // }

            // function failure(err) {
            //     console.error('Error ' + err);
            // }
            // return deferred.promise
        }

        function SaveModifiedTrans(formData) {
            return $http.put('/data/updatetransaction', formData).then(success, failure);

            function success(data) {
                return data;
            }

            function failure(err) {
                return 'Error ' + err;
            }

            // var deferred = $q.defer();
            // var httpPromise = $http.put("/data/updatetransaction", formData);
            // httpPromise.then(success, failure);

            // function success(data) {
            //     deferred.resolve(data);
            // }

            // function failure(err) {
            //     console.error('Error ' + err);
            // }
            // return deferred.promise
        }

        function DeleteTransaction(tranId) {
            return $http.get('/data/deletetransaction/', { params: { id: tranId } }).then(success, failure);

            function success(data) {
                //debugger;
                return data;
            }

            function failure(err) {
                //debugger;
                return 'Error ' + err;
            }
        }
    }
})();