'use strict';


app.controller('MapCtrl', function ($scope) {
    $scope.map = {
	    center: {
	        latitude: 32.796518,
	        longitude: -79.944385
	    },
	    zoom: 10,
	};
	$scope.myMarkers = [
		{
			"latitude": 32.796518,
			"longitude": -79.944385,

		}
	];
	$scope.markers = $scope.myMarkers;

  });