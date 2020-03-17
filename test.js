
modal component gets passed through prop 
display show : true || false toggle


const state ={
  employees:{
    1: { name: 'Bob'},
    2: {name: 'Jane'}
  },
  ScheduleID: {
   Monday: {
      shiftID: [{startTime: 9, endTime: 5, capacity: 4, employees: [1,2]}],
      shiftID: [{ startTime: 6, endTime: 12, capacity: 2, employees:[3,6]}]
    },
    Tuesday:{
      shiftID: [{startTime: 9, endTime: 5, capacity: 3, employees: [1,2]}],
      shiftID: [{ startTime: 6, endTime: 12, capacity: 3, employees:[3,6]}]
    }
  }
}

