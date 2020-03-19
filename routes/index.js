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

const dayMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const convertShifts = (shifts, employeeShifts) => {
  const state = {};
  for (const shift of shifts) {
    state[shift.day_id] = {
      label: dayMap[shift.day_id],
      shifts: {
        shiftID: {
          startTime: Number(shift.start_time.slice(0, 2)),
          endTime: (Number(shift.start_time.slice(0, 2)) + shift.duration) % 12,
          capacity: shift.num_of_employees,
          employees: []
        }
      }
    };
    for (const employee of employeeShifts) {
      if (employee.shift_id === shift.id) {
        state[shift.day_id].shifts.shiftID.employees.push(employee.employee_id);
      }
    }
  }
  return state;
};

const transformEmployees = employees => {
  let employeeState = {};
  for (const employee of employees) {
    employeeState[employee.id] = {
      name: `${employee.first_name} ${employee.last_name}`,
      email: `${employee.email}`
    };
  }
  return employeeState;
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
      res.json(transformEmployees(employees));
      // console.log("getting employees", transformEmployees(employees));
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
    res.json(convertShifts(shifts, employeeShifts));
  });
});

router.post("/shift", (req, res) => {
  console.log(req.body);
  res.send("ok... got it!");
  client
    .query(
      `
    INSERT INTO employeeshifts (employee_id, shift_id)
      VALUES ($1, $2);
  `,
      [req.body.employee_id, req.body.shift_id]
    )
    .then(results => console.log("It's all good:", results))
    .catch(error => console.log(error));
});

router.delete("/shift/:empId/:shiftId", (req, res) => {
  const data = {
    employee_id: req.params.empId,
    shift_id: req.params.shiftId
  };
  console.log("this is data", data);
  // res.send("ok... got it!");
  // client
  //   .query(
  //     `
  //   DELETE FROM employeeshifts WHERE employee_id = $1 AND shift_id = $2;
  // `,

  //     [req.body.employee_id, req.body.shift_id]
  //   )
  // .then(response => console.log("All gone", response))
  // .catch(error => console.log(error));
});

module.exports = router;
