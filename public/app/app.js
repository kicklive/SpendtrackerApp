angular.module("spendtrackerapp", ["ngResource", "ngRoute", "ui.router"]);

angular.module("spendtrackerapp").config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    //$urlRouterProvider.otherwise({ redirecTo: '/' });

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
        .state('startpage', {
            url: '/',
            params: { d: null, s: null },
            resolve: {
                access: function(storageservice) {
                    return storageservice.get('status', null);
                },
                status: function(budgetservice, access, storageservice) {
                    debugger;
                    storageservice.clear();
                    budgetservice.budgetStatus().then(function(ret) {
                        debugger;
                        if (ret === 'success') {
                            storageservice.set('status', new Date());
                        }
                    });

                    // if (access != new Date()) {
                    //     budgetservice.budgetStatus().then(function(ret) {
                    //         //debugger;
                    //         if (ret === 'success') {
                    //             storageservice.set('status', new Date());
                    //         }
                    //     });
                    // }
                },
                data: function(budgetservice, storageservice, $location) {
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
                // status: function(budgetservice, data) {
                //     if (data != null) {
                //         budgetservice.CheckAndUpdate(data).then(function(ret) {
                //             //debugger;
                //             if (ret === 'success') {
                //                 s = ret;
                //             }
                //         });
                //     }
                // },
            }



            // "check": function(budgetservice, $location, storageservice) {
            //     if (storageservice.get('status', null) != new Date()) {
            //         budgetservice.budgetStatus().then(function(ret) {
            //             if (ret === 'success') {
            //                 storageservice.set('status', new Date());
            //             }
            //         });
            //     }

            //     budgetservice.getBudgetList().then(function(data) {
            //         if (data.data.length > 0) {
            //             d = data;
            //             storageservice.setObj('budgets', data.data);
            //             $location.path("/ListBudgets")
            //                 //$state.go('listbudgets', { data: data });
            //         } else {
            //             //$state.go('home');
            //             $location.path("/Home")
            //         }
            //     });

            // }
            // }
        });




    // angular.module("spendtrackerapp").config(function($routeProvider, $locationProvider) {
    //     $locationProvider.html5Mode(true);
    //     $routeProvider.otherwise({ redirecTo: '/' });

    //     $routeProvider.when('/ListBudgets', {
    //         templateUrl: '/partials/budgetsviews/budgetview',
    //         controller: 'ViewBudgetController'

    //     });
    //     $routeProvider.when('/NewBudget', {
    //         templateUrl: '/partials/budgetsviews/newbudget'


    //     });
    //     $routeProvider.when('/splash', {
    //         templateUrl: '/partials/budgetsviews/splash'


    //     });
    //     $routeProvider.when('/Details/:budgetId', {
    //         templateUrl: '/partials/budgetsviews/budgetDetails',
    //         controller: 'BudgetDetailsController',
    //     });

    //     $routeProvider.when('/NewTransaction/:budgetId', {
    //         templateUrl: '/partials/transactionsviews/NewTransaction',
    //         controller: 'NewTransactionController'
    //     });

    //     $routeProvider.when('/Transaction/:transId', {
    //         templateUrl: '/partials/transactionsviews/NewTransaction',
    //         controller: 'NewTransactionController'
    //     });

    //     //  $routeProvider.when('/EditBudget',{
    //     //     templateUrl:'templates/editbudget.html',
    //     //     controller:'BudgetController'
    //     // });
    //     // $routeProvider.when('/BudgetList',{
    //     //     templateUrl:'templates/editbudget.html',
    //     //     controller:'BudgetController'
    //     // });
    //     // $routeProvider.when('/Transaction',{
    //     //     templateUrl:'templates/transactions.html',
    //     //     controller:'TransactionController'
    //     // });
    //     //  $routeProvider.when('/NewTransaction',{
    //     //     templateUrl:'templates/newtransactions.html',
    //     //     controller:'TransactionController'
    //     //});
    //     $routeProvider.when('/Home', {
    //         templateUrl: '/partials/budgetsviews/splash'
    //     });


    //     //change getdata method to sychronous, or update controller to control the displayt on the page
    //     $routeProvider.when('/', {
    //         //templateUrl: '/partials/budgetsviews/splash',
    //         resolve: {
    //             "check": function(budgetservice, $location) {
    //                 budgetservice.getBudgetList().then(function(data) {
    //                     if (data.data.length > 0)
    //                         $location.path("/ListBudgets")
    //                     else {
    //                         $location.path("/Home")
    //                     }
    //                 });

    //             }
    //         }

    //     });
});


angular.module("spendtrackerapp").run(function($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
});