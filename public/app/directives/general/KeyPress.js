(function () {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('keyPress', KeyPressed);

        KeyPressed.$inject = ['$window'];

    function KeyPressed($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            keyed: keyPressed,
            restrict: 'EA'
        };
        return directive;

        function keyPressed(scope, element, attrs) {
            var clickAction = attrs.confirmedClick;
            element.bind("keydown keypress", function (event) {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction);
                }

            });
        }
    }

})();