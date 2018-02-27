(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('NewTransactionController', CreateTransaction)

        CreateTransaction.$inject = ['$scope','$location','transactionservice','notifierService','$route'];

    function CreateTransaction($scope,$location, transactionservice, notifierService,$route) {

        activate();

        function activate() { 
            //var tranId=$scope.id;
            $scope.id=$route.current.pathParams.budgetId;
            $scope.ClearForm=function(){
                $scope.transamt='';
                $scope.transdate='',
                $scope.upc='';
                $scope.itemDescription='';
                $scope.store='';
            }
            $scope.AddTransaction=function(){
                 $scope.newTransaction={
                    transAmt:$scope.transamt,
                    upc:$scope.upc,
                    transDate:$scope.transdate,
                    itemDesc:$scope.itemDescription,
                    store:$scope.store,
                    tranId:$scope.id
                }
                transactionservice.addTransaction($scope.newTransaction).then(function(data){
                    if (data == null) {
                        notifierService.error = "There was an issue saving this transaction. Contact Administrator."
                    } else {
                       // dataShare.sendData(data);
                        $location.path("/Details/"+$scope.id);
                        notifierService.notify = "Transaction saved successfully";
                    }

                });
            }

        }
    }
})();