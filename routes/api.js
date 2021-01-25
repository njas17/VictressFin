var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.get("/users/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT id, name FROM users WHERE id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/categories", (req, res) => {
  // Send back the full list of items
  db("SELECT category_name as text, id as value FROM category ORDER BY category_name ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/contacts/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT name as text, id as value FROM contacts WHERE user_id = ? ORDER BY name ASC;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get loan data 
router.get("/loans/:id", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM loan WHERE id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get loan data (summary)
//id = user id
//type = 'borrow' or 'lend'
router.get("/loans/summary/:id/:type", (req, res) => {
  // Send back the full list of items
  db("SELECT l.id, l.date, l.remarks, c.name, c.contact_number, l.initial_amount, l.status, "
   + "cat.category_name, SUM(IFNULL(p.amount_paid,0)) AS totalpaid, "
   + "l.initial_amount - SUM(IFNULL(p.amount_paid, 0)) AS currentamount "
   + "FROM loan l LEFT JOIN payment p ON l.id = p.loan_id "
   + "INNER JOIN contacts c ON l.contact_id = c.id "
   + "LEFT JOIN category cat ON l.category_id = cat.id "
   + "WHERE l.user_id = ? AND l.type = ?"
   + "GROUP BY l.id;",
    [req.params.id,req.params.type])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//get threshold status data
//ignore the threshold period and see if it is feasible without it or not
//logically we do not want people to accumalate loans more than the limit regardless of the period
//if user want the threshold limited to the threshold period only then the API would be like:
///threshold/:id/:period (where period will get a value of yearly or mmonthly)
router.get("/threshold/:id/", (req, res) => {
  // Send back the full list of items
  let sqlStr = "select b.threshold_limit, (sum(a.amt) - sum(a.paid)) cur_amt "
    + "from (select sum(initial_amount) amt, 0 paid from loan where user_id =1 and status = 'active' and type = 'borrow' "
    + " union all select 0 amt, sum(amount_paid) paid from payment p "
    + " right join loan l on p.loan_id= l.id  where user_id =1 and status = 'active' and type = 'borrow') a, users b "
    + " where b.id = ?;"

  db(sqlStr, req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//insert a borrow loan info
router.post("/loans", function(req, res, next) {
  //your code here
  db("INSERT INTO loan SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//insert a paid info
router.post("/payments", function(req, res, next) {
  //your code here
  db("INSERT INTO payment SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//get all paid info of a loan
router.get("/payments/:id", function(req, res, next) {
  //your code here
  db("SELECT date as date_entered, amount_paid FROM payment WHERE loan_id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//delete loan and payment data
router.delete("/loans/:id", function(req, res, next) {
  //your code here
  db("DELETE FROM payment WHERE loan_id = ?; DELETE FROM loan WHERE id = ?;", [req.params.id,req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//update status to complete/done
router.put("/loans/:id/:status", (req, res) => {
  db("UPDATE loan SET status = ? WHERE id = ?;", [req.params.status,req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
