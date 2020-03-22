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

module.exports = { transformEmployees, convertShifts };

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
