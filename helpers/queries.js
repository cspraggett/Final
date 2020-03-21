const client = require("../db/index");

const getEmployees = (req, res) => {
  return client.query(
    `
    select * from employees;
  `
  );
};

const getShifts = () => {
  return Promise.all([
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
  ]);
};

const postShifts = newShift => {
  console.log("in postShifts", newShift);
  return client.query(
    `
    INSERT INTO employeeshifts (employee_id, shift_id)
      VALUES ($1, $2);
  `,
    [newShift.employee_id, newShift.shift_id]
  );
};

module.exports = { getEmployees, getShifts, postShifts };
