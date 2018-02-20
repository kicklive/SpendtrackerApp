(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('transactionfactory', factory);

    factory.$inject = ['$http'];

    function transactionfactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData($resource) {

         }
    }
})();