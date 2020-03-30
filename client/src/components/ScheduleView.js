import React from "react";
import { List, Box, Text } from "grommet";
import AddButton from "./AddButton.js";
import Shift from "./Shift";
import { getEmployeesForShift } from "../Helper/selector";

export default function ScheduleView(props) {
  const shiftIds = Object.keys(props.shifts);
  const shifts = shiftIds.map(shiftID => {
    const employees = getEmployeesForShift(
      props.employees,
      props.shifts,
      shiftID
    );
    return {
      object: (
        <Shift
          dayID={props.dayId}
          id={shiftID}
          start={9}
          duration={8}
          capacity={4}
          allEmployees={props.employees}
          assignedEmployees={employees}
          updateShifts={props.updateShifts}
        />
      )
    };
  });
  //shifts.push({ object: <AddButton /> });

  return (
    <Box align="stretch" fill="horizontal">
      <Text alignSelf="center">{props.label}</Text>
      <List
        background={{ color: "brand", opacity: true }}
        border={true}
        primaryKey="object"
        data={shifts}
      />
      <AddButton
        onClick={() => {
          props.addShift();
        }}
      />
    </Box>
  );
}
