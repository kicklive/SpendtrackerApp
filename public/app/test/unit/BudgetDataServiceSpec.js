(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('budgetservicespec', BudgetData);

    BudgetData.$inject = ['$http', '$q', 'storageservicespec'];

    function BudgetData($http, $q, storageservice) {
        var service = {
            getBudgetList: getData,
            saveBudget: saveBudgetData,
            getBudgetDetails: GetBudgetDetails,
            updateStatus: UpdateBudgetStatus,
            budgetStatus: CheckStatus

        };

        return service;

        function getData() {
            var itemList = [{
                id: 1,
                itemdesc: 'aaa',
                itemprice: 5
            }, {
                id: 2,
                itemdesc: 'bbb',
                itemprice: 3
            }, {
                id: 3,
                itemdesc: 'ccc',
                itemprice: 7
            }, {
                id: 4,
                itemdesc: 'ddd',
                itemprice: 12
            }];
            sucess(itemList);

            function success(itemList) {
                // CheckStatus();
                d = itemList;
                deferred.resolve(d);
            }

            function failure() {
                console.error('Error');
                deferred.reject();
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
            var httpPromise = $http.put('/data/updatestatus/' + budgetId);
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }

        function CheckStatus() {
            var deferred = $q.defer();
            //var httpPromise = $http.put("/data/updatestatus/", { params: { id: budgetId } });

            success();

            function success() {
                deferred.resolve("success");
            }

            function failure() {
                console.error('Error');
            }
            return deferred.promise
        }

    }
})();