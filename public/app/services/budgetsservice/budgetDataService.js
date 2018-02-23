(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('budgetservice', BudgetData);

    BudgetData.$inject = ['$http', '$q'];

    function BudgetData($http, $q) {
        var service = {
            getBudgetList: getData,
            saveBudget: saveBudgetData,
            getBudgetDetails: GetBudgetDetails
        };

        return service;

        function getData() {
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

    }
})();