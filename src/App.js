// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import EmployeePortal from "./components/EmployeePortal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <EmployeePortal /> : <LoginPage onLogin={setIsLoggedIn} />}
    </div>
  );
}

export default App;
