(function() {
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
            scope: {
                msg: '@'
            },
            link: link,
            restrict: 'A'

        };
        return directive;

        function link(scope, element, attrs) {
            var clickAction = attrs.confirmedClick;
            debugger;
            //  scope.msg = attrs['confirmClick'];
            element.bind("click", function(event) {
                if (window.confirm(scope.msg)) {
                    $scope.$eval(clickAction);
                }

            });
        }
    }

})();