import React from "react";
import { Box, Text, List } from "grommet";
import Shift from "./Shift";

export default function ShiftList(props){
  const employees = props.employees.map(employee => {
    return (
      <Shift
      key={employee.id}
      name={employee.name}
      email={employee.email}
      />
    )
  })
  return <ul> {employees}</ul>
} 