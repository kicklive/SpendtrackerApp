(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('NewTransactionController', CreateTransaction)

    CreateTransaction.$inject = ['$scope', '$location', 'transactionservice', 'notifierService', '$route', '$filter'];

    function CreateTransaction($scope, $location, transactionservice, notifierService, $route, $filter) {

        activate();

        function activate() {
            //var tranId=$scope.id;
            // $scope.id = $route.current.pathParams.budgetId;
            if ($route.current.pathParams.transId) {
                transactionservice.GetTransactionData($route.current.pathParams.transId).then(function(data) {
                    if (data.data == null) {
                        notifierService.error = "There was an retrieving data. Contact Administrator."
                    } else {
                        $scope.transdate = $filter('date')(data.data.transdate, "MM/dd/yyyy");
                        $scope.transamt = parseFloat(data.data.itemprice).toFixed(2);
                        $scope.upc = data.data.upc;
                        $scope.store = data.data.store;
                        $scope.itemDescription = data.data.itemdescription;
                    }
                });
            }
            $scope.ClearForm = function() {
                $scope.transamt = '';
                $scope.transdate = '',
                    $scope.upc = '';
                $scope.itemDescription = '';
                $scope.store = '';
            }
            $scope.AddTransaction = function() {
                $scope.newTransaction = {
                    transAmt: $scope.transamt,
                    upc: $scope.upc,
                    transDate: $scope.transdate,
                    itemDesc: $scope.itemDescription,
                    store: $scope.store,
                    //budgetId: $scope.id
                    budgetId: $route.current.pathParams.budgetId
                }
                transactionservice.addTransaction($scope.newTransaction).then(function(data) {
                    if (data == null) {
                        notifierService.error = "There was an issue saving this transaction. Contact Administrator."
                    } else {
                        // dataShare.sendData(data);
                        //$location.path("/Details/" + $scope.id);
                        $location.path("/Details/" + $route.current.pathParams.budgetId);
                        notifierService.notify = "Transaction saved successfully";
                    }

                });
            }
            $scope.DeleteTransaction = function() {
                transactionservice.DeletTransaction($route.current.pathParams.transId).then(function(ret) {
                    if (ret == "success") {
                        notifierService.notify = "Transaction deleted successfully";
                        $location.path("/Details/" + $route.current.pathParams.budgetId);
                    }

                })
            }

        }
    }
})();