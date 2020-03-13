import React from 'react';
import CalendarSelector from '../src/components/Calendar';
import HeaderBar from '../src/components/Header'
import { Grommet } from "grommet";

function App() {
  return (
    
    <Grommet>
       <HeaderBar></HeaderBar>
      <CalendarSelector/>
    </Grommet>
  );
}

export default App;
