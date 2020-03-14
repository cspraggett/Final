import React from "react";
import { Box, Text, List } from "grommet";

export default function Shift(props){
  return(
    <Box>
      <Text>Employees Assigned:</Text>
      <List
        primaryKey="name"
        data={[
          {name:"name1", email:"email"},
          {name:"name2", email:"email"},
          {name:"name3", email:"email"}
        ]}
      />
      <Box direction="row">
      <Text>{props.start} - {(props.start+props.duration > 12) ? (props.start+props.duration-12): props.start+props.duration}</Text>
      </Box>
      <Text>3/{props.capacity} assigned</Text>
    </Box>
  );
}