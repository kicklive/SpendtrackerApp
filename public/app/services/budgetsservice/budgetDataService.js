(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('budgetservice', BudgetData);

    BudgetData.$inject = ['$http', '$q','storageservice'];

    function BudgetData($http, $q,storageservice) {
        var service = {
            getBudgetList: getData,
            saveBudget: saveBudgetData,
            getBudgetDetails: GetBudgetDetails,
            updateStatus: UpdateBudgetStatus
        };

        return service;

        function getData() {
            storageservice.clear()
            var deferred = $q.defer();
            var httpPromise = $http.get('/data/budgetlist');
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise;
        }

        function saveBudgetData(formData) {
            var deferred = $q.defer();
            var httpPromise = $http.post("/data/SaveBudget", formData);
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }


        function GetBudgetDetails(budgetId) {
            var deferred = $q.defer();
            var httpPromise = $http.get("/data/getdetails/", { params: { id: budgetId } });
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }

        function UpdateBudgetStatus(budgetId) {
            var deferred = $q.defer();
            //var httpPromise = $http.put("/data/updatestatus/", { params: { id: budgetId } });
            var httpPromise = $http.put("/data/updatestatus/" + budgetId, );
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