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



            for (var i = 0, len = data.TopMonth.length; i < len; i++) {
                if (tmpAmt == '' || tmpAmt == data.TopMonth[i].total) {
                    topSpendingMonth = $filter('MonthFltr')(data.TopMonth[i].month);
                    topSpendingAmount = data.TopMonth[i].total;
                    topSpendingString = topSpendingString + topSpendingMonth + '-->$' + topSpendingAmount + '; '
                    tmpAmt = data.TopMonth[i].total
                }
                debugger;
                topSpendingString = topSpendingString.substring(0, topSpendingString.length - 1);
            }
            tmpAmt = '';
            for (var i = 0, len = data.LowMonth.length; i < len; i++) {
                if (tmpAmt == '' || tmpAmt == data.LowMonth[i].total) {
                    lowpSpendingMonth = $filter('MonthFltr')(data.LowMonth[i].month);
                    lowSpendingAmount = data.LowMonth[i].total;
                    lowSpendingString = lowSpendingString + lowpSpendingMonth + '-->$' + lowSpendingAmount + '; '
                    tmpAmt = data.LowMonth[i].total
                }
                debugger;
                lowSpendingString = lowSpendingString.substring(0, lowSpendingString.length - 1);
            }

            tmpAmt = ''
            for (var i = 0, len = data.SpendingByPaymentType.length; i < len; i++) {
                if (tmpAmt == '' || tmpAmt == data.SpendingByPaymentType[i].total) {
                    payType = $filter('PaymentTypeFltr')(data.SpendingByPaymentType[i].BudgetType);
                    amtByPayType = data.SpendingByPaymentType[i].total;
                    payTypeString = payTypeString + 'Pament Type: ' + payType + ', Amount: ' + amtByPayType.toString() + ', ';
                    tmpAmt = data.SpendingByPaymentType[i].total;
                }
                payTypeString = payTypeString.substring(0, payTypeString.length - 1);
            }

            tmpAmt = ''
            for (var i = 0, len = data.MostActivity.length; i < len; i++) {
                if (tmpAmt == '' || tmpAmt == data.MostActivity[i].count) {
                    mostActivityStore = data.MostActivity[i].store;
                    mostActivityCount = data.MostActivity[i].count;
                    mostActivityString = mostActivityString + 'Store with most visits: ' + mostActivityStore + ', Number of Visits: ' + mostActivityCount.toString() + ', ';
                    tmpAmt = data.MostActivity[i].count;
                }
                mostActivityString = mostActivityString.substring(0, mostActivityString.length - 1);
            }
            return {
                'AvgSpentPerStore': data.AvgSpentPerStore,
                'Budgeted': data.Budgeted,
                'LowMonth': lowSpendingString,
                'MostActivity': mostActivityString,
                'OverSpent': data.OverSpent,
                'SpendingByPaymentType': payTypeString,
                'Spent': data.Spent,
                'StoresVisited': data.StoresVisited,
                'TopMonth': topSpendingString,
                'TopSpendingStore': data.TopSpendingStore
            }












            // for (var i = 0, len = data[0].TopMonth.length; i < len; i++) {
            //     monthNumber = data[0].TopMonth[i].month;
            //     if (tmpAmt == '' || tmpAmt == data[0].TopMonth[i].total) {
            //         topSpendingMonth = months[monthNumber - 1];
            //         topSpendingAmount = data[0].TopMonth[i].total;
            //         topSpendingString + topSpendingString + topSpendingMonth + '-->$' + topSpendingAmount + '; '
            //         tempHolder = data[0].TopMonth[i].total
            //     }
            //     debugger;
            //     topSpendingString = topSpendingString.substring(0, topSpendingString.length - 1);
            // }
            // tmpAmt = '';
            // for (var i = 0, len = data[0].LowMonth.length; i < len; i++) {
            //     monthNumber = data[0].LowMonth[i].month;
            //     if (tmpAmt == '' || tmpAmt == data[0].LowMonth[i].total) {
            //         lowpSpendingMonth = months[monthNumber - 1];
            //         lowSpendingAmount = data[0].LowMonth[i].total;
            //         lowSpendingString + topSpendingString + lowpSpendingMonth + '-->$' + lowSpendingAmount + '; '
            //         tempHolder = data[0].LowMonth[i].total
            //     }
            //     debugger;
            //     topSpendingString = topSpendingString.substring(0, topSpendingString.length - 1);
            // }
            // overBudgetcount = data[0].OversSpent.length;
            // debugger;
            // if (overBudgetcount > 0) {
            //     for (var i = 0, len = data[0].OversSpent.length; i < len; i++) {
            //         debugger;
            //         startDate = $filter('date')(data[0].OversSpent[i].budgetstartdate, 'MM/dd/yyyy');
            //         endDate = $filter('date')(data[0].OversSpent[i].budgetenddate, 'MM/dd/yyyy');
            //         startingBudget = data[0].OversSpent[i].budgetamount;
            //         endingBudget = data[0].OversSpent[i].totalspent;
            //         amountOver = startingBudget - endingBudget;
            //         debugger;
            //         overBudgetString = overBudgetString + 'Budget period: ' + startDate + ' to ' + endDate + '; Budget Amount: $' + startingBudget + '; Total Spent: $' + endingBudget + '; Total Over Budget $' + $filter('number')(amountOver, 2) + ', ';
            //     }
            //     overBudgetString = overBudgetString.substring(0, overBudgetString.length - 1);
            // } else {
            //     overBudgetString = '0';
            // }

            // for (var i = 0, len = data[0].StoresVisited.length; i < len; i++) {
            //     storesVisited = storesVisited + data[0].StoresVisited[i].store + ', ';
            // }
            // storesVisited = storesVisited.substring(0, storesVisited.length - 1);
            // var topSpendingStore = data[0].TopSpendingStore[0].store;
            // var topSpendingStoreAmt = data[0].TopSpendingStore[0].totalspent;

            // tmpAmt = ''
            // for (var i = 0, len = data[0].SpendingByPaymentType.length; i < len; i++) {
            //     if (tmpAmt == '' || tmpAmt == data[0].SpendingByPaymentType[i].total) {
            //         payType = data[0].SpendingByPaymentType[i].BudgetType;
            //         amtByPayType = data[0].SpendingByPaymentType[i].amount;
            //         payTypeString = payTypeString + 'Pament Type: ' + payType + ', Amount: ' + amtByPayType.toString() + ', ';
            //         tmpAmt = data[0].SpendingByPaymentType[i].total;
            //     }
            //     payTypeString = payTypeString.substring(0, payTypeString.length - 1);
            // }

            // tmpAmt = ''
            // for (var i = 0, len = data[0].MostActivity.length; i < len; i++) {
            //     if (tmpAmt == '' || tmpAmt == data[0].MostActivity[i].count) {
            //         mostActivityStore = data[0].MostActivity[i].store;
            //         mostActivityCount = data[0].MostActivity[i].count;
            //         mostActivityString = mostActivityString + 'Store with most visits: ' + mostActivityStore + ', Number of Visits: ' + mostActivityCount.toString() + ', ';
            //         tmpAmt = data[0].MostActivity[i].count;
            //     }
            //     mostActivityString = mostActivityString.substring(0, mostActivityString.length - 1);
            // }




            // return {
            //     'totabudgetytd': stores.substring(0, stores.length - 2),
            //     'totalspentytd': numberOfVisits,
            //     'topspendingmonth': retAvg.substring(0, retAvg.length - 2),
            //     'lowspendingmonth': spentString.substring(0, spentString.length - 2),
            //     'overbudgetcount': '$' + data[0].total.toString(),
            //     'storemostspent': '$' + data[0].amtspent.toString(),
            //     'spendingbypaymenttype': '$' + data[0].amtspent.toString(),
            //     'topvisitedstore': '$' + data[0].amtspent.toString(),
            //     'storesvisited': '$' + data[0].amtspent.toString(),
            // }
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