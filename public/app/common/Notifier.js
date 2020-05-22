/**
 * Created by nnaeednamrod on 2/18/17.
 */
angular.module('LoanerLaptopSurveyApp').value('Toastr',toastr);

angular.module('LoanerLaptopSurveyApp').factory('Notifier', function(Toastr)
{
	return {
		notify: function(msg) {
			Toastr.success(msg);
			console.log(msg);
		},
		error: function(msg){
			Toastr.error(msg);
			console.log(msg);
		}
	};
});