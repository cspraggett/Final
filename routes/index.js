const express = require("express");
const router = express.Router();
const client = require("../db/index");

let employees;
let shifts;
let employeeShifts;

router.get("/", (req, res) => {
  console.log("in / ");
  res.send("Holla");
});

const makeShiftState = (shifts, employeeShifts) => {
  const state = [];
  for (const shift of shifts) {
    const s = shift;
    s.employees = [];
    for (const employee of employeeShifts) {
      if (employee.shift_id === shift.id) {
        s.employees.push(employee.employee_id);
      }
    }
    state.push(s);
  }
  return state;
};

router.get("/employees", (req, res) => {
  client
    .query(
      `
    select * from employees;
  `
    )
    .then(result => {
      employees = result.rows;
      // res.json(result.rows);
      console.log(employees);
    })
    .catch(error => console.log(error));
});

router.get("/initial", (req, res) => {
  Promise.all([
    client.query(
      `
        select * from shifts;
      `
    ),
    client.query(
      `
        select * from employeeshifts;
      `
    )
  ]).then(all => {
    shifts = all[0].rows;
    employeeShifts = all[1].rows;
    // res.json(makeShiftState(shifts, employeeShifts));
    console.log("shifts:", shifts);
    console.log("employeeShifts:", employeeShifts);
  });
});

module.exports = router;
