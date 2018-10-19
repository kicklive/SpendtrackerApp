(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('NewTransactionController', CreateTransaction)

    CreateTransaction.$inject = ['$scope', '$location', 'transactionservice', 'notifierService', '$route', '$filter', '$stateParams', '$state', 'storageservice', 'itemservice'];

    function CreateTransaction($scope, $location, transactionservice, notifierService, $route, $filter, $stateParams, $state, storageservice, itemservice) {

        activate();

        function activate() {

            //var tranId=$scope.id;
            // $scope.id = $route.current.pathParams.budgetId;
            $scope.isExisting = $stateParams.isExisting;
            if ($stateParams.transId) {
                transactionservice.GetTransactionData($stateParams.transId).then(function(data) {
                    if (data.data == null) {
                        notifierService.error("There was an retrieving data. Contact Administrator.");
                    } else {
                        $scope.transdate = $filter('date')(data.data.transdate, "MM/dd/yyyy");
                        $scope.Price = parseFloat(data.data.itemprice).toFixed(2);
                        $scope.UPC = data.data.upc;
                        $scope.store = data.data.store;
                        $scope.ItemDescription = data.data.itemdescription;
                    }
                });
            }
            $scope.budgetId = $stateParams.budgetId
            $scope.ClearForm = function() {
                $scope.Price = '';
                $scope.transdate = '',
                    $scope.UPC = '';
                $scope.ItemDescription = '';
                $scope.store = '';

            }
            $scope.AddTransaction = function() {
                $scope.newTransaction = {
                    transAmt: $scope.Price,
                    upc: $scope.UPC,
                    transDate: $scope.transdate,
                    itemDesc: $scope.ItemDescription,
                    store: $scope.store,
                    transId: $stateParams.transId,
                    budgetId: $stateParams.budgetId
                }
                if ($stateParams.transId != undefined && $stateParams.transId != null) {

                    transactionservice.SaveTransaction($scope.newTransaction).then(function(ret) {
                        if (ret.data == "success") {
                            storageservice.clear();
                            // $location.path("/Details/" + $route.current.pathParams.budgetId);
                            $state.go("details", { budgetId: $stateParams.budgetId });
                            notifierService.notify("Transaction updated successfully");
                        }

                    })


                } else {
                    transactionservice.addTransaction($scope.newTransaction).then(function(data) {
                        if (data == null) {
                            notifierService.error("There was an issue saving this transaction. Contact Administrator.");
                        } else {
                            // dataShare.sendData(data);
                            //$location.path("/Details/" + $scope.id);
                            //$location.path("/Details/" + $stateParams.budgetId);
                            storageservice.clear();
                            $state.go("details", { budgetId: $stateParams.budgetId });
                            notifierService.notify("Transaction saved successfully");
                        }

                    });
                }

            }
            $scope.DeleteTransaction = function() {
                debugger;
                transactionservice.DeleteTrans($stateParams.transId).then(function(ret) {
                    debugger;
                    if (ret.status == 200 && ret.data == "success") {
                        storageservice.remove($stateParams.budgetId)
                        notifierService.notify("Transaction deleted successfully");
                        storageservice.clear();
                        $state.go("details", { budgetId: $stateParams.budgetId });
                        //$location.path("/Details/" + $stateParams.budgetId);
                    } else {
                        notifierService.error("There was a problem deleting this record. Contact Administrator " + ret.message);
                    }

                })
            }
            $scope.EvalUPC = function() {
                if ($scope.UPC != null && $scope.UPC.length === 12) {
                    debugger;
                    itemservice.GetItem($scope.UPC).then(function(ret) {

                        if (ret.data != null) {
                            $scope.ItemDescription = ret.data.ItemDescription;
                            $scope.Price = ret.data.Price;
                            $scope.disabled = true;
                        }
                    });
                } else {
                    $scope.disabled = false;
                }
            }


        }
    }
})();