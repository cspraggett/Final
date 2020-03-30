import React, { useEffect, useState } from "react";
import { Grommet, Box, Layer, Grid, materialLight } from "grommet";
import axios from "axios";
import CalendarSelector from "./components/CalendarSelector";
import EmployeeList from "./components/EmployeeList";
import AddButton from "./components/AddButton";
import HeaderBar from "./components/Header";
import ScheduleView from "./components/ScheduleView";
import AddEmployee from "./components/AddEmployee";

const myTheme = {
  global: {
    font: {
      family: "Arial"
    },
    animation: {
      jiggle:{
        duration: "10s"
      }
    }
  }
};

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
    // const id = revisedRandId();
    console.log("in updateEmployees:", newValue);
    setShow(false);
    axios
      .put(`http://localhost:5000/employees`, newValue)
      .then(results => {
        console.log(results);
        // setEmployees({ ...employees, []...newValue });
      })
      .catch(error => console.log(error));
  };

  // const updateEmployees = newValue => {
  //   const id = revisedRandId();
  //   // console.log(newValue);
  //   setShow(false);
  //   setEmployees({ ...employees, [id]: newValue });

  //   // console.log("employees:", employees);
  // };
  // setshift({... days.shifts})// spread each layer for shift to show which layer to update

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
        console.log("this is state:\n", response.data);
        setDays(response.data);
      })
      .catch(error => console.log("in error", error));
  }, []);

  const updateShifts = data => {
    console.log("In updateShifts:", data);
    // axios
    //   .post("http://localhost:5000/shift", {
    //     employee_id: empId,
    //     shift_id: shiftId
    //   })
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
  };

  const removeShift = (empId, shiftId) => {
    console.log("in removeAppointment", empId, shiftId);
    axios
      .delete(`http://localhost:5000/shift/${empId}/${shiftId}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const addEmployee = emp => {
    console.log("addEmployee:", emp);
    axios
      .post("http://localhost:5000/employees", emp)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const deleteEmployee = id => {
    console.log("deleteEmployee:", employees.id[id]);
    axios
      .delete(`http://localhost:5000/employees/${id}`)
      .then(response => console.log("After delete", response))
      .catch(error => console.log(error));
  };

  // useEffect(() => {
  //   setEmployees([
  //     { name: "John Doe", email: "jd@gmail.com" },
  //     { name: "Jane Doe", email: "janed@gmail.com" },
  //     { name: "Robert Smith", email: "robs@gmail.com" }
  //   ]);
  // }, []);

  const ScheduleViews = Object.keys(days).map(dayId => (
    <ScheduleView
      updateShifts={updateShifts}
      shifts={days[dayId].shifts}
      dayId={dayId}
      employees={employees}
      label={days[dayId].label}
    />
  ));

  const borderStyles = {
    size: "small",
    color: "neutral-3"
  };
  return (
    <Grommet theme={myTheme}>
      <HeaderBar alignSelf="stretch"></HeaderBar>
      <Grid
        rows={["xxsmall", "large"]}
        columns={["small", "flex"]}
        gap={{ row: "medium" }}
        areas={[
          // { name: 'header', start: [0, 0], end: [1, 0] },
          { name: "nav", start: [0, 0], end: [0, 1] },
          { name: "main", start: [1, 0], end: [1, 1] }
        ]}
      >
        <Box
          background={{
            image:
              "url(https://us.123rf.com/450wm/brunoilfo/brunoilfo1903/brunoilfo190300010/124674878-stock-vector-empty-editable-gradient-background-vertical-vector-illustration.jpg?ver=6)"
          }}
          gridArea="nav"
          width={"small"}
          align="center"
          border={borderStyles}
        >
          <CalendarSelector />

          <EmployeeList emp={Object.values(employees)} />
          <AddButton onClick={() => setShow(true)} />
        </Box>
        <Box
          gridArea="main"
          direction="row"
          background={{
            image:
              "url(https://www.xmple.com/wallpaper/blue-pink-gradient-linear-1920x1080-c2-ffb6c1-b0c4de-a-225-f-14.svg)"
          }}
        >
          {ScheduleViews}
        </Box>
      </Grid>

      <Box direction="row"></Box>
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
