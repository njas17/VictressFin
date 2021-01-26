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

// get an event by event id
router.get("/events/:id", (req, res) => {
  db("SELECT e.*, o.name as organization_name FROM events e INNER JOIN users u on uid = e.organizer_id inner join organizations o on oid = u.organization_id WHERE eid = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all organizations
router.get("/organizations/", (req, res) => {
  db("SELECT oid, name FROM organizations;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get an organization by id
router.get("/organizations/:id", (req, res) => {
  db("SELECT * FROM organizations WHERE oid = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all volunteers/applicants by event
router.get("/volunteers/:id", (req, res) => {
  db("SELECT * FROM volunteers WHERE event_id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});




module.exports = router;
