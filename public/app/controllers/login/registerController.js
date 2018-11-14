(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('RegisterController', Register)

    Register.$inject = ['userservice'];

    function Register(userservice, $stateParams) {
        /* jshint validthis:true */
        var vm = this;
       
        vm.Message = ''
        vm.ShowMessage = true;

        activate();

        function activate() {

            vm.RegisterNewUser=function (){

            }
        }



    }
})();