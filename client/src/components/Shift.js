import React, { useState } from "react";
import { Box, Text, Select, Button } from "grommet";
import { Save } from "grommet-icons";

//TODO make currently showing state beloning to this component

export default function Shift(props) {

  //creates a array of strings that displays the names already assigned to the shift
  function setupSelect() {
    let currentlyShowing = {};
    props.assignedEmployees.forEach((element, index) => {
      currentlyShowing = {[index]: element.name};
    });
    console.log("setup output:", currentlyShowing);
    return currentlyShowing;
  }

  const [selectOptions, setSelectOptions] = useState(setupSelect());

  //creates an array of all employee name strings
  let employeeNameList = [];
  function setupNamelist() {
      Object.values(props.allEmployees).forEach(element => {
      employeeNameList.push(element.name);
    });
  }

  setupNamelist();

  //get back the ID from the strings
  function idArray(strings) {
    let result = [];
    strings.forEach(element => {
      for (let [key, value] of Object.entries(props.allEmployees)) {
        //console.log(`element:${element}, ${key}: ${value}`);
        if (value.name === element) {
          result.push(key);
          //console.log(`found ${element} === ${value.name}`);
        }
      }
    });
    //console.log("result:", result)
    return result;
  }

  //filters selectable names by removing ones already in use
  function filteredOptions() {
    return employeeNameList.filter(element => {
      return !Object.values(selectOptions).includes(element);
    });
  } 

  //the actual dropdown element
  function dropDownTable() {
    let result = [];
    let show = "None";
    //one dropdown selecter per shift capacity
    for (let i = 0; i < props.capacity; i++) {
      if (selectOptions.i) {
        show = selectOptions.i;
      } else {
        //display "none" if there is no employee assigned to this "slot"
        show = "None";
      }
      result.push(
        <Select
          value={show}
          options={filteredOptions()} //display the filtered names as the options
          onChange={({ option }) => {
            setSelectOptions({...selectOptions, [i]: option});
            //console.log(selectOptions);
            //callback to run when a dropdown item is selected
            //currentlyShowing[i] = option;
          }}
        />
      );
    }
    return result;
  }

  return (
    <Box>
      {dropDownTable()}
      <Box direction="row">
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
                employees: idArray(setupSelect())
              }
            });
          }}
          alignSelf="end"
          icon={<Save />}
        />
      </Box>
    </Box>
  );
}
