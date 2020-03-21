const express = require("express");
const router = express.Router();
const client = require("../db/index");

const { transformEmployees, convertShifts } = require("../helpers/helpers");
const {
  getEmployees,
  getShifts,
  postShifts,
  deleteEmployeeFromShift,
  addEmployee
} = require("../helpers/queries");

let employees;
let shifts;
let employeeShifts;

router.get("/", (req, res) => {
  console.log("in / ");
  res.send("Holla");
});

router.get("/employees", (req, res) => {
  getEmployees()
    .then(result => {
      // console.log("in getEmployees", result);
      employees = result.rows;
      res.json(transformEmployees(employees));
      // console.log("getting employees", transformEmployees(employees));
    })
    .catch(error => console.log(error));
});

router.get("/initial", (req, res) => {
  getShifts().then(all => {
    shifts = all[0].rows;
    employeeShifts = all[1].rows;
    res.json(convertShifts(shifts, employeeShifts));
  });
});

router.post("/shift", (req, res) => {
  // console.log(req.body);
  res.send("ok... got it!");
  postShifts(req.body)
    .then(results => console.log("It's all good:", results))
    .catch(error => console.log(error));
});

router.delete("/shift/:empId/:shiftId", (req, res) => {
  const data = {
    employee_id: req.params.empId,
    shift_id: req.params.shiftId
  };

  deleteEmployeeFromShift(data)
    .then(response => console.log("All gone", response))
    .catch(error => console.log(error));
});

router.post("/employees", (req, res) => {
  addEmployee(req.body)
    .then(response => {
      console.log("All good");
      res.send(response.rows[0]);
    })
    .catch(error => console.log(error));
});

router.put("/employees", (req, res) => {
  console.log("put /employess", req.body);
  client
    .query(
      `
    UPDATE employees SET first_name = $1, last_name = $2,
      email = $3 WHERE id = $4
  `,
      [req.body.first_name, req.body.last_name, req.body.email, req.body.id]
    )
    .then(response => {
      console.log("update is good:", response.body);
      res.send(response.body);
    })
    .catch(error => console.log(error));
});

router.delete("/employees/:id", (req, res) => {
  console.log("delete /employees", req.params.id);
  client
    .query(
      `
    DELETE FROM employees WHERE id = $1
  `,
      [req.params.id]
    )
    .then(response => {
      console.log("Delete worked", response.body);
      res.send(response.body);
    })
    .catch(error => console.log(error));
});

module.exports = router;
