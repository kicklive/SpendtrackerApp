(function(){
    'use strict';

    angular
        .module('spendtrackerapp')
        .filter('sumVal', SumByValue)

    function SumByValue(){

        return SumValue;

        function SumValue(val1,val2){
            return val1+val2;
        }
    }

}());