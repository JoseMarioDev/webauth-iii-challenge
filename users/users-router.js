const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

//get users
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.user.username, users }); //returning who you're logged in as, bcuz of restricted
    })
    .catch(err => res.send(err));
});

module.exports = router;
