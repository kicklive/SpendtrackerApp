(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('newbudgetcontroller', NewBudget)

    NewBudget.$inject = ['$scope', '$location', 'budgetservice', 'notifierService', 'dataShare','storageservice'];

    function NewBudget($scope, $location, budgetservice, notifierService, dataShare,storageservice) {
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

        // activate();



        function activate() {
            budgetservice.saveBudget($scope.formData).then(function(data) {
                console.log('budget saved');
                if (data == null) {

                    notifierService.error = "There was an issue saving this budget. Contact Administrator."
                } else {
                    storageservice.remove("budgets");
                    dataShare.sendData(data);
                    $location.path("/ListBudgets");
                    notifierService.notify = "Budget saved successfully";
                }

            });
        }
    }
})();