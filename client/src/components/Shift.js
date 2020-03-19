import React, { useState } from "react";
import { Box, Text, Select } from "grommet";


export default function Shift(props){

  let employeeNameList = [];
  
  Object.values(props.allEmployees).forEach(element => {
    employeeNameList.push(element.name);
  });
  console.log(employeeNameList);

  let currentlyShowing = Object.values(props.assignedEmployees);

  function dropDownTable(){
    let result = [];
    let show = "None";
    for(let i = 0; i < props.capacity; i++){
      if(currentlyShowing[i]) {
        show = currentlyShowing[i].name
      } else{
        show = "None";
      }
      result.push(
        <Select
          value={show}
          options={employeeNameList}
          onChange={({option}) => currentlyShowing[i]=option}
        />
      )
    }
    return result;
  }

  return(
    <Box>
      {dropDownTable()} 
      <Box direction="row">
      <Text>{props.start} - {(props.start+props.duration > 12) ? (props.start+props.duration-12): props.start+props.duration}</Text>
      </Box>
    </Box>
  );
}

