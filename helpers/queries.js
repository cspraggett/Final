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

const deleteEmployeeFromShift = data => {
  return client.query(
    `
    DELETE FROM employeeshifts WHERE employee_id = $1 AND shift_id = $2;
  `,

    [data.employee_id, data.shift_id]
  );
};

const addEmployee = data => {
  return client.query(
    `
    INSERT INTO employees (admin_id, first_name, last_name, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
    [data.admin_id, data.first_name, data.last_name, data.email]
  );
};

module.exports = {
  getEmployees,
  getShifts,
  postShifts,
  deleteEmployeeFromShift,
  addEmployee
};
