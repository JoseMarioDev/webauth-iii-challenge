const router = require('express').Router();
const Positions = require('./positions-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Positions.find()
    .then(positions => {
      res.json(positions);
    })
    .catch(err => res.send(err));
});

router.post('/register', restricted, (req, res) => {
  let position = req.body;
  Positions.add(position)
    .then(newPosition => {
      res.status(201).json(newPosition);
    })
    .catch(err => {
      res.status(500).json({ message: 'new position not added' });
    });
});

module.exports = router;
