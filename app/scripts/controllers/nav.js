'use strict';

app.controller('NavCtrl', function ($scope, $location, Post, Auth) {
    // $scope.post = {content: '', title: ''};

    // $scope.submitPost = function () {
    //   Post.create($scope.post).then(function (postId) {
    //     $location.path('/posts/' + postId);
    //     $scope.post = {content: '', title: ''};
    //   });
    // };

    $scope.logout = function () {
      Auth.logout();
    };

  });