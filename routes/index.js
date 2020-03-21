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
  res.send("ok... got it!");
  client
    .query(
      `
    DELETE FROM employeeshifts WHERE employee_id = $1 AND shift_id = $2;
  `,

      [data.employee_id, data.shift_id]
    )
    .then(response => console.log("All gone", response))
    .catch(error => console.log(error));
});

router.post("/employees", (req, res) => {
  console.log("post employees:", req.body);
  client
    .query(
      `
    INSERT INTO employees (admin_id, first_name, last_name, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
      [
        req.body.admin_id,
        req.body.first_name,
        req.body.last_name,
        req.body.email
      ]
    )
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
