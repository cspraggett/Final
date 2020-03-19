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

  const updateEmployees = newValue => {
    const id = revisedRandId();
    setShow(false);
    setEmployees({ ...employees, [id]: newValue });
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

  const updateShift = (empId, shiftId) => {
    axios
      .post("http://localhost:5000/shift", {
        employee_id: empId,
        shift_id: shiftId
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const removeShift = (empId, shiftId) => {
    console.log("in removeAppointment", empId, shiftId);
    axios
      .delete(`http://localhost:5000/shift/${empId}/${shiftId}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const updateEmployees = employee => {
    axios.put("http://localhost:5000/employees", {
      {...employee}
    });
  };

  // useEffect(() => {
  //   removeAppointment(1, 1);
  // }, []);

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
