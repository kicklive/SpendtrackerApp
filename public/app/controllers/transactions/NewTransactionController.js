(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('NewTransactionController', CreateTransaction)

    CreateTransaction.$inject = ['$scope', '$location', 'transactionservice', 'notifierService', '$route', '$filter', '$stateParams', '$state', 'storageservice'];

    function CreateTransaction($scope, $location, transactionservice, notifierService, $route, $filter, $stateParams, $state, storageservice) {

        activate();

        function activate() {
            //var tranId=$scope.id;
            // $scope.id = $route.current.pathParams.budgetId;
            if ($stateParams.transId) {
                transactionservice.GetTransactionData($stateParams.transId).then(function(data) {
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
            $scope.budgetId = $stateParams.budgetId
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
                    transId:$stateParams.transId,
                    budgetId: $stateParams.budgetId
                }
                if ($stateParams.transId != undefined && $stateParams.transId != null) {

                    transactionservice.SaveTransaction($scope.newTransaction).then(function(ret) {
                        if (ret.data == "success") {
                            storageservice.clear();
                            // $location.path("/Details/" + $route.current.pathParams.budgetId);
                            $state.go("details", { budgetId: $stateParams.budgetId });
                            notifierService.notify = "Transaction updated successfully";
                        }

                    })


                } else {
                    transactionservice.addTransaction($scope.newTransaction).then(function(data) {
                        if (data == null) {
                            notifierService.error = "There was an issue saving this transaction. Contact Administrator."
                        } else {
                            // dataShare.sendData(data);
                            //$location.path("/Details/" + $scope.id);
                            //$location.path("/Details/" + $stateParams.budgetId);
                            storageservice.clear();
                            $state.go("details", { budgetId: $stateParams.budgetId });
                            notifierService.notify = "Transaction saved successfully";
                        }

                    });
                }

            }
            $scope.DeleteTransaction = function() {
                transactionservice.DeletTransaction($stateParams.transId).then(function(ret) {
                    if (ret == "success") {
                        notifierService.notify = "Transaction deleted successfully";
                        storageservice.clear();
                        $state.go("details", { budgetId: $stateParams.budgetId });
                        //$location.path("/Details/" + $stateParams.budgetId);
                    }

                })
            }


        }
    }
})();