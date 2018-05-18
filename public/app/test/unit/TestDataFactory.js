(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('DummyDataService', DummyData)

    DummyData.$inject = ['$http'];

    function DummyData($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {
            var items = {};
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
            return itemList;
        }
    }
})();