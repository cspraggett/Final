import React, { useState } from "react";
import { Box, Text, Select } from "grommet";


export default function Shift(props){

  let employeeNameList = [];

  Object.values(props.allEmployees).forEach(element => {
    employeeNameList.push(element.name);
  });

  let currentlyShowing = []
  props.assignedEmployees.forEach((element) => {
    currentlyShowing.push(element.name);
  })

  let filteredOptions = employeeNameList.filter(
    (element) => {
      return !currentlyShowing.includes(element);
    }
  );

  function dropDownTable(){
    let result = [];
    let show = "None";
    for(let i = 0; i < props.capacity; i++){
      if(currentlyShowing[i]) {
        show = currentlyShowing[i]
      } else{
        show = "None";
      }
      result.push(
        <Select
          value={show}
          options={filteredOptions}
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

