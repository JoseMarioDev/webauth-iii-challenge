const router = require('express').Router();

const Departments = require('../departments/departments-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
  Departments.find()
    .then(depts => {
      res.status(201).json(depts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/register', restricted, (req, res) => {
  let dept = req.body;
  console.log(dept);
  Departments.add(dept)
    .then(newDept => {
      res.status(201).json(newDept);
    })
    .catch(err => {
      res.status(500).json({ message: 'new dept not added' });
    });
});

module.exports = router;
