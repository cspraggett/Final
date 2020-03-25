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

const getCurrShifts = id => {
  return client.query(
    `
    select employee_id 
    from employeeshifts 
    where shift_id = $1
  `,
    [id]
  );
};

const postShifts = newShift => {
  console.log("in postShifts", newShift);
  return client.query(
    `
    INSERT INTO employeeshifts (employee_id, shift_id)
      VALUES $1;
  `,
    [newShift]
  );
};

const deleteEmployeeFromShift = data => {
  console.log("in deleteEmployeeFromShift", data);
  return client.query(
    `
    DELETE FROM employeeshifts WHERE shift_id = $1;
  `,

    [data]
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

const updateEmployee = data => {
  return client.query(
    `
  UPDATE employees SET first_name = $1, last_name = $2,
    email = $3 WHERE id = $4
`,
    [data.first_name, data.last_name, data.email, data.id]
  );
};
const deleteEmployee = id => {
  console.log("in deleteEmployee:", id);
  client.query(
    `
    DELETE FROM employees WHERE id = $1
  `,
    [id]
  );
};

module.exports = {
  getEmployees,
  getShifts,
  postShifts,
  deleteEmployeeFromShift,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getCurrShifts
};
