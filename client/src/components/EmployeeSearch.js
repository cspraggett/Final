import React from "react";
import {TextInput} from "grommet";

export default function EmployeeSearch(props){
  const [value, setValue] = React.useState('');
  return(
    <TextInput
      placeholder="search employees"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  )
}