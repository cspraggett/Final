import React from "react";
import { Box, Form, Button, FormField } from "grommet";
import { Close, Checkmark } from "grommet-icons";

export default function AddEmployee(props){
  return(
    <Box>
      <Button alignSelf="end" icon={<Close/>} onClick={props.onClose}/>
      <Form value={props.starting} onSubmit={({value}) => props.onSave(value)}>
        <FormField name="name" Label="Name" placeholder="name" />
        <FormField name="email" Label="Email" placeholder="email"/>
        <Button type="submit" alignSelf="end" icon={<Checkmark/>}/>
      </Form>
    </Box>
  );
}