import React, { useState, useEffect } from "react";
import { Box, Text, Select, Button } from "grommet";
import { Checkmark } from "grommet-icons";

export default function Shift(props) {
  const [selectOptions, setSelectOptions] = useState({});

  useEffect (() => {
    //creates a array of strings that displays the names already assigned to the shift
    let temp = {};
    props.assignedEmployees.forEach((element, index) => {
      temp = {...temp, [index]: element.name}
      console.log("element",element.name,"index",index,"selectOptions", selectOptions);
    });
    console.log('------>', temp);

    setSelectOptions(temp);
  },[]);

  //get back the ID from the strings
  function idArray(strings) {
    let result = [];
    strings.forEach(element => {
      for (let [key, value] of Object.entries(props.allEmployees)) {
        if (value.name === element) {
          result.push(parseInt(key));
          //console.log(`found ${element} === ${value.name}`);
        }
      }
    });
    return result;
  }

  //creates an array of all employee name strings
  let employeeNameList = [];
  Object.values(props.allEmployees).forEach(element => {
    employeeNameList.push(element.name);
  });

  //filters selectable names by removing ones already in use
  let filteredOptions = employeeNameList.filter(element => {
    return !Object.values(selectOptions).includes(element);
  });

  //the actual dropdown element
  function dropDownTable() {
    let result = [];
    let show = "None";
    //one dropdown selecter per shift capacity
    for (let i = 0; i < props.capacity; i++) {
      // console.log(props)
      if (selectOptions[i]) {
        console.log(selectOptions[i])
        show = selectOptions[i];
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
            setSelectOptions({...selectOptions, [i]: option});
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
                employees: idArray(Object.values(selectOptions))
              },
              dayID: parseInt(props.dayID)
            });
          }}
          
          icon={<Checkmark/>}
        />
      </Box>

    </Box>
  );
}
