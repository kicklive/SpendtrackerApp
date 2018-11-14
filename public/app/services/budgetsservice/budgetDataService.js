(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('budgetservice', BudgetData);

    BudgetData.$inject = ['$http', '$q', 'storageservice'];

    function BudgetData($http, $q, storageservice) {
        var service = {
            getBudgetList: getData,
            saveBudget: saveBudgetData,
            getBudgetDetails: GetBudgetDetails,
            updateStatus: UpdateBudgetStatus,
            budgetStatus: CheckStatus
                // CheckAndUpdate: CheckAndUpdateStatus

        };

        return service;

        function getData() {
            storageservice.clear()
            return $http.get('/data/budgetlist').then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                //debugger;
                return 'Error ' + err;
            }
            // var deferred = $q.defer();
            // var httpPromise = $http.get('/data/budgetlist');
            // var d;
            // httpPromise.then(success, failure);

            // function success(data) {
            //     // CheckStatus();
            //     d = data;
            //     deferred.resolve(d);
            // }

            // function failure(err) {
            //     console.error('Error ' + err);
            //     deferred.reject();
            // }
            // return deferred.promise;
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
            return $http.get("/data/getdetails/", { params: { id: budgetId } }).then(success, failure);

            function success(data) {
                //debugger;
                return data;
            }

            function failure(err) {
                //debugger;
                return 'Error ' + err;
            }

            // var deferred = $q.defer();
            // var httpPromise = $http.get("/data/getdetails/", { params: { id: budgetId } });
            // httpPromise.then(success, failure);

            // function success(data) {
            //     deferred.resolve(data);
            // }

            // function failure(err) {
            //     console.error('Error ' + err);
            // }
            // return deferred.promise
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
            return $http.put('/data/updatestatusall').then(success, failure);

            // var httpPromise = $http.put("/data/updatestatusall/");
            // httpPromise.then(success, failure);

            function success(data) {
                //deferred.resolve(data);
                return data;
            }

            function failure(err) {
                //console.error('Error ' + err);
                return 'Error ' + err;
            }
            //return deferred.promise
        }

        function CheckAndUpdateStatus(budgetList) {
            return $http.put('/data/updatestatusall').then(success, failure);

            function success(data) {
                //deferred.resolve(data);
                return 'success';
            }

            function failure(err) {
                //console.error('Error ' + err);
                return 'Error ' + err;
            }
        }
    }
})();