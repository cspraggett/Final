import React from "react";
import { Box, Form, Button, FormField } from "grommet";
import { Close, Save } from "grommet-icons";

export default function AddEmployee(props){
  return(
    <Box>
      <Button alignSelf="end" icon={<Close/>} onClick={props.onClose}/>
      <Form onSubmit={({value}) => props.onSave(value)}>
        <FormField name="start" Label="Start Time" placeholder="Start Time " />
        <FormField name="duration" Label="Duration" placeholder="Duration"/>
        <FormField name="capacity" Label="Capacity" placeholder="Capacity"/>
        <Button type="submit" alignSelf="end" icon={<Save/>}/>
      </Form>
    </Box>
  );
}