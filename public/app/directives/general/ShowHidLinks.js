// (function() {
//     'use strict';

//     angular
//         .module('spendtrackerapp')
//         .directive('hideLink', CreateDirective);

//     CreateDirective.$inject = ['$window'];

//     function CreateDirective($window) {
//         // Usage:
//         //     <directive></directive>
//         // Creates:
//         //
//         var hidelink = {
//             link: link,
//             restrict: 'E'
//         };
//         return hidelink;

//         function link(scope, element, attrs) {
//             // var jadeString = "";
//             // scope: {
//             //     bs: "@xxx"
//             // }
//             // if (attrs.xxx === "Closed") {
//             //     jadeString = "a.col-sm-3.align-items-center.row-head(ui-sref='transaction({transId:trans._id,budgetId:data._id})' ){{trans.transdate|date:'MM/dd/yyyy'}}";
//             // } else {
//             //     jadeString = "col-sm-3.align-items-center.row-head {{trans.transdate|date:'MM/dd/yyyy'}}";
//             // }
//             return "a.col-sm-3.align-items-center.row-head(ui-sref='transaction({transId:trans._id,budgetId:data._id})' ){{trans.transdate|date:'MM/dd/yyyy'}}";
//         }
//     }

// })();


angular.module('spendtrackerapp').directive('hideLink', function() {
    return {

        template: "a.col-sm-3.align-items-center.row-head(ui-sref='transaction({transId:trans._id,budgetId:data._id})' ){{trans.transdate|date:'MM/dd/yyyy'}}"
    };
});