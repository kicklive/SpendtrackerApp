angular.module("spendtrackerapp").value("toast", toastr);

angular.module("spendtrackerapp").factory("notifierService", function(toast) {
  return {
    notify: function(msg) {
      toast.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      toast.error(msg);
      console.log(msg);
    }
  };
});
