(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .directive('hideLink', CreateDirective);

    CreateDirective.$inject = ['$window'];

    function CreateDirective($window) {
        // Usage:
        //     <directive></directive>
        // Creates:
        //
        var hidelink = {
            link: link,
            restrict: 'E'
        };
        return hidelink;

        function link(scope, element, attrs) {
            var htmlString = "";
            scope: {
                budgetStatus: "@"
            }
            if (budgetStatus == "Closed") {
                jadeString = "a.col-sm-3.align-items-center.row-head";
            } else {
                jadeString = "col-sm-3.align-items-center.row-head";
            }
        }
    }

})();