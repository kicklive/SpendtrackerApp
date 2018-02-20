(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('budgetservice', GetBudgetData);

    GetBudgetData.$inject = ['$http', '$q'];

    function GetBudgetData($http, $q) {
        var service = {
            getBudgetList: getData,
            saveBudget: saveBudgetData
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



            // httpPromise.then(function(data){
            //     deferred.resolve(data);

            // })
            // .error(function(err){
            //     console.error('Error '+err);

            // });

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
    }
})();