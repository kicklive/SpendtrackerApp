(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('budgetcontroller', StartBudget);

    StartBudget.$inject = ['$scope', '$location', 'budgetservice', 'dataShare'];

    function StartBudget($scope, $location, budgetservice, dataShare) {
        $scope.ret = null;
        $scope.date = null;
        activate(budgetservice);


        function activate() {
            // return budgetservice.getBudgetList().then(function(data) {
            //     $scope.ret = {
            //         data: data
            //     };
            //     // $scope.date='1/1/2018';
            //     if ($scope.ret.data.data.length == 0) {
            //         $location.path("/");
            //     } else {
            //         dataShare.sendData($scope.ret.data);
            //         $location.path("/ListBudgets");
            //     }
            //     // return $scope;
            // });
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