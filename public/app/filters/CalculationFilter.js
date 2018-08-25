(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .filter('Calculation', Calculate)

    function Calculate() {

        return Calc;

        function Calc(data, vists) {

            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var store = data.store;
            var avg = data.itemprice / visits;
            var ret = store + ' ' + avg;


            return ret;
        }
    }

}());