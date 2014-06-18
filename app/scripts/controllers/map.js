'use strict';

app.controller("MapCtrl", function ($scope, $location, $routeParams) {
    var placeurl = $routeParams.place || "";
    $scope.sendZip = function (zipcode) {
        $location.path("/search/" + zipcode + "/crossfit");
    };

});

app.controller("SearchCtrl", function ($scope, $routeParams, $location, boxMap, $http, $filter, ngGPlacesAPI) {
    $scope.zipCode = $routeParams.zipcode;
    $scope.place = $routeParams.place;


    $scope.details = ngGPlacesAPI.placeDetails({reference: "CoQBdAAAAP1EmHgm0-j4JyjwMVweI6mPOh9JsaiVsFy_FnkknCAj9-P9i-OZiVsrJaNKbb5NlcGkUl4FE9gJOzyaHx6_iA8DC7PZf3JAxw_aTducLeVRVA6WmsxEN_hXJRh-pBnJ02eB2i5LyS5vgXlgkV9uTeg-RdlEB2wRN9-KO-PFsezlEhDSUPGXRYxyYbw8HUVpGPkLGhTTqAvRkize-R5z8cAeg-bj_ksFkQ"}).then(
    	function (data) {
    		console.log(data);
    		return data;

    	});

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

            // $scope.$apply(function () {
            //     $scope.searchplace = results[ 0 ] && results[ 0 ].formatted_address;
            // });

            boxMap.placeService.textSearch({
                query: $scope.place,
                type: $scope.place,
                location: new boxMap._maps.LatLng(lat, lng),
                radius: 50
            }, function (data) {
                $scope.$apply(function () {
                    $scope.data = data;

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













