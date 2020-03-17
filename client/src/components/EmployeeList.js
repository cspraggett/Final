import React from "react";
import { List } from "grommet";

export default function EmployeeList(props){
  return (
  <List
    primaryKey="name"
    data={props.emp}
  />
  )
}