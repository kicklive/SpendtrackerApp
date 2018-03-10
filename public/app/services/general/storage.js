// yourApp.factory('$localstorage', ['$window', function($window) {
//     return {
//       set: function(key, value) {
//         $window.localStorage[key] = value;
//       },
//       get: function(key, defaultValue) {
//         return $window.localStorage[key] || defaultValue || false;
//       },
//       setObject: function(key, value) {
//         $window.localStorage[key] = JSON.stringify(value);
//       },
//       getObject: function(key, defaultValue) {
//         if($window.localStorage[key] != undefined){
//             return JSON.parse($window.localStorage[key]);
//         }else{
//           return defaultValue || false;
//         }
//       },
//       remove: function(key){
//         $window.localStorage.removeItem(key);
//       },
//       clear: function(){
//         $window.localStorage.clear();
//       }
//     }
//   }]);

(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('storageservice', PersistData)

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
            $window.localStorage[key] = value;
        }

        function getData(key, defaultValue) {
            return $window.localStorage[key] || defaultValue || false;
        }

        function setObject(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function getObject(key, defaultValue) {
            if ($window.localStorage[key] != undefined) {
                return JSON.parse($window.localStorage[key]);
            } else {
                return defaultValue || false;
            }
        }

        function removeItem() {
            $window.localStorage.removeItem(key);
        }

        function clearStorage() {
            $window.localStorage.clear();
        }
    }
})();