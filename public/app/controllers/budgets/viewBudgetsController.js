(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ViewBudgetController', ViewBudgets)

    ViewBudgets.$inject = ['$scope', 'dataShare', 'budgetservice', '$filter', 'STConstants'];

    function ViewBudgets($scope, dataShare, budgetservice, $filter, ) {

        activate();


        function activate() {
            getData();
        }

        var budgetData = null;

        function getData() {
          $scope.$on('data_shared', function() {
                budgetData = dataShare.getData();
                $scope.budgets = budgetData.data;
                if($scope.budgets.BudgetStatus!="Closed")
                    $scope.budgets.BudgetStatus=(CheckStatus($scope.budgets)!=null?"Closed":$scope.budgets.BudgetStatus);
                console.log("sss");
                //  $scope._id=data[1]._id,
                //  $scope.startDate=data[1].BudgetStartDate,
                //  $scope.endDate=data[1].BudgetEndDate,
                //  $scope.budgetAmount=data[1].BudgetAmount
            });
            $scope.$emit('initiateEvent', null);
            if (budgetData == null) {
                budgetservice.getBudgetList().then(function(data) {
                    $scope.budgets = data.data
                    console.log('aaa='+$scope.budgets[0].BudgetStatus);
                    if($scope.budgets[0].BudgetStatus!="Closed")
                        $scope.budgets[0].BudgetStatus=(CheckStatus($scope.budgets[0])!=null?"Closed":$scope.budgets[0].BudgetStatus);
                    console.log("second budget");
                });
            }
            
            $scope.findDiff = function(budget) {
                
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
                var toDate = new Date(budget.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                var remainingDates = 0;
                if (fromDate && toDate) {
                    // console.log(new Date(fromDate).getTime());
                    // console.log(new Date(toDate).getTime());
                     console.log(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                     remainingDates= Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                    // if(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000))>=0){
                    //     $scope.budgets["BudgetStatus"]="Closed";
                    // }
                    // else{
                    //     remainingDates= Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                    // }
                    return remainingDates;
                }
            }

            function CheckStatus(d){
                var ret=null;
                var remainingDates = 0;
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
                var toDate = new Date(d.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                if (fromDate && toDate) {
                     console.log(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                    if(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000))>=0)
                        ret= "Close";
                    return ret;
                }
            }
            $scope.CCtype
        }


    }
})();