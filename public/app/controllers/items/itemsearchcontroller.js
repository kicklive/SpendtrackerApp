(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ItemSearchController', SearchItem)

    SearchItem.$inject = ['itemservice', 'notifierService'];

    function SearchItem(itemservice, notifierService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            debugger;
            vm.Item;
            vm.count = 0;
            vm.items = null;
            vm.addProduct = false;
            vm.errMsg = '';
            vm.items = {
                enableFiltering: false,
                treeRowHeaderAlwaysVisible: false,
                columnDefs: [{
                        name: "UPC",
                        field: "UPC",
                        sort: { priority: 0, direction: "asc" },
                        width: "20%"
                    },
                    { name: "Item Description", field: "ItemDescription", width: "60%" },
                    {
                        name: "Price",
                        field: "Price",
                        width: "20%",
                        cellFilter: "currency",
                    },

                ],
                onRegisterApi: function onRegisterApi(gridApi) {
                    vm.gridApi = gridApi;
                }
            };




            vm.SearchForItem = function() {
                if (vm.searchUPC != null && vm.searchUPC.length === 12) {
                    itemservice.GetItem(vm.searchUPC).then(function(ret) {
                        debugger;
                        if (ret.status == 200) {
                            vm.errMsg = '';
                            if (ret.data != null) {
                                vm.Item = ret.data;
                            } else {
                                vm.Item = -1;
                            }

                        } else {
                            vm.errMsg = 'There was problem processing the search. Contact Administrator.';
                            vm.Item = null;
                        }
                        vm.count = 0;
                        vm.addProduct = false;
                    });
                }
            }
            vm.ShowAllProducts = function() {
                itemservice.SearchForAllProduct().then(function(ret) {
                    debugger;
                    vm.addProduct = false;
                    vm.items.data = ret.data;
                    vm.count = ret.data.length;
                });
            }
            vm.AddNewProduct = function() {
                vm.addProduct = true;
                vm.count = 0;
            }
            vm.SaveProduct = function() {
                itemservice.AddProduct().then(function(ret) {
                    if (ret == 'success') {
                        vm.addProduct = true;
                        vm.ShowAllProducts();
                    }
                });
            }
            vm.IsNewProduct = function() {
                return vm.addProduct;
            }
            vm.Save = function() {
                var formData = {
                    'UPC': vm.UPC,
                    'ItemDescription': vm.ItemDescription,
                    'Price': vm.Price
                }
                debugger;
                itemservice.Save(formData).then(function(ret) {
                    debugger;
                    if (ret.data == 'success') {
                        notifierService.notify('Product added successfully.');
                        vm.ItemSearch.$setPristine();
                        vm.ItemSearch.$setUntouched();
                    } else {
                        notifierService.error('There was a problem saving the product. Contact administrator.');
                    }
                })
            }
        }
    }
})();