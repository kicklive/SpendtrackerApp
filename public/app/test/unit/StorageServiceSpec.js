(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('storageservicespec', PersistData)

    PersistData.$inject = ['$window'];

    function PersistData($window) {
        var service = {
            set: setData,
            get: getData,
            setObj: setObject,
            getObj: getObject,
            remove: removeItem,
            clear: clearStorage
        };

        return service;

        function setData(key, value) {

        }

        function getData(key, defaultValue) {
            return 'hey';
        }

        function setObject(key, value) {

        }

        function getObject(key, defaultValue) {
            return 'empty';
        }

        function removeItem(key) {

        }

        function clearStorage() {

        }
    }
})();