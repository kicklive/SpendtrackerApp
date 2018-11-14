(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('monthpkr', SetMonth);

    //SetMonth.$inject = ['$window'];

    function SetMonth() {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            restrict: 'A',
            template: '<option value="1">January</option>' +
                '<option value="2">Feburay</option>' +
                '<option value="3">March</option>' +
                '<option value="4">April</option>' +
                '<option value="5">May</option>' +
                '<option value="6">June</option>' +
                '<option value="7">July</option>' +
                '<option value="8">Aug<ust/option>' +
                '<option value="9">September</option>' +
                '<option value="10">October</option>' +
                '<option value="11">November</option>' +
                '<option value="12">December</option>'
        };
        return directive;


    }

})();