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


(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('notifierService', Notify)

    //  Notify.$inject = ['$http'];

    function Notify() {
        var service = {
            notify: NotifyMsg,
            error: ErrorMsg,
            warning: WarnMsg,
            info: InfoMsg,
            selectmsg: MsgType
        };

        return service;

        function MsgType(errCode, msg) {
            switch (errCode) {
                case 11000:
                    WarnMsg(msg);
                    break;
                default:
                    ErrorMsg(msg);
                    break;
            }
        }

        function NotifyMsg(msg) {
            toastr.success(msg);
            console.log(msg);
        }

        function InfoMsg(msg) {
            toastr.info(msg);
        }

        function WarnMsg(msg) {
            toastr.warning(msg);
        }

        function ErrorMsg(msg) {
            toastr.error(msg);
            console.log(msg);
        }
    }
})();