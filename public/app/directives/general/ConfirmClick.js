(function () {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('confirmClick', Confirm);

    Confirm.$inject = ['$window'];

    function Confirm($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var msg = "Are you sure you want to delete this transaction?";
            var clickAction = attrs.confirmedClick;
            element.bind("click", function (event) {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction);
                }

            });
        }
    }

})();