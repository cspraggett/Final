const express = require("express");
const router = express.Router();
const client = require("../db/index");

router.get("/employees", (req, res) => {
  console.log("in get");
  console.log(process.env);
  client
    .query(
      `
    select * from employees;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/shifts", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from shifts;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/admins", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from admins;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/availability", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from availability;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/days", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from days;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/employeeshifts", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from days;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/schedules", (req, res) => {
  console.log("in get");
  client
    .query(
      `
    select * from schedules;
  `
    )
    .then(result => {
      console.log(result.rows);
      res.json(result.rows);
    });
});

router.get("/", (req, res) => {
  console.log("in / ");
  res.send("Holla");
});

module.exports = router;
