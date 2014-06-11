'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, $location, Post) {

    $scope.post = Post.find($routeParams.postId);
    $scope.wodId = $routeParams.postId;
    $scope.updatePost = function (postId, postData) {
    	console.log(postId);
		Post.update(postId, postData);
		$location.path('/library');

	};

  });