import React from "react";
import { Box, Text, Select } from "grommet";



export default function Shift(props){
  const [value, setValue] = React.useState([0])

  let employeeNameList = [];
  props.employeeOptions.forEach(element => {
    employeeNameList.push(element.name);
  });
  console.log("afterloop", employeeNameList);

  function dropDownTable(){
    let result = [];
    for(let i = 1; i < props.capacity; i++){
      result.push(
        <Select
          value={value[i]}
          options={employeeNameList}
          onChange={({option}) => setValue([...value, option])}
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

