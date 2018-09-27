(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('DataCalculationService', Calculate)

    Calculate.$inject = ['$filter']

    function Calculate($filter) {
        var service = {
            getTrendCal: MassageDataForTrends,
            getSum: SumPrice
        };

        return service;

        function MassageDataForTrends(data) {
            debugger;
            var tmpAmt = ''
            var topSpendingString = '';
            var lowSpendingString = '';
            var topSpendingMonth, topSpendingAmount, lowpSpendingMonth, lowSpendingAmount,
                payType, amtByPayType, payTypeString, mostActivityStore, mostActivityCount, mostActivityString;
            debugger;


            var topMonth = [];
            if (typeof(data.TopMonth) != 'undefined') {
                for (var i = 0, len = data.TopMonth.length; i < len; i++) {
                    if (tmpAmt == '' || tmpAmt == data.TopMonth[i].total) {
                        topMonth[i] = { 'month': $filter('MonthFltr')(data.TopMonth[i].month), 'amount': $filter('currency')(data.TopMonth[i].total, '$', '2') };
                        tmpAmt = data.TopMonth[i].total
                    }
                    debugger;
                }
            }

            if (typeof(data.TopMonth) != 'undefined') {
                tmpAmt = '';
                var lowMonth = [];
                for (var i = 0, len = data.LowMonth.length; i < len; i++) {
                    if (tmpAmt == '' || tmpAmt == data.LowMonth[i].total) {
                        lowMonth[i] = { 'month': $filter('MonthFltr')(data.LowMonth[i].month), 'amount': $filter('currency')(data.LowMonth[i].total, '$', '2') };
                        tmpAmt = data.LowMonth[i].total
                    }
                    debugger;
                }
            }

            if (typeof(data.TopMonth) != 'undefined') {
                tmpAmt = ''
                var topActivity = [];
                for (var i = 0, len = data.MostActivity.length; i < len; i++) {
                    if (tmpAmt == '' || tmpAmt == data.MostActivity[i].count) {
                        topActivity[i] = { 'store': data.MostActivity[i].store, 'count': data.MostActivity[i].count };
                        tmpAmt = data.MostActivity[i].count;
                    }
                }
            }
            return {
                // 'AvgSpentPerStore': data.AvgSpentPerStore,
                'Budgeted': data.Budgeted,
                // 'LowMonth': lowMonth,
                // 'MostActivity': topActivity,
                // 'OverSpent': data.OverSpent,
                // 'OverSpentOccurencesCount': data.OverSpent.length,
                // 'SpendingByPaymentType': data.SpendingByPaymentType,
                'Spent': data.Spent,
                // 'StoresVisited': data.StoresVisited,
                // 'TopMonth': topMonth,
                // 'TopSpendingStore': data.TopSpendingStore
            }
        }


        function Calculate(data, visits) {
            var store = data._id;
            var avg = data.itemprice / visits;
            var ret;
            if (visits === 1)
                ret = ' $' + (avg.toFixed(2)).toString();
            else
                ret = store + ' $' + (avg.toFixed(2)).toString();
            return ret;
        }

        function SumPrice(d) {
            var ret = 0;
            for (var i = 0, len = d.length; i < len; i++) {
                debugger;
                ret = ret + Number(d[i].itemprice);
            }
            return ret;
        }
    }
})();