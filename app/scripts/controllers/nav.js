'use strict';

app.controller('NavCtrl', function ($scope, $location, Post, Auth) {


    $scope.logout = function () {
      Auth.logout();
    };

  });