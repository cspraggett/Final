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

  function saveEmployee(newValue){
    if(selectedEmployee){
      let newList = employees.filter(element => element.name !== selectedEmployee.name)
      setEmployees([...newList, newValue]);
    } else {
      setEmployees([...employees, newValue]);
    }
    selectedEmployee = null;
    setShow(false);
  }

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
          <EmployeeList onClick={(datum) => {setShow(true); selectedEmployee = datum}} emp={employees}/>
          <AddButton onClick={() => setShow(true)} />
        </Box>
        <Box direction="row">
          <ScheduleView day="Monday" employeeOptions={employees}/>
          <ScheduleView day="Tuesday" employeeOptions={employees}/>
          <ScheduleView day="Wednesday" employeeOptions={employees}/>
          <ScheduleView day="Thursday" employeeOptions={employees}/>
          <ScheduleView day="Friday" employeeOptions={employees}/>
          <ScheduleView day="Saturday" employeeOptions={employees}/>
          <ScheduleView day="Sunday" employeeOptions={employees}/>
        </Box>
      </Box>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <AddEmployee 
            starting={selectedEmployee && selectedEmployee}/*this only sets the starting data if it exists. Trust me*/
            onSave={saveEmployee}
            onClose={() => setShow(false)}
          />
        </Layer>
      )}
    </Grommet>
  );
}
export default App;
