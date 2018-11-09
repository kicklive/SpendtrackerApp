(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('userservice', factory)

    factory.$inject = ['$http'];

    function factory($http) {
        var service = {
            login: loginUser,
            register: registerUser,
            logOut: logOutUser
        };

        return service;

        function loginUser(formData) {
            return $http.get('/data/login', formData).then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                //debugger;
                return function() {
                    return { success: false, message: err };
                };
            }
        }

        function registerUser(formData) {
            return $http.get('/data/register', formData).then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                //debugger;
                return function() {
                    return { success: false, message: err };
                };
            }
        }

        function logOutUser(formData) {
            return $http.get('/data/logout', formData).then(success, failure);

            function success(d) {
                //debugger;
                return d;
            }

            function failure(err) {
                //debugger;
                return function() {
                    return { success: false, message: err };
                };
            }
        }
    }
})();