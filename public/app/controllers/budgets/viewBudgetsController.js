(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ViewBudgetController', ViewBudgets)

        ViewBudgets.$inject = ['$scope','dataShare'];

    function ViewBudgets($scope,dataShare) {

        activate();

        function activate() {
            getData();

         
         }
         function getData(){
             $scope.$on('data_shared',function(){
                 var data=dataShare.getData();
                 $scope._id=data[1]._id,
                 $scope.startDate=data[1].BudgetStartDate,
                 $scope.endDate=data[1].BudgetEndDate,
                 $scope.budgetAmount=data[1].BudgetAmount
             })
             $scope.$emit('initiateEvent', null); 
         }

         
    }
})();