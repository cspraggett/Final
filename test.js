// modal component gets passed through prop
// display show : true || false toggle

const state = {
  employees: {
    1: { name: "Bob" },
    2: { name: "Jane" },
    3: { name: "gene" },
    4: { name: "tina" },
    5: { name: "louis" },
    6: { name: "linda" },
    7: { name: "teddy" }
  },
  ScheduleID: {
    Monday: {
      day: { startTime: 9, endTime: 5, capacity: 4, employees: [1, 2] }
    },
    Tuesday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    },
    Wednesday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    },
    Thursday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    },
    Friday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    },
    Saturday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    },
    Sunday: {
      shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
    }
  }
};
