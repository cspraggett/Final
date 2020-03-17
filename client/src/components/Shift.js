import React from "react";
import { Box, Text, List } from "grommet";



export default function Shift(props){
  const employees = {
    1: {name: "blah"},
    2: {name: "roxa" }
  };
  
  return(
    <Box>
      <Text>Employees Assigned:</Text>
      <List
        primaryKey="name"
        data={Object.values(employees).map(employee=>{
          return {
            name: employee.name,
            email: employee.email
          }
        })}
      />
      <Box direction="row">
      <Text>{props.start} - {(props.start+props.duration > 12) ? (props.start+props.duration-12): props.start+props.duration}</Text>
      </Box>
      <Text>3/{props.capacity} assigned</Text>
    </Box>
  );
}

