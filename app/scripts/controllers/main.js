'use strict';

app.controller('MainCtrl', function ($scope, Post) {
	$scope.posts = Post.all;

	// $scope.post = {'content': '', 'title': ''};

	// $scope.submitPost = function () {
	//   Post.create($scope.post).then(function () {
	//     $scope.post = {'content': '', 'title': ''};
	//   });
	// };

	$scope.post = {content: '', title: ''};

	$scope.submitPost = function () {
	  Post.create($scope.post).then(function (postId) {
	    $location.path('/posts/' + postId);
	    $scope.post = {content: '', title: ''};
	  });
	};

	$scope.updatePost = function (postId) {
		Post.update(postId);
	};

	$scope.deletePost = function (postId) {
		Post.delete(postId);
	};

});