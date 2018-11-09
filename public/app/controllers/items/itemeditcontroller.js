(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ItemEditController', EditItem)

    EditItem.$inject = ['$stateParams', 'itemservice', '$state', 'notifierService', '$window'];

    function EditItem($stateParams, itemservice, $state, notifierService, $window) {
        /* jshint validthis:true */
        var vm = this;


        activate();

        function activate() {
            vm._id = $stateParams.id;
            vm.errmsg = '';
            vm.errorIndicator = 0;
            vm.flag = 1;
            //debugger;
            itemservice.SearchById(vm._id).then(function(ret) {
                //debugger;
                if (ret.status == 200) {
                    vm.Item = ret.data;
                } else {
                    notifierService.selectmsg(ret.code, ret.message);
                }
            });

            vm.SaveEditedItem = function() {
                var formData = {
                        'id': vm._id,
                        'UPC': vm.Item.UPC,
                        'ItemDescription': vm.Item.ItemDescription,
                        'Price': vm.Item.Price
                    }
                    //debugger;
                itemservice.Update(formData).then(function(ret) {
                    //debugger;
                    vm.flag = -1;
                    if (ret.status == 200) {
                        notifierService.notify('Product updated successfully.');
                    } else {
                        notifierService.selectmsg(ret.code, ret.message);
                    }
                });

            }




            vm.Delete = function() {
                itemservice.DeleteItem(vm._id).then(function(ret) {
                    if (ret.status == 200) {
                        $state.go('itemsearch', { showGrid: 1, flag: -1 });
                        notifierService.notify('Item deleted successfully.');
                    }
                });
            }

            vm.GoBack = function() {
                vm.ItemSearch.$setPristine();
                vm.ItemSearch.$setUntouched();
                $state.go('itemsearch', { showGrid: 1, flag: vm.flag });
            }
        }
    }
})();