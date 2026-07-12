import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import socket from "./sockets/socket.js";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Hospitals from "./pages/Hospitals.jsx";
import HospitalDetails from "./pages/HospitalDetails.jsx";
import QueueDetails from "./pages/QueueDetails.jsx";
import Staff from "./pages/Staff.jsx";
import StaffQueueDashboard from "./pages/StaffQueueDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !socket.connected) {
      socket.connect();
      console.log("Socket Connected");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute allowedRoles={["patient", "staff"]}>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospitals/:id"
          element={
            <ProtectedRoute allowedRoles={["patient", "staff"]}>
              <HospitalDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/queue/:id"
          element={
            <ProtectedRoute allowedRoles={["patient", "staff"]}>
              <QueueDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/queue/:id"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffQueueDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
