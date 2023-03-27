import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import RouterConfig from "./config/RouterConfig";

function App() {
  return (
    <div>
      <HashRouter>
        <>
          <RouterConfig />
        </>
      </HashRouter>
    </div>
  );
}

export default App;
