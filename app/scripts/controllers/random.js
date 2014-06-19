app.controller('RandomCtrl', function ($scope, $http, _) {
	$scope.isCollapsed = true;
	$http.get("data/wods.json").success(function (results) {
		$scope.wods = results.data;
		console.log('Array of workouts', results.data);

		$scope.randomWod = function () {
		    var randomizer = _.random(0, results.data.length);
			var workout = results.data[randomizer];
			console.log('Random workout', workout);
			$(".randomTitle").html(workout.title);
			$(".randomContent").html(workout.content);

		};
	});
});


























