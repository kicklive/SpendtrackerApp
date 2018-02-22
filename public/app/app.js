angular.module("spendtrackerapp", ["ngResource", "ngRoute"]);

angular.module("spendtrackerapp").config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({ redirecTo: '/' });
    // $routeProvider.when('/',{

    //     controller:'BudgetController'
    // });

    $routeProvider.when('/ListBudgets', {
        templateUrl: '/partials/budgetsviews/budgetview',
        controller:'ViewBudgetController'
      
    });
    $routeProvider.when('/NewBudget', {
        templateUrl: '/partials/budgetsviews/newbudget'
   

    });
   
    //  $routeProvider.when('/NewBudget',{
    //     templateUrl:'/partials/budget/budgetView',
    //     controller:'budgetcontroller'

    // });
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
    $routeProvider.when('/splash', {
        templateUrl: '/partials/budgetsviews/splash'

    });
    $routeProvider.when('/', {
        templateUrl: '/partials/budgetsviews/splash'

    });
});

// var spendtrackerapp=angular.module('spendtrackerapp',['ngResource','ngRoute'])
// .config(Go);

// function Go($routeProvider,$locationProvider){
//      $locationProvider.html5Mode(true);
//      routeProvider.otherwise({redirecTo: '/splash.jade'});
//     $routeProvider.when('/',{

//         controller:'BudgetController'
//     });
//      $routeProvider.when('/NewBudget',{
//         templateUrl:'templates/newbudget.html',
//         controller:'BudgetController'
//     });
//      $routeProvider.when('/EditBudget',{
//         templateUrl:'templates/editbudget.html',
//         controller:'BudgetController'
//     });
//     $routeProvider.when('/BudgetList',{
//         templateUrl:'templates/editbudget.html',
//         controller:'BudgetController'
//     });
//     $routeProvider.when('/Transaction',{
//         templateUrl:'templates/transactions.html',
//         controller:'TransactionController'
//     });
//      $routeProvider.when('/NewTransaction',{
//         templateUrl:'templates/newtransactions.html',
//         controller:'TransactionController'
//     });
//       $routeProvider.when('/splash',{
//         templateUrl:'components/budget/template/splash.jade'

//     });
// }