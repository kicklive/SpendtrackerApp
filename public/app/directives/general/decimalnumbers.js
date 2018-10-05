(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('decimalNumbers', ValidatDecimals);

    ValidatDecimals.$inject = ['$window'];

    function ValidatDecimals($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) return ''
                var decimalNum = inputValue.replace(/[^0-9.]/g, '');
                if (decimalNum != inputValue) {
                    modelCtrl.$setViewValue(decimalNum);
                    modelCtrl.$render();
                }
                return decimalNum;
            });
        }
    }

})();