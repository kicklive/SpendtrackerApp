// angular.module("spendtrackerapp").value("toast", toastr);

// angular.module("spendtrackerapp").factory("notifierService", function(toast) {
//   return {
//     notify: function(msg) {
//       toast.success(msg);
//       console.log(msg);
//     },
//     error: function(msg) {
//       toast.error(msg);
//       console.log(msg);
//     }
//   };
// });


(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('notifierService', Notify)

        Notify.$inject = ['$http'];

    function Notify($http) {
        var service = {
            notify: NotifyMsg,
            error:ErrorMsg
        };

        return service;

        function NotifyMsg(msg) {
          toastr.success(msg);
          console.log(msg);
         }
         function ErrorMsg(msg){
          toastr.error(msg);
          console.log(msg);
         }
    }
})();