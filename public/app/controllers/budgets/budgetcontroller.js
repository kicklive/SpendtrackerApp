(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('budgetcontroller', StartBudget);

    StartBudget.$inject = ['$scope', '$location', 'budgetservice'];

    function StartBudget($scope, $location, budgetservice) {
        $scope.ret = null;
        $scope.date = null;
        activate(budgetservice);
        if ($scope.ret == null && $scope.date == null)
            $location.path("/");
        else
            $location.path("/NewBudget");

        function activate(budgetservice) {
            return budgetservice.getBudgetList().then(function(data) {
                $scope.ret = {
                    data: data
                };
                // $scope.date='1/1/2018';
                return $scope;
            });
        }
    }
})();



// angular
//         .module('spendtrackerapp')
//         .controller('budgetcontroller', function($scope,$location,budgetservice){
//         $scope.ret=null;
//         budgetservice.getBudgetList().then(function(data){
//                 $scope.ret={
//                     data:data
//                 };}
//             );
//             if($scope.ret==null)
//             $location.path("/");
//         });