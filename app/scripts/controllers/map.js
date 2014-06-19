'use strict';

app.controller("MapCtrl", function ($scope, $location, $routeParams) {
    $scope.sendZip = function (zipcode) {
        $location.path("/search/" + zipcode + "/crossfit");
    };
});

app.controller("SearchCtrl", function ($scope, $routeParams, $location, boxMap, $http, $filter, ngGPlacesAPI) {
    $scope.zipCode = $routeParams.zipcode;
    $scope.place = $routeParams.place;
    $scope.websites = [];

    $scope.getLocation = function (details) {
        var location = ( details && details.geometry && details.geometry.location ),
            out = [ ];
        if (!location) {
            return "location not available";
        } else {
            angular.forEach(location, function (value, key) {
                this.push($filter("number")(value, 4));
            }, out);
            return out.join(", ");
        }
    };

        boxMap.getGeoCoder().geocode({
            address: $scope.zipCode
        }, function (results, status) {
            var lat = results[ 0 ].geometry.location.lat(),
                lng = results[ 0 ].geometry.location.lng();
                
            $scope.searchplace = results[ 0 ] && results[ 0 ].formatted_address;

            boxMap.placeService.textSearch({
                query: $scope.place,
                type: $scope.place,
                location: new boxMap._maps.LatLng(lat, lng),
                radius: 50
            }, function (data) {
                $scope.$apply(function () {
                    $scope.data = data;
                    console.log("data in callback:", data)
                    $.each($scope.data, function(index, place) {
                    	// console.log("place is ",place);
                    	ngGPlacesAPI.placeDetails({reference: place.reference}).then(
                    	    	function (data) {
                    	    		$scope.data[index].website = data.website;
                    	    		$scope.data[index].phone = data.formatted_phone_number;
                    	    		console.log($scope.data);
                    	    	});
                    });
                });
            });
        });
});

app.controller("ResultsCtrl", function ($scope, $routeParams, $location, boxMap, scrollToElem) {
    $scope.$watch(function () {
        return boxMap.selectedMarkerIdx;
    }, function (newVal) {
        var fn = function () {
            $scope.selectedMarker = newVal;
            if (newVal !== null) {
                scrollToElem.scrollTo("listItem" + newVal);
            }
        };
        fn();
    });
});

app.directive("gmap", [ "boxMap", function (boxMap) {
    return {
        restrict: "EA",
        scope: {
            data: "=data"
        },
        link: function (scope, elem, attrs) {
            var map = boxMap.initializeMap(elem[ 0 ]),
                markers = [ ];
            boxMap.initPlacesService(map);

            var renderMap = function (mapData) {
                if (!mapData) {
                    return;
                }
                boxMap.placeMarkers(mapData);
            };
            scope.$watch("data", function (newval) {
                boxMap.initializeMap(elem[ 0 ]);
                renderMap(newval);
            });
        }
    };
}]);













