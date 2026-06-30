import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Hospitals from "./pages/Hospitals.jsx";
import HospitalDetails from "./pages/HospitalDetails.jsx";
import QueueDetails from "./pages/QueueDetails.jsx";
import Staff from "./pages/Staff.jsx";
import StaffQueueDashboard from "./pages/StaffQueueDashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospitals/:id" element={<HospitalDetails/>}/>

        <Route path="/queue/:id" element={<QueueDetails/>} />

        <Route path="/staff" element={<Staff/>} />
        <Route path="/staff/queue/:id" element={<StaffQueueDashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
