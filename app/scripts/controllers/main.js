'use strict';

app.controller('MainCtrl', function ($scope, $location, Post) {
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
	    $location.path('library');
	    $scope.post = {content: '', title: ''};
	  });
	};

	$scope.deletePost = function (postId) {
		Post.delete(postId);
	};

});