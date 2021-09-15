import CustomTable from "./CustomTable";
import { Typography } from '@material-ui/core';

import "./app.css";



function App() {
  return (
    <div className="box">
      <Typography variant="h1" align="center">Asian Countries</Typography>
      
      
      <CustomTable />
    </div>
  );
}

export default App;
