(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('itemservice', Items);

        Items.$inject = ['$http', '$q'];

    function Items($http, $q) {
        var service = {
            GetItem: SearchForItem
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

        function SaveModifiedTrans(formData) {
            var deferred = $q.defer();
            var httpPromise = $http.put("/data/updatetransaction",formData);
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }
        function DeleteTransaction(tranId) {
            var deferred = $q.defer();
            var httpPromise = $http.get("/data/deletetransaction",{ params: { id: tranId } });
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