"use strict";

(function() {
    "use strict";

    angular
        .module("spendtrackerapp")
        .controller("PurchaseHistoryController", PurchaseHistory);

    PurchaseHistory.$inject = [
        "$location",
        "PurchaseHistoryService",
        "notifierService",
        "uiGridGroupingConstants"
    ];

    function PurchaseHistory(
        $location,
        PurchaseHistoryService,
        notifierService,
        uiGridGroupingConstants
    ) {
        /* jshint validthis:true */
        var vm = this;

        activate();


        function activate() {
            //debugger;
            vm.search = "";
            vm.serchBy = "";
            vm.history = null;
            vm.history = {
                enableFiltering: false,
                treeRowHeaderAlwaysVisible: false,
                columnDefs: [{
                        name: "UPC",
                        field: "upc",
                        grouping: { groupPriority: 0 },
                        sort: { priority: 0, direction: "asc" },
                        width: "20%"
                    },
                    { name: "Transaction Date", field: "transdate", width: "20%" },
                    {
                        name: "Price",
                        field: "itemprice",
                        width: "20%",
                        cellFilter: "currency",
                        treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                        customTreeAggregationFinalizerFn: function customTreeAggregationFinalizerFn(
                            aggregation
                        ) {
                            aggregation.rendered = aggregation.value;
                        }
                    },
                    { name: "Store", field: "store", width: "20%" },
                    { name: "Description", field: "itemdescription", width: "20%" }
                ],
                onRegisterApi: function onRegisterApi(gridApi) {
                    vm.gridApi = gridApi;
                }
            };

            vm.submitForm = function() {
                //debugger;
                alert("error");
            };

            vm.isDdate = false;

            vm.ShowDate = function(v) {
                var ret;
                // //debugger;
                switch (vm.rdoHistory) {
                    case "all":
                        ret = false;
                        break;
                    case "upc":
                        ret = false;
                        break;
                    case "date":
                        ret = true;
                        break;
                }
                return ret;
            };
            vm.Search = function() {
                //debugger;
                switch (vm.rdoHistory) {
                    case "all":
                        vm.GetAllHistory();
                        break;
                    case "upc":
                        vm.GetHistoryByUPC();
                        break;
                    case "date":
                        vm.GetHistoryByDateRange();
                        break;
                    default:
                        notifierService.warning("Please select a search method.");
                }
            };
            vm.HideAllBoxes = function() {
                var showBoxes = true;
                if (vm.rdoHistory === "all") showBoxes = false;
                return showBoxes;
            };

            vm.GetAllHistory = function() {
                PurchaseHistoryService.GetAll().then(function(data, err) {
                    //debugger;
                    if (data != null) {
                        //debugger;
                        //vm.history = data;
                        vm.history.data = vm.formatDate(data);
                        // } else {
                        //     //debugger;
                        //     notifierService.InfoMsg(
                        //         "There was an retrieving data. Contact Administrator."
                        //     );
                    }
                });
            };

            vm.GetHistoryByUPC = function() {
                //debugger;
                PurchaseHistoryService.GetByUPC(vm.upc).then(function(data, err) {
                    //debugger;
                    if (data != null) {
                        //vm.history = data;

                        vm.history.data = vm.formatDate(data);
                    } else {
                        notifierService.InfoMsg(
                            "There was an retrieving data. Contact Administrator."
                            //throw { message: 'There was an retrieving data. Contact Administrator.' };
                        );
                    }
                });
            };

            vm.GetHistoryByDateRange = function() {
                PurchaseHistoryService.GetByDates(vm.startDate, vm.endDate).then(
                    function(data, err) {
                        //debugger;
                        if (data != null) {
                            //vm.history = data;
                            vm.history.data = vm.formatDate(data);
                        } else {
                            notifierService.InfoMsg(
                                "There was an retrieving data. Contact Administrator."
                            );
                        }
                    }
                );
            };

            vm.formatDate = function(data) {
                var newDate;
                //debugger;
                for (var i = 0; i < data.length; i++) {
                    newDate = new Date(data[i].transdate).toLocaleDateString();
                    data[i].transdate = newDate;
                }
                //vm.history = data;
                return data;
            };
            // vm.checkRadioSelection = function() {
            //     //debugger;
            //     var ret = true;
            //     if (vm.searchval == undefined) {
            //         notifierService.warning("Please select a search method.");
            //         ret = false;
            //     }
            //     return ret;
            // }
        }
    }
})();