import React from "react";
import { List } from "grommet";

export default function EmployeeList(props){
  return (
  <List
    primaryKey="name"
    data={[
      { name: 'Alan'},
      { name: 'Bryan'},
      { name: 'Chris'},
      { name: 'Eric'},
    ]}
  />
  )
}