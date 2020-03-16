import React, { useEffect, useState } from "react";
import { Grommet, Box } from "grommet";
import CalendarSelector from "./components/CalendarSelector";
import EmployeeSearch from "./components/EmployeeSearch";
import EmployeeList from "./components/EmployeeList";
import AddButton from "./components/AddButton";
import HeaderBar from "../src/components/Header";
import ScheduleView from "./components/ScheduleView";

function App() {
  const [people, setPeople] = useState(["bob"]);
  console.log("hello");
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then(result => {
        console.log("in fetch", result);
        return result.json();
      })
      .then(data => {
        console.log("data:", data);
        setPeople(data);
      })

      .catch(err => console.log("error", err));
  }, []);

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
          <EmployeeList />
          <AddButton />
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
    </Grommet>
  );
}

export default App;
