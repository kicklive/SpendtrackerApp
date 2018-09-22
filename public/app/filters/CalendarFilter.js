(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .filter('MonthFltr', MonthName)

    function MonthName() {

        return MonthFltrFilter;

        function MonthFltrFilter(input) {
            debugger;
            var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return month[input - 1];
        }
    }

}());