(function() {
    'use strict';

    angular
        .module('spendtrackerapp', ['ngResource', 'ngRoute', 'ui.router', 'ui.grid', 'ui.grid.grouping'])
        .config(STConfig)

    STConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide'];


    function STConfig($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
        var d, s;
        $stateProvider
            .state('listbudgets', {
                url: '/ListBudgets',
                templateUrl: '/partials/budgetsviews/budgetview',
                controller: 'ViewBudgetController'
            })
            .state('newbudget', {
                url: '/NewBudget',
                templateUrl: '/partials/budgetsviews/newbudget',
            })
            .state('splash', {
                url: '/splash',
                templateUrl: '/partials/budgetsviews/splash'
            })
            .state('home', {
                url: '/Home',
                templateUrl: '/partials/budgetsviews/splash'
            })
            .state('details', {
                url: '/Details',
                params: {
                    budgetId: null
                },
                templateUrl: '/partials/budgetsviews/budgetDetails',
                controller: 'BudgetDetailsController',
            })
            .state('newtransaction', {
                url: '/NewTransaction',
                params: {
                    transId: null,
                    budgetId: null
                },
                templateUrl: '/partials/transactionsviews/NewTransaction',
                controller: 'NewTransactionController'
            })
            .state('transaction', {
                url: '/Transaction',
                params: {
                    transId: null,
                    budgetId: null
                },
                templateUrl: '/partials/transactionsviews/NewTransaction',
                controller: 'NewTransactionController'
            })
            .state('budgettrends', {
                url: '/BudgetTrends',
                templateUrl: '/partials/budgetsviews/BudgetTrends',
                controller: 'BudgetTrendsController',
                controllerAs: 'btc'
            })
            .state('purchasehistory', {
                url: '/PurchaseHistory',
                templateUrl: '/partials/transactionsviews/purchasehistory',
                controller: 'PurchaseHistoryController',
                controllerAs: 'phc'
            })
            .state('itemsearch', {
                url: '/SearchItem',
                templateUrl: '/partials/itemsviews/searchitem',
                controller: 'ItemSearchController',
                controllerAs: 'isc'
            })
            .state('startpage', {
                url: '/',
                params: { d: null, s: null },
                resolve: {
                    access: function(storageservice) {
                        return storageservice.get('status', null);
                    },
                    status: function(budgetservice, access, storageservice) {
                        //debugger;
                        storageservice.clear();
                        budgetservice.budgetStatus().then(function(ret) {
                            ////debugger;
                            if (ret === 'success') {
                                storageservice.set('status', new Date());
                            }
                        });
                    },
                    data: function(budgetservice, storageservice, $location) {
                        //debugger;
                        budgetservice.getBudgetList().then(function(data) {
                            if (data.data.length > 0) {
                                //debugger;
                                d = data;

                                $location.path("/ListBudgets")
                                    //$state.go('listbudgets', { data: data });
                            } else {
                                //$state.go('home');
                                $location.path("/Home")
                            }
                        });
                    },
                }
            });
    }
    angular.module("spendtrackerapp").run(function($rootScope) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });

    extendExceptionHandler.$inject = ['$delegate', 'notifierService'];


    function extendExceptionHandler($delegate, notifierService) {
        return function(exception, cause) {
            debugger;
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            //debugger;
            /**
             * 
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             */
            //alert(errorData.exception.message);
            // throw new Error();
            notifierService.error(errorData.exception.message);
            // toastr.error(exception.m\sg, errorData);
        };
    }

}());