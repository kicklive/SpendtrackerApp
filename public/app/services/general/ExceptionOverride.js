(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('$exceptionHandler', ExceptionOverride)



    function ExceptionOverride() {
        var service = {
            getException: ExeptionOR
        };

        return service;

        function ExeptionOR(exception, cause) {
            exception.message += 'Angular Exception: "' + cause + '"';
            alert('error');
            throw exception;
        }
    }
})();