import React from "react";
import { List, Box, Text } from "grommet";
import AddButton from "./AddButton";
import Shift from "./Shift";

export default function ScheduleView(props){
  return(
    <Box>
      <Text>{props.day}</Text>
      <List
      border={true}
      primaryKey="object"
      data={[
        {object:<Shift start={9} duration={8} capacity={4} employeeOptions={props.employeeOptions}/>},
        {object:"other shift data"},
        {object:<AddButton/>}
      ]}
      />
    </Box>
  );
}