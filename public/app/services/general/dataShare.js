(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('dataShare', ShareData)

        ShareData.$inject = ['$http','$rootScope'];

    function ShareData($http,$rootScope) {
        var service = {
            data:{},
            sendData:sendData,
            getData: getData
        };

        return service;

        function getData() {
            return service.data;
         }

        function sendData(d){
            service.data=d;
            $rootScope.$on('initiateEvent',function(){
                $rootScope.$broadcast('data_shared');

            })
            

        }
    }
})();