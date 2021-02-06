var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt');

const utils = require('../auth/utils');
const jwt = require('jsonwebtoken');

router.use(express.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//insert a user
router.post("/users", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    let strSql = "INSERT INTO USER SET ?;" + req.body;
    console.log(strSql);

    db("INSERT INTO users SET ?;", req.body).then(results => {
      res.send(results.data);
    }).catch(err => res.status(500).send(err));
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// get user by email to check any duplicate email in the system
router.get("/users/:email", function (req, res, next) {
  db("SELECT uid, concat_ws(' ', firstname,lastname) as fullname, email, password, `group` FROM users where email = ?;", req.params.email)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// validate the user credentials
router.post('/users/signin', async function (req, res) {
  console.log("Validating user credentials...");
  const user = req.body.email;
  const pwd = req.body.password;
  const userObj = req.body.user;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
      return res.status(400).json({
          error: true,
          message: "Username or Password is required."
      });
  }

  if (!userObj) return res.status(400).send('Cannot find user');     

  try{
      const comparison = await bcrypt.compare(pwd, userObj.password);

      if (comparison) {
          // user matched
          const token = utils.generateToken(userObj);
          // get basic user details
          const usr = utils.getCleanUser(userObj);
          // return the token along with user details
          return res.json({ user: usr, token });            
      } else
          res.status(401).send("Email and password does not match")
      
  } catch(error) {
      res.status(500).send(error);
  }

  console.log("user is validated with token....")
});

module.exports = router;
