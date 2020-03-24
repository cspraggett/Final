const {
  getCurrShifts,
  postShifts,
  deleteEmployeeFromShift
} = require("./queries");

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
        [shift.id]: {
          startTime: Number(shift.start_time.slice(0, 2)),
          endTime: (Number(shift.start_time.slice(0, 2)) + shift.duration) % 12,
          capacity: shift.num_of_employees,
          employees: []
        }
      }
    };
    for (const employee of employeeShifts) {
      if (employee.shift_id === shift.id) {
        state[shift.day_id].shifts[shift.id].employees.push(
          employee.employee_id
        );
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

const convertDBData = data => data.map(curr => curr.employee_id);

const addNewEmployeesToShift = (oldEmp, newEmp, shiftID) => {
  console.log(oldEmp);
  const existingData = convertDBData(oldEmp);
  newEmp.forEach(curr => {
    if (!existingData.includes(curr)) {
      console.log(`${curr} isn't in the db ${existingData}`);
      postShifts({ employee_id: curr, shift_id: shiftID }).catch(error =>
        console.log(error)
      );
    }
  });
};

const removeEmployeeFromShift = (oldEmp, newEmp, shiftID) => {
  const existingData = convertDBData(oldEmp);
  existingData.forEach(curr => {
    if (!newEmp.includes(curr)) {
      deleteEmployeeFromShift({ employee_id: curr, shift_id: shiftID })
        .then(() => console.log(`${curr} has been removed from the databasse`))
        .catch(error => console.log(error));
    }
  });
};

getCurrentShifts = data => {
  shiftID = parseInt(Object.keys(data));
  const shifts = getCurrShifts(shiftID)
    .then(result =>
      removeEmployeeFromShift(
        [...result.rows],
        data[shiftID].employees,
        shiftID.then(results => {
          addNewEmployeesToShift(
            [...result.rows],
            data[shiftID].employees,
            shiftID
          );
        })
      )
    )
    .catch(error => console.log(result));
};
module.exports = { transformEmployees, convertShifts, getCurrentShifts };

// const makeShiftState = (shifts, employeeShifts) => {
//   const state = [];
//   for (const shift of shifts) {
//     const s = shift;
//     s.employees = [];
//     for (const employee of employeeShifts) {
//       if (employee.shift_id === shift.id) {
//         s.employees.push(employee.employee_id);
//       }
//     }
//     state.push(s);
//   }
//   return state;
// };
