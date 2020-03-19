import React, { useEffect, useState } from "react";
import { Grommet, Box, Layer } from "grommet";
import axios from "axios";
import CalendarSelector from "./components/CalendarSelector";
import EmployeeList from "./components/EmployeeList";
import AddButton from "./components/AddButton";
import HeaderBar from "./components/Header";
import ScheduleView from "./components/ScheduleView";
import AddEmployee from "./components/AddEmployee";

let selectedEmployee;

function revisedRandId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
}

function App() {
  const [show, setShow] = useState();
  const [employees, setEmployees] = useState({});
  const [days, setDays] = useState({});

  // const [employees, setEmployees] = useState({
  //   1: { name: "John Doe", email: "jd@gmail.com" },
  //   2: { name: "Jane Doe", email: "janed@gmail.com" },
  //   3: { name: "Robert Sh", email: "robs@gmail.com" },
  //   4: { name: "Ro Smith", email: "ros@gmail.com" },
  //   5: { name: "Robert h", email: "rbs@gmail.com" },
  //   6: { name: "R Smith", email: "rob@gmail.com" },
  //   7: { name: "Ro Smith", email: "obs@gmail.com" }
  // });

  // const [days, setDays] = useState({
  //   0: {
  //     label: "Sunday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 4, employees: [1, 2] }
  //     }
  //   },
  //   1: {
  //     label: "Monday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 2] }
  //     }
  //   },
  //   2: {
  //     label: "Tuesday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [1, 3] }
  //     }
  //   },
  //   3: {
  //     label: "Wednesday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [4, 5] }
  //     }
  //   },
  //   4: {
  //     label: "Thursday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [3, 7] }
  //     }
  //   },
  //   5: {
  //     label: "Friday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [2, 1] }
  //     }
  //   },
  //   6: {
  //     label: "Saturday",
  //     shifts: {
  //       shiftID: { startTime: 9, endTime: 5, capacity: 3, employees: [3, 5] }
  //     }
  //   }
  // });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/employees")
  //     .then(response => {setEmployees(response.data)})
  //     .catch(error => console.log("in error", error));
  // }, []);

  const updateEmployees = newValue => {
    const id = revisedRandId();
    // console.log(newValue);
    setShow(false);
    setEmployees({ ...employees, [id]: newValue });

    // console.log("employees:", employees);
  };
  // setshift({... days.shifts})// spread each layer for shift to show which layer to update

  const ScheduleViews = Object.keys(days).map(dayId => (
    <ScheduleView
      shifts={days[dayId].shifts}
      dayId={dayId}
      employees={employees}
      label={days[dayId].label}
    />
  ));

  // function App() {
  //   const [show, setShow] = useState();
  //   const [employees, setEmployees] = useState([0]);
  //   const [shifts, setShifts] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.log("in error", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/initial")
      .then(response => {
        setDays(response.data);
      })
      .catch(error => console.log("in error", error));
  }, []);

  const updateAppointment = (empId, shiftId) => {
    axios
      .post("http://localhost:5000/shift", {
        employee_id: empId,
        shift_id: shiftId
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const removeAppointment = (empId, shiftId) => {
    console.log("in removeAppointment", empId, shiftId);
    axios
      .delete(`http://localhost:5000/shift/${empId}/${shiftId}`, {
        employee_id: empId,
        shift_id: shiftId
      })
      // .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    removeAppointment(3, 1);
  }, []);
  // useEffect(() => {
  //   setEmployees([
  //     { name: "John Doe", email: "jd@gmail.com" },
  //     { name: "Jane Doe", email: "janed@gmail.com" },
  //     { name: "Robert Smith", email: "robs@gmail.com" }
  //   ]);
  // }, []);

  return (
    <Grommet>
      <HeaderBar></HeaderBar>
      <Box direction="row">
        <Box
          width={"small"}
          align="center"
          border={{
            size: "small",
            color: "brand"
          }}
        >
          <CalendarSelector />

          <EmployeeList emp={Object.values(employees)} />
          <AddButton onClick={() => setShow(true)} />
        </Box>
        <Box direction="row">{ScheduleViews}</Box>
      </Box>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <AddEmployee
            onSave={updateEmployees}
            starting={
              selectedEmployee && selectedEmployee
            } /*this only sets the starting data if it exists. Trust me*/
            onClose={() => setShow(false)}
          />
        </Layer>
      )}
    </Grommet>
  );
}
export default App;
