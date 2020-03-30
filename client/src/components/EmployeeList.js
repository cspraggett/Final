import React from "react";
import { List } from "grommet";

export default function EmployeeList(props) {
  return (
    <List
      // onClickItem={({item}) => {
      //   props.onClick(item)
      // }}
      primaryKey="name"
      data={props.emp}
    />
  );
}
