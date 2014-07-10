"use strict";var app=angular.module("tiyFinalApp",["ngCookies","ngResource","ngSanitize","ngRoute","firebase","ui.bootstrap","google-maps","ngGPlaces","underscore"]),underscore=angular.module("underscore",[]);underscore.factory("_",function(){return window._}),app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/random",{templateUrl:"views/random.html",controller:"RandomCtrl"}).when("/library",{templateUrl:"views/library.html",controller:"MainCtrl"}).when("/posts/:postId",{templateUrl:"views/updatepost.html",controller:"PostViewCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/search/:zipcode/:place",{templateUrl:"views/map.html",controller:"SearchCtrl"}).otherwise({redirectTo:"/"})}]).constant("FIREBASE_URL","https://shawn-final.firebaseio.com/"),app.controller("MainCtrl",["$scope","$location","Post",function(a,b,c){a.posts=c.all,a.isCollapsed=!0,a.post={content:"",title:"",date:""},a.submitPost=function(){a.post.created_at=(new Date).getTime(),c.create(a.post).then(function(){b.path("library"),a.post={content:"",title:"",date:""}})},a.deletePost=function(a){c.delete(a)}}]),app.controller("PostViewCtrl",["$scope","$routeParams","$location","Post",function(a,b,c,d){a.post=d.find(b.postId),a.wodId=b.postId,a.updatePost=function(a,b){console.log(a),d.update(a,b),c.path("/library")}}]),app.controller("NavCtrl",["$scope","$location","Post","Auth",function(a,b,c,d){a.logout=function(){d.logout()}}]),app.controller("AuthCtrl",["$scope","$location","Auth","User",function(a,b,c,d){c.signedIn()&&b.path("/"),a.$on("$firebaseSimpleLogin:login",function(){b.path("/")}),a.login=function(){c.login(a.user).then(function(){b.path("/")},function(b){a.error=b.toString()})},a.register=function(){c.register(a.user).then(function(c){d.create(c,a.user.username),b.path("/")},function(b){a.error=b.toString()})}}]),app.controller("MapCtrl",["$scope","$location","$routeParams",function(a,b){a.sendZip=function(a){b.path("/search/"+a+"/crossfit")}}]),app.controller("SearchCtrl",["$scope","$routeParams","$location","boxMap","$filter","ngGPlacesAPI",function(a,b,c,d,e,f){a.zipCode=b.zipcode,a.place=b.place,a.websites=[],a.getLocation=function(a){var b=a&&a.geometry&&a.geometry.location,c=[];return b?(angular.forEach(b,function(a){this.push(e("number")(a,4))},c),c.join(", ")):"location not available"},d.getGeoCoder().geocode({address:a.zipCode},function(b){var c=b[0].geometry.location.lat(),e=b[0].geometry.location.lng();a.searchplace=b[0]&&b[0].formatted_address,d.placeService.textSearch({query:a.place,type:a.place,location:new d._maps.LatLng(c,e),radius:50},function(b){a.$apply(function(){a.data=b,console.log("data in callback:",b),$.each(a.data,function(b,c){f.placeDetails({reference:c.reference}).then(function(c){a.data[b].website=c.website,a.data[b].phone=c.formatted_phone_number,console.log(a.data)})})})})})}]),app.controller("ResultsCtrl",["$scope","$routeParams","$location","boxMap","scrollToElem",function(a,b,c,d,e){a.$watch(function(){return d.selectedMarkerIdx},function(b){var c=function(){a.selectedMarker=b,null!==b&&e.scrollTo("listItem"+b)};c()})}]),app.directive("gmap",["boxMap",function(a){return{restrict:"EA",scope:{data:"=data"},link:function(b,c){var d=a.initializeMap(c[0]);a.initPlacesService(d);var e=function(b){b&&a.placeMarkers(b)};b.$watch("data",function(b){a.initializeMap(c[0]),e(b)})}}}]),app.controller("RandomCtrl",["$scope","$http","_",function(a,b,c){a.isCollapsed=!0,b.get("data/wods.json").success(function(b){a.wods=b.data,console.log("Array of workouts",b.data),a.randomWod=function(){var a=c.random(0,b.data.length),d=b.data[a];console.log("Random workout",d),$(".randomTitle").html(d.title),$(".randomContent").html(d.content)}})}]),app.factory("boxMap",["$rootScope",function(a){var b={};return b._maps=google.maps,b.markers=[],b.selectedMarkerIdx=null,b.initializeMap=function(a,b){b=b||{zoom:4,center:new google.maps.LatLng(32.796518,-79.944385),mapTypeId:google.maps.MapTypeId.ROADMAP,zoomControlOptions:{position:google.maps.ControlPosition.LEFT_BOTTOM},panControlOptions:{position:google.maps.ControlPosition.LEFT_BOTTOM}},this.map&&(delete this.map,this.selectedMarkerIdx=null);var c=this.map=new google.maps.Map(a,b);return c},b.getGeoCoder=function(){return new google.maps.Geocoder},b.initPlacesService=function(a){return this.placeService=new google.maps.places.PlacesService(a),this.placeService},b.placeMarkers=function(b){this.clearAllMarkers();var c=this,d=new google.maps.LatLngBounds;angular.forEach(b,function(b,e){var f,g=new google.maps.LatLng(b.geometry.location.lat(),b.geometry.location.lng());c.markers.push(f=new google.maps.Marker({map:c.map,position:g})),d.extend(g),google.maps.event.addListener(f,"click",function(){c.selectedMarkerIdx=e,a.$apply()})}),c.map.fitBounds(d)},b.clearAllMarkers=function(){angular.forEach(this.markers,function(a){a.setMap(null)}),this.markers=[]},b}]),app.factory("scrollToElem",["$window","$timeout",function(a,b){return{scrollTo:function(c){var d=document.getElementById(c);return d?void b(function(){d.scrollIntoView()},100):void a.scrollTo(0,0)}}}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope",function(a,b,c){var d=new Firebase(b),e=a(d),f={register:function(a){return e.$createUser(a.email,a.password)},signedIn:function(){return null!==e.user},login:function(a){return e.$login("password",a)},logout:function(){e.$logout()}};return c.signedIn=function(){return f.signedIn()},f}]),app.factory("User",["$firebase","$rootScope","FIREBASE_URL","Auth",function(a,b,c){function d(a){b.currentUser=g.findByUsername(a)}var e=new Firebase(c+"users"),f=a(e),g={create:function(a,b){f[b]={md5_hash:a.md5_hash,username:b,$priority:a.uid},f.$save(b).then(function(){d(b)})},findByUsername:function(a){return a?f.$child(a):void 0},getCurrent:function(){return b.currentUser},signedIn:function(){return void 0!==b.currentUser}};return b.$on("$firebaseSimpleLogin:login",function(b,c){var f=a(e.startAt(c.uid).endAt(c.uid));f.$on("loaded",function(){d(f.$getIndex()[0])})}),b.$on("$firebaseSimpleLogin:logout",function(){delete b.currentUser}),g}]),app.factory("Post",["$firebase","FIREBASE_URL","User",function(a,b,c){var d=new Firebase(b+"posts");d.setPriority(0);var e=a(d);console.log("posts are",e);var f={all:e,create:function(a){if(c.signedIn()){var b=c.getCurrent();return a.owner=b.username,e.$add(a).then(function(a){var c=a.name();return b.$child("posts").$child(c).$set(c),c})}},find:function(a){return console.log("posts are ",e.$child(a)),e.$child(a)},"delete":function(a){if(c.signedIn()){var b=f.find(a);b.$on("loaded",function(){var d=c.findByUsername(b.owner);e.$remove(a).then(function(){d.$child("posts").$remove(a)})})}},update:function(a,b){if(c.signedIn()){var d=f.find(a);d.$on("loaded",function(){var f=c.findByUsername(d.owner);e.$save(a).then(function(){d.$set(b),f.$child("posts").$save(a)})})}}};return f}]);