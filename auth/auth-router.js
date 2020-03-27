const router = require('express').Router();
const bc = require("bcryptjs")
const userMD = require("../models/userModel")

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hashpass = bc.hashSync(user.password, 12)
  user.password = hashpass
  userMD.add(user)
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    res.status(500).end()
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
