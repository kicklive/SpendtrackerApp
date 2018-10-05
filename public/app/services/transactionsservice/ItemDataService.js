(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('itemservice', Items);

    Items.$inject = ['$http', '$q'];

    function Items($http, $q) {
        var service = {
            GetItem: SearchForItem,
            SearchForAllProduct: GetAllProducts,
            Save: AddNewProduct
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
            var httpPromise = $http.put("/data/updatetransaction", formData);
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
            var httpPromise = $http.get("/data/deletetransaction", { params: { id: tranId } });
            httpPromise.then(success, failure);

            function success(data) {
                deferred.resolve(data);
            }

            function failure(err) {
                console.error('Error ' + err);
            }
            return deferred.promise
        }

        function SearchForItem(upc) {

            return $http.get('/data/itemsearch', { params: { id: upc } }).then(success, failure);

            function success(d) {
                debugger;
                return d;
            }

            function failure(err) {
                debugger;
                return err.status;
            }
        }

        function GetAllProducts(upc) {

            return $http.get('/data/searchallitems').then(success, failure);

            function success(d) {
                ////debugger;
                return d;
            }

            function failure(err) {
                return 'Error ' + err;
            }
        }

        function AddNewProduct(formData) {
            return $http.post('/data/addproduct', formData).then(success, failure);

            function success(d) {
                debugger;
                return d;
            }

            function failure(err) {
                debugger;
                return 'Error ' + err;
            }
        }


    }
})();