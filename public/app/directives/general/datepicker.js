(function () {
    'use strict';

    angular
        .module ('spendtrackerapp')
        .directive ('datepkr', CreateDirective);

    CreateDirective.$inject = ['$window'];

    function CreateDirective($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            require:'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModelCtrl) {
           $(function(){
                element.datepicker({
                    dateFormat:'mm/dd/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }

})();

// var app=angular.module('spendtrackerapp');
// app.directive('datepkr', function() {
//     return {
//         restrict: 'A',
//         require : 'ngModel',
//         link : function (scope, element, attrs, ngModelCtrl) {
//             $(function(){
//                 element.datepicker({
//                     dateFormat:'dd/mm/yy',
//                     onSelect:function (date) {
//                         ngModelCtrl.$setViewValue(date);
//                         scope.$apply();
//                     }
//                 });
//             });
//         }
//     };
// });
