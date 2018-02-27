angular.module("spendtrackerapp", ["ngResource", "ngRoute"]);

angular.module("spendtrackerapp").config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({ redirecTo: '/' });

    $routeProvider.when('/ListBudgets', {
        templateUrl: '/partials/budgetsviews/budgetview',
        controller: 'ViewBudgetController'

    });
    $routeProvider.when('/NewBudget', {
        templateUrl: '/partials/budgetsviews/newbudget'


    });
    $routeProvider.when('/splash', {
        templateUrl: '/partials/budgetsviews/splash'


    });
    $routeProvider.when('/Details/:budgetId', {
        templateUrl: '/partials/budgetsviews/budgetDetails',
        controller: 'BudgetDetailsController',
    });

     $routeProvider.when('/NewTransaction/:budgetId',{
        templateUrl:'/partials/transactionsviews/NewTransaction',
        controller:'NewTransactionController'
     });
    //  $routeProvider.when('/EditBudget',{
    //     templateUrl:'templates/editbudget.html',
    //     controller:'BudgetController'
    // });
    // $routeProvider.when('/BudgetList',{
    //     templateUrl:'templates/editbudget.html',
    //     controller:'BudgetController'
    // });
    // $routeProvider.when('/Transaction',{
    //     templateUrl:'templates/transactions.html',
    //     controller:'TransactionController'
    // });
    //  $routeProvider.when('/NewTransaction',{
    //     templateUrl:'templates/newtransactions.html',
    //     controller:'TransactionController'
    //});
    $routeProvider.when('/Home', {
        templateUrl: '/partials/budgetsviews/splash'
    });


    //change getdata method to sychronous, or update controller to control the displayt on the page
    $routeProvider.when('/', {
        //templateUrl: '/partials/budgetsviews/splash',
        resolve: {
            "check": function(budgetservice, $location) {
                budgetservice.getBudgetList().then(function(data) {
                    if (data.data.length > 0)
                        $location.path("/ListBudgets")
                    else {
                        $location.path("/Home")
                    }
                });

            }
        }

    });
});