(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('DateCountService', DateCount)



    function DateCount() {
        var service = {
            getDays: CalculateDays
        };

        return service;

        function CalculateDays(fromDate, toDate) {
            return Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000))
        }
    }
})();