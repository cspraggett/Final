import React, { useState } from "react";
import { Box, Text, Select, Button } from "grommet";
import { Save } from "grommet-icons";

export default function Shift(props) {
  //get back the ID from the strings
  function idArray(strings) {
    let result = [];
    strings.forEach(element => {
      for (let [key, value] of Object.entries(props.allEmployees)) {
        //console.log(`element:${element}, ${key}: ${value}`);
        if (value.name === element) {
          result.push(key);
          console.log(`found ${element} === ${value.name}`);
        }
      }
    });
    //console.log("result:", result)
    return result;
  }

  //creates an array of all employee name strings
  let employeeNameList = [];
  Object.values(props.allEmployees).forEach(element => {
    employeeNameList.push(element.name);
  });

  //creates a array of strings that displays the names already assigned to the shift
  let currentlyShowing = [];
  props.assignedEmployees.forEach(element => {
    currentlyShowing.push(element.name);
  });

  //filters selectable names by removing ones already in use
  let filteredOptions = employeeNameList.filter(element => {
    return !currentlyShowing.includes(element);
  });

  //the actual dropdown element
  function dropDownTable() {
    let result = [];
    let show = "None";
    //one dropdown selecter per shift capacity
    for (let i = 0; i < props.capacity; i++) {
      if (currentlyShowing[i]) {
        show = currentlyShowing[i];
      } else {
        //display "none" if there is no employee assigned to this "slot"
        show = "None";
      }
      result.push(
        <Select
          background={{color:"accent-4", opacity:false}}
          value={show}
          options={filteredOptions} //display the filtered names as the options
          onChange={({ option }) => {
            //callback to run when a dropdown item is selected
            currentlyShowing[i] = option;
          }}
        />
      );
    }
    return result;
  }

  return (
    <Box align="center" gap="small">
      {dropDownTable()}
      
      <Box direction="row" justifyContent="between" gap="xlarge" >
        <Text>
          {props.start} -{" "}
          {props.start + props.duration > 12
            ? props.start + props.duration - 12
            : props.start + props.duration}
        </Text>
        <Button
          onClick={() => {
            console.log("in updateShifts");
            props.updateShifts({
              [props.id]: {
                employees: idArray(currentlyShowing)
              }
            });
          }}
          
          icon={<Save />}
        />
      </Box>

    </Box>
  );
}
