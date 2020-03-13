import React from "react";
import { Calendar } from "grommet";

//to do: send this component a function that sets the state when you select a day

export default function CalendarSelector(props) {
  return (
    <Calendar
      daysOfWeek={true}
      firstDayOfWeek={1}
      size="small"
      date={(new Date()).toISOString()}
      onSelect={(date) => {/*props.setWeek*/}}
    />
  );
}
