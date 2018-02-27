(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('transactionservice', Transactions);

        Transactions.$inject = ['$http','$q'];

    function Transactions($http,$q) {
        var service = {
            addTransaction: AddTransaction
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
    }
})();