import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
