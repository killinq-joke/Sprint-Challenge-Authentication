const router = require('express').Router();
const bc = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userMD = require("../models/userModel")
const secret = require("../api/secret")

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
  const {username, password} = req.body
  userMD.findBy({username})
  .then(user => {
    if(user && bc.compareSync(password, user.password)) {
      const payload = {
        sub: user.id,
        username: user.username
      }
      const options = {
        expiresIn: 300
      }
      const token = jwt.sign(payload, secret, options);
      res.status(200).json({token})
    } else {
      res.status(401).json({ you: "shall not pass!" })
    }
    
  })
  .catch(err => {
    res.status(500).end()
  })
  
});

module.exports = router;
