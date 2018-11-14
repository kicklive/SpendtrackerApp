(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .filter('PaymentTypeFltr', PaymentType)

    function PaymentType() {

        return GetPaymentTypeInWords;

        function GetPaymentTypeInWords(input) {
            var paymentType = ['Amex', 'Visa', 'Cash'];
            return paymentType[input - 1];
        }
    }

}());