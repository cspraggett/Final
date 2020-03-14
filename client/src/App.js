import React from 'react';
import { Grommet, Box, Layer } from "grommet";
import CalendarSelector from './components/CalendarSelector';
import EmployeeSearch from './components/EmployeeSearch';
import EmployeeList from './components/EmployeeList';
import AddButton from './components/AddButton';
import HeaderBar from '../src/components/Header';
import ScheduleView from "./components/ScheduleView";
import AddEmployee from "./components/AddEmployee";

function App() {
  const [show, setShow] = React.useState();

  return (
    
    <Grommet>
      <HeaderBar></HeaderBar>
      <Box direction="row">
        <Box 
          width={"small"}
          align="center"
          border={
                    {
                    size: "small",
                    color: "brand",
                    }
                  }
        >
          <CalendarSelector/>
          <EmployeeSearch/>
          <EmployeeList onSave={() => setShow(false)} onClose={() => setShow(false)}/>
          <AddButton onClick={() => setShow(true)}/>
        </Box>
        <Box direction="row">
          <ScheduleView day="Monday"/>
          <ScheduleView day="Tuesday"/>
          <ScheduleView day="Wednesday"/>
          <ScheduleView day="Thursday"/>
          <ScheduleView day="Friday"/>
          <ScheduleView day="Saturday"/>
          <ScheduleView day="Sunday"/>
        </Box>
      </Box>
      {show && (
        <Layer 
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <AddEmployee/>
        </Layer>
      )}
    </Grommet>
  );
}

export default App;
