const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(usersList => {
      res.status(200).json(usersList);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the users'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the user'});
    });
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the user'});
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error updating the user'});
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then( () => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error deleting the user'});
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then( userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the users posts'});
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.params.id; 
  Posts.insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the post'});
    });
});

// do not forget to export the router
module.exports = router;