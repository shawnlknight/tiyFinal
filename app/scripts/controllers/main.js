'use strict';

app.controller('MainCtrl', function ($scope, $location, Post) {
	$scope.posts = Post.all;
	$scope.isCollapsed = true;
	$scope.post = {content: '', title: '', date: ''};

	$scope.submitPost = function () {
	  Post.create($scope.post).then(function (postId) {
	    $location.path('library');
	    $scope.post = {content: '', title: '', date: ''};
	  });
	};

	$scope.deletePost = function (postId) {
		Post.delete(postId);
	};
});


