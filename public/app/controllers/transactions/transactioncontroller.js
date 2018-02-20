(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('transactioncontroller', controller);

    controller.$inject = ['$scope'];

    function controller($scope) {

        activate();

        function activate() { }
    }
})();