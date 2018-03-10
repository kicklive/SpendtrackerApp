(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('BudgetDetailsController', BudgetDetails)

    BudgetDetails.$inject = ['$scope', '$route', 'budgetservice', '$location', 'STConstants', '$stateParams', '$state', 'storageservice'];

    function BudgetDetails($scope, $route, budgetservice, $location, STConstants, $stateParams, $state, storageservice) {
        $scope.data = {};

        activate();

        function activate() {
            var date = new Date();
            var fDate = new Date(date.setHours(0, 0, 0, 0));
            $scope.ShowButton = function() {
                    return false;
                }
                //stateparm is empty on refresh. find a different key
            if (storageservice.getObj($stateParams.budgetId, 'empty') == 'empty') {
                budgetservice.getBudgetDetails($stateParams.budgetId).then(function(data) {
                    $scope.data = data.data;
                    $scope.data.BudgetType = STConstants.contant[$scope.data.BudgetType];
                    storageservice.setObj('details', $scope.data)
                    if (Math.round((new Date(fDate).getTime() - new Date($scope.data.BudgetEndDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0) {
                        budgetservice.updateStatus($stateParams.budgetId).then(function() {
                            $scope.ShowButton = function() {
                                return false;
                            }
                        });
                    }
                });
            } else {
                $scope.data = storageservice.get($stateParams.budgetId, 'empty');
                $scope.data.BudgetType = STConstants.contant[$scope.data.BudgetType];
                if (Math.round((new Date(fDate).getTime() - new Date($scope.data.BudgetEndDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0) {
                    budgetservice.updateStatus($stateParams.budgetId).then(function() {
                        $scope.ShowButton = function() {
                            return false;
                        }
                    });
                }
            }

            $scope.findDiff = function(d) {
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
                var toDate = new Date(d.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                if (fromDate && toDate) {
                    if (Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)) >= 0) {
                        // budgetservice.updateStatus($route.current.pathParams.budgetId).then(function(){
                        //     $scope.ShowButton=function(){
                        //         return false;
                        //     }
                        // });
                    } else {
                        $scope.ShowButton = function() {
                            return true;
                        }
                    }
                    return Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
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
                $state.go('newtransaction', { budgetId: $stateParams.budgetId })
            }

            function CheckStatus(d) {
                var ret = null;
                var remainingDates = 0;
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
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