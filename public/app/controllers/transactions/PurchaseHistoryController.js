(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('PurchaseHistoryController', PurchaseHistory)

    PurchaseHistory.$inject = ['$location'];

    function PurchaseHistory($location) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            vm.search = '';
            vm.serchBy = ''
            vm.isDdate = false

            vm.ShowDate = function(v) {
                debugger;
                vm.isDdate = v;
            }
        }
    }
})();