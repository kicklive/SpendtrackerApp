(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('BudgetDetailsController', BudgetDetails)

    BudgetDetails.$inject = ['$scope', '$route', 'budgetservice', '$location', 'STConstants', '$stateParams', '$state', 'storageservice', 'DateCountService'];

    function BudgetDetails($scope, $route, budgetservice, $location, STConstants, $stateParams, $state, storageservice, DateCountService) {
        $scope.data = {};
        var budgetStatus;
        //storageservice.clear();
        activate();

        function activate() {
            //debugger;
            var date = new Date();
            var fDate = new Date(date.setHours(0, 0, 0, 0));
            $scope.ShowButton = function() {
                return false;
            }
            $scope.ShowLink = function(v) {
                    ////debugger;
                    console.log('show link--> ' + v);
                    var retStatus = true;
                    if (v == 'Closed')
                        retStatus = false;
                    return retStatus;
                }
                // storageservice.clear();
                ////debugger;
            var budgId = null;
            if ($stateParams.budgetId != null) {
                storageservice.remove('budgetid');
                storageservice.set('budgetid', $stateParams.budgetId);
                budgId = $stateParams.budgetId;
            } else {
                budgId = storageservice.get('budgetid', 'empty');
            }





            //stateparm is empty on refresh. find a different key


            if (storageservice.getObj(budgId, 'empty') == 'empty') {
                budgetservice.getBudgetDetails(budgId).then(function(data) {
                    ////debugger;
                    $scope.data = data.data;
                    $scope.data.BudgetType = STConstants.contant[$scope.data.BudgetType];
                    $scope.budgetStatus = $scope.data.BudgetStatus;
                    if ($scope.data.Transactions.length != undefined && $scope.data.Transactions.length === 0)
                        $scope.data.msg = "There are no transactions for this budget."

                    if (DateCountService.getDays(fDate, $scope.data.BudgetEndDate) >= 0 && data.data.BudgetStatus == "Open") {
                        //if (Math.round((new Date(fDate).getTime() - new Date($scope.data.BudgetEndDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0 && data.data.BudgetStatus == "Open") {
                        budgetservice.updateStatus($stateParams.budgetId).then(function(updateData) {
                            ////debugger;
                            $scope.data.BudgetStatus = updateData.BudgetStatus;
                            $scope.ShowButton = function() {
                                return false;
                            }
                        });
                    }
                    storageservice.setObj(budgId, $scope.data);
                });
            } else {
                $scope.data = storageservice.getObj(budgId, 'empty');
                ////debugger;
                //if (Math.round((new Date(fDate).getTime() - new Date($scope.data.BudgetEndDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0 && $scope.data.BudgetStatus == "Open") {
                if (DateCountService.getDays(fDate, $scope.data.BudgetEndDate) >= 0 && data.data.BudgetStatus == "Open") {
                    budgetservice.updateStatus(storageservice.get('budgetid', 'empty')).then(function(updateData) {
                        ////debugger;
                        if ($scope.data.Transactions.length != undefined && $scope.data.Transactions.length === 0)
                            $scope.data.msg = "There are no transactions for this budget."
                        $scope.ShowButton = function() {
                            return false;
                        }
                        $scope.data.BudgetStatus = updateData.BudgetStatus;
                    });
                }
            }


            $scope.findDiff = function(d) {
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate());
                var toDate = new Date(d.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                if (fromDate && toDate) {
                    //if (Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0) {

                    if (DateCountService.getDays(fromDate, toDate) >= 0) {
                        return 0
                    } else {
                        $scope.ShowButton = function() {
                                return true;
                            }
                            //return Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                        return Math.abs(DateCountService.getDays(fromDate, toDate));
                    }

                }

            }
            $scope.ShowMsg = function() {
                var hasData = false;
                if ($scope.data.Transactions != null) {
                    if ($scope.data.Transactions.length > 0)
                        hasData = true;
                }
                return hasData;
            }
            $scope.CreateNewTrans = function() {
                // $location.path('/NewTransaction/' + $stateParams.budgetId)
                $state.go('newtransaction', {
                    budgetId: budgId
                })
            }

            function CheckStatus(d) {
                var ret = null;
                var remainingDates = 0;
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate());
                var toDate = new Date(d.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                if (fromDate && toDate) {
                    console.log(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                    if (Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0)
                        ret = "Close";
                    return ret;

                }
            }


        }

    }
})();