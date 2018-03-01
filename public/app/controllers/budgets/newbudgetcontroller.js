// angular.module("spendtrackerapp").controller("newbudgetcontroller",
//     function($scope, budgetservice) {
//         $scope.addbudget = function() {
//             var newBudgetData = {
//                 startDate: $scope.startdate,
//                 endDate: $scope.enddate,
//                 budgetAmt: $scope.budgetamt
//             };
//             budgetservice.saveBudget(newBudgetData).then(function() {
//                 console.log('budget saved');
//                 $scope.ret = 'budget saved';
//                 // return $scope;
//             });
//             // alert('here');
//         }

//     });




(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('newbudgetcontroller', NewBudget)

    NewBudget.$inject = ['$scope', '$location', 'budgetservice', 'notifierService', 'dataShare'];

    function NewBudget($scope, $location, budgetservice, notifierService, dataShare) {
        $scope.ret = null;
        $scope.budgetType = {
            options: [
                { id: '1', name: 'Amex' },
                { id: '2', name: 'Visa' },
                { id: '3', name: 'Cash' },
            ],
            selectedOption: { id: '2', name: 'Visa' }
        }
        $scope.addbudget = function() {
            activate();


        }




        function activate() {


            $scope.newbudget = {
                startDate: $scope.startdate,
                endDate: $scope.enddate,
                budgetAmt: $scope.budgetamt,
                budgetCCType: $scope.budgetType.selectedOption.id
            };
            budgetservice.saveBudget($scope.newbudget).then(function(data) {
                console.log('budget saved');
                // $scope.ret = data;
                // return $scope;

                if (data == null) {

                    notifierService.error = "There was an issue saving this budget. Contact Administrator."
                } else {
                    dataShare.sendData(data);
                    $location.path("/ListBudgets");
                    notifierService.notify = "Budget saved successfully";
                }

            });
        }
    }
})();