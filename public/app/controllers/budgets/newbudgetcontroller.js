(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('newbudgetcontroller', NewBudget)

    NewBudget.$inject = ['$scope', '$location', 'budgetservice'];

    function NewBudget($scope, $location, budgetservice) {
        $scope.ret = null;
        $scope.AddBuget = activate(budgetservice);
        // if ($scope.ret == null && $scope.date == null)
        //     $location.path("/");
        // else
        $location.path("/NewBudget");


        function activate() {
            $scope.newbudget = {
                startDate: $scope.startdate,
                endDate: $scope.enddate,
                budgetAmt: $scope.budgetamt
            };
            budgetservice.saveBudget($scope.newbudget).then(function() {
                console.log('budget saved');
                $scope.ret = 'budget saved';
                return $scope;
            });

        }
    }
})();