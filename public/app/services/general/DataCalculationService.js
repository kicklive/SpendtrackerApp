(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .factory('DataCalculationService', Calculate)


    function Calculate() {
        var service = {
            getTrendCal: MassageDataForTrends,
            getSum: SumPrice
        };

        return service;

        function MassageDataForTrends(data) {
            var comma = '';
            var lineBreak = '';
            var stores;
            var totalSpent;
            var retAvg;
            var spentString;
            var avgSpentString = ''
            var numberOfVisits = data[0].count;
            debugger;
            for (var i = 0, len = data.length; i < len; i++) {
                if (len > 0 && (i + 1) != len) {
                    comma = '; ';
                    lineBreak = '\n';
                } else {
                    // comma = '';
                    //lineBreak = '';
                    //stringData = stringData + data[i]._id + spentString.bold() + data[i].itemprice + comma;
                    //stringData = stringData + data[i]._id + spentString.bold() + data[i].itemprice + lineBreak;
                    //avgSpentString=avgSpentString
                }
                if (i === 0) {
                    stores = data[i]._id + (len > 1 ? ', ' : ' ');
                } else {
                    stores = stores + data[i]._id + (len > 1 ? ', ' : ' ');
                }
                if (len === 1) {
                    spentString = '$' + data[i].itemprice;
                } else {
                    if (i === 0) {
                        spentString = data[i]._id + ' $' + data[i].itemprice + (len > 1 ? ', ' : ' ');
                    } else {
                        spentString = spentString + data[i]._id + ' $' + data[i].itemprice + (len > 1 ? ', ' : ' ');
                    }
                }

                if (typeof retAvg === 'undefined') {
                    retAvg = Calculate(data[i], numberOfVisits) + (len > 1 ? ', ' : ' ');
                } else {
                    retAvg = retAvg + Calculate(data[i], numberOfVisits) + (len > 1 ? ', ' : ' ');
                }


            }
            return {
                'storeinfo': stores.substring(0, stores.length - 2),
                'visits': numberOfVisits,
                'avgpervist': retAvg.substring(0, retAvg.length - 2),
                'totalSpent': spentString.substring(0, spentString.length - 2)
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