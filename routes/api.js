var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// get all events
router.get("/events/", (req, res) => {
  db("SELECT eid, e.name, closingdate, e.status, e.description, e.contactname, e.contactnum, totalvolunteer, o.name as organization_name FROM events e INNER JOIN users u on uid = e.organizer_id inner join organizations o on oid = u.organization_id;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});




module.exports = router;
