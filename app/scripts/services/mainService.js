'use strict';

// app.factory('$firebaseArr', ['$firebase', 'FIREBASE_URL', '$filter', function($firebase, FIREBASE_URL $filter) {
//     return function(ref) {
//         var dataObj = $firebase(ref);
//         var dataArr = angular.extend([], dataObj);

//         dataObj.$on('change', function() {
//             dataArr.length = 0;
//             angular.extend(dataArr, $filter('orderByPriority')(dataObj));
//         });
//         console.log(dataArr);
//         return dataArr;
//     }
// }]);

app.factory('Post',
  function ($firebase, FIREBASE_URL, User) {
    var ref = new Firebase(FIREBASE_URL + 'posts');

    var posts = $firebase(ref);

    var Post = {
      all: posts,
      create: function (post) {
        if (User.signedIn()) {
          var user = User.getCurrent();

          post.owner = user.username;

          return posts.$add(post).then(function (ref) {
            var postId = ref.name();

            user.$child('posts').$child(postId).$set(postId);

            return postId;
          });
        }
      },
      find: function (postId) {
        return posts.$child(postId);
      },
      delete: function (postId) {
        if (User.signedIn()) {
          var post = Post.find(postId);

          post.$on('loaded', function () {
            var user = User.findByUsername(post.owner);

            posts.$remove(postId).then(function () {
              user.$child('posts').$remove(postId);
            });
          });
        }
      },
      update: function (postId, postData) {
        if (User.signedIn()) {
          var post = Post.find(postId);

          post.$on('loaded', function () {
            var user = User.findByUsername(post.owner);

            posts.$save(postId).then(function () {
              post.$set(postData);
              user.$child('posts').$save(postId);
            });
          });
        }
      }
    };

    return Post;
  });