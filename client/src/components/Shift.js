import React, { useState } from "react";
import { Box, Text, Select } from "grommet";


export default function Shift(props){

  //creates an array of all employee name strings
  let employeeNameList = [];
  Object.values(props.allEmployees).forEach(element => {
    employeeNameList.push(element.name);
  });

  //creates a array of strings that displays the names already assigned to the shift
  let currentlyShowing = []
  props.assignedEmployees.forEach((element) => {
    currentlyShowing.push(element.name);
  })

  //filters selectable names by removing ones already in use
  let filteredOptions = employeeNameList.filter(
    (element) => {
      return !currentlyShowing.includes(element);
    }
  );

  //the actual dropdown element
  function dropDownTable(){
    let result = [];
    let show = "None";
    //one dropdown selecter per shift capacity
    for(let i = 0; i < props.capacity; i++){
      if(currentlyShowing[i]) {
        show = currentlyShowing[i]
      } else{//display "none" if there is no employee assigned to this "slot"
        show = "None";
      }
      result.push(
        <Select
          value={show}
          options={filteredOptions}//display the filtered names as the options
          onChange={({option}) => {//callback to run when a dropdown item is selected
            currentlyShowing[i]=option;
            props.updateShifts(option);//this function is located in app.js. Right now it just console logs to prove its existance
          }}
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

