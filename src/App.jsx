// App.jsx

import React, { useState } from "react";
import FetchAPI from "./FetchAPI";
import Axios from "./Axios";
import AxiosV2 from "./AxiosV2";
import AxiosV3AsyncAwait from "./AxiosV3AsyncAwait";
import "./styles/app.css";

const App = () => {
  const [currentView, setCurrentView] = useState("Axios");

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <header className="header">
        <h1>React Axios Exercise</h1>
        <nav className="nav-container">
          <button
            className={`nav-button ${currentView === "Axios" ? "active" : ""}`}
            onClick={() => handleNavigation("Axios")}
          >
            Axios
          </button>
          <button
            className={`nav-button ${currentView === "AxiosV2" ? "active" : ""}`}
            onClick={() => handleNavigation("AxiosV2")}
          >
            AxiosV2
          </button>
          <button
            className={`nav-button ${currentView === "AxiosV3" ? "active" : ""}`}
            onClick={() => handleNavigation("AxiosV3")}
          >
            AxiosV3
          </button>
        </nav>
      </header>

      <div className="content">
        {currentView === "Axios" && <Axios />}
        {currentView === "AxiosV2" && <AxiosV2 />}
        {currentView === "AxiosV3" && <AxiosV3AsyncAwait />}
      </div>
    </div>
  );
};

export default App;
