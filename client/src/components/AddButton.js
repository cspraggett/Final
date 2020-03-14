import React from "react";
import { AddCircle } from "grommet-icons";
import { Button } from "grommet";


export default function AddButton(props){
  return(
    <Button
      icon={<AddCircle />}
      label={props.text}
      onClick={props.onClick}
    />
  )
}