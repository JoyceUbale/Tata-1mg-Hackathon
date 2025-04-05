import React from "react";
import { Outlet } from "react-router-dom";
// filepath: /Users/joyceubale/Desktop/Catalyst/tata_1_mg/src/js/containers/App/index.js
import { useCatalyst } from "../../../catalyst/providers/CatalystProvider";

const App = () => {
  const { state } = useCatalyst();
  
  return (
    <div className={state.theme}>
      <Outlet />
    </div>
  );
};

// Server-side function as per Catalyst patterns
App.serverSideFunction = ({ store, req, res }) => {
  // This runs on each page request on the server
  console.log("[Catalyst] Processing server-side logic");
  return Promise.resolve();
};

export default App;
