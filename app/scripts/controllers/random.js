// app.controller('randomCtrl' function ($scope, $location, wod) {

// 	var randomizer = Math.floor(Math.random()*wod.length);
// 	var workout = window.wod = wod[randomizer];
// 		console.log(workout);

// });

app.controller("RandomCtrl", function ($scope, $firebase, orderByPriorityFilter ) { 

        var ref = new Firebase('https://shawn-final.firebaseio.com/');

        $scope.posts = $firebase(ref);

        $scope.$watchCollection('posts', function() {
          console.log('make array', orderByPriorityFilter($scope.posts));   
        }); 

        $scope.addWod = function(e) {

          if (e.keyCode != 13) return;

          $scope.posts.$add({title: $scope.title, content: $scope.content});
          console.log('posts are', posts);
          $scope.content = "";
        };
        var randomizer = Math.floor(Math.random() * $scope.posts.length);
        console.log('random is', randomizer);

      });