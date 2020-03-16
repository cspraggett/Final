import React, { useEffect, useState } from "react";
import { Grommet, Box, Layer } from "grommet";
import axios from "axios";
import CalendarSelector from "./components/CalendarSelector";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeList from "./components/EmployeeList";
import AddButton from "./components/AddButton";
import HeaderBar from "./components/Header";
import ScheduleView from "./components/ScheduleView";
import AddEmployee from "./components/AddEmployee";

function App() {
  const [show, setShow] = useState();
  const [employees, setEmployees] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then(response => {setEmployees(response.data)})
      .catch(error => console.log("in error", error));
  }, []);

  useEffect (() => {
    setEmployees([
    {name:'John Doe', email:'jd@gmail.com'},
    {name:'Jane Doe', email:'janed@gmail.com'},
    {name:'Robert Smith', email:'robs@gmail.com'},
  ])}, []);

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
          <EmployeeSearch />
          <EmployeeList emp={employees}/>
          <AddButton onClick={() => setShow(true)} />
        </Box>
        <Box direction="row">
          <ScheduleView day="Monday" />
          <ScheduleView day="Tuesday" />
          <ScheduleView day="Wednesday" />
          <ScheduleView day="Thursday" />
          <ScheduleView day="Friday" />
          <ScheduleView day="Saturday" />
          <ScheduleView day="Sunday" />
        </Box>
      </Box>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <AddEmployee
            onSave={(newValue) => {
              console.log(newValue);
              setShow(false);
              setEmployees([...employees, newValue]);
              console.log("employees:", employees);
            }}
            onClose={() => setShow(false)}
          />
        </Layer>
      )}
    </Grommet>
  );
}
export default App;
