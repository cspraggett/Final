import React from "react";
import { List, Box, Text } from "grommet";
import Shift from "./Shift";
import {getEmployeesForShift} from "../Helper/selector"


export default function ScheduleView(props){
  const shiftIds = Object.keys(props.shifts)
  const shifts = shiftIds.map(shiftID => {
    const employees = getEmployeesForShift(props.employees, props.shifts, shiftID)
    return {object: <Shift start={9} duration={8} capacity={4} allEmployees={props.employees} assignedEmployees={employees}/>}
  })
  //shifts.push({object:<AddButton/>})

  return(
    <Box>
      <Text>{props.label}</Text>
      <List
      border={true}
      primaryKey="object"
      data = {shifts}
      />
    </Box>
  );
}