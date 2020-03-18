// const state ={
//   employees:{
//     1: { name: 'Bob'},
//     2: {name: 'Jane'},
//     3: {name: 'gene'},
//     4: {name: 'tina'},
//     5: {name: 'louis'},
//     6: {name: 'linda'},
//     7: {name: 'teddy'}
//   },
//   ScheduleID: {
//    0: { 
//      label:"Sunday",
//     shiftID: {startTime: 9, endTime: 5, capacity: 4, employees: [1,2]}
//     },
//     1:{
//       label:"Monday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [1,2]}
//     },
//     2:{
//       label:"Tuesday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [1,3]}
//     },
//     3:{
//       label:"Wednesday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [4,5]}
//     },
//     4:{
//       label:"Thursday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [3,7]}
//     },
//     5:{
//       label:"Friday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [2,1]}
//     },
//     6:{
//       label:"Saturday",
//       shiftID: {startTime: 9, endTime: 5, capacity: 3, employees: [3,5]}
//     }
//   }
// }


export function getEmployeesForShift(employees, shifts, shiftID) {
  // console.log(employees, day, shiftID)
  return shifts[shiftID].employees.map(employeeId => 
    employees[employeeId]
  )
} 