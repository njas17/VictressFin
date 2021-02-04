var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt');

//const utils = require('../utils');
const jwt = require('jsonwebtoken');
const { request } = require('../app');

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
  db(`SELECT uid, concat_ws(' ', firstname,lastname) as fullname, email, password FROM users where email = ?;`, req.params.email)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
