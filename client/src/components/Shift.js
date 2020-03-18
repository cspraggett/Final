import React from "react";
import { Box, Text, Select } from "grommet";


export default function Shift(props){

  
//   return(
//     <Box>
//       <Text>Employees Assigned:</Text>
//       <List
//         primaryKey="name"

//         data={props.employees}
//       />

  const [value, setValue] = React.useState([0])

  let employeeNameList = [];
  props.employeeOptions.forEach(element => {
    employeeNameList.push(element.name);
  });

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

