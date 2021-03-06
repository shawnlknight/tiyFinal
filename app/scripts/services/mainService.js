'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'posts');
  ref.setPriority(0);
  var posts = $firebase(ref);
  console.log("posts are", posts)
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
      console.log("posts are ",posts.$child(postId) )
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