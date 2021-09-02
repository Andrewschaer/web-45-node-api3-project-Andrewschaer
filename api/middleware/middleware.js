const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  Users.getById(id)
    .then(possibleUser => {
      if (possibleUser) {
        req.user = possibleUser;
        next();
      } else {
        res.status(404).json({ message: 'user not found'});
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };