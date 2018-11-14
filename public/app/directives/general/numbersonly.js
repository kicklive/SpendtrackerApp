(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('numbersOnly', ValidateNumbersOnly);

    ValidateNumbersOnly.$inject = ['$window'];

    function ValidateNumbersOnly($window) {
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
                var onlyNumeric = inputValue.replace(/[^0-9]/g, '');
                if (onlyNumeric != inputValue) {
                    modelCtrl.$setViewValue(onlyNumeric);
                    modelCtrl.$render();
                }
                return onlyNumeric;
            });
        }
    }

})();