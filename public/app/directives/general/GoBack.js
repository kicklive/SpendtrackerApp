(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('goBack', GoBack);

    GoBack.$inject = ['$window'];

    function GoBack($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var directive = {
            //really don't need to do this.. Just doing it to show that variables can be used.
            scope: {
                back: '@back',
            },
            link: link,
            restrict: 'E',
            template: '/public/app/templates/buttons.jade'
        };
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function() {
                $window.history.back();
                scope.$apply();
            })
        }
    }

})();