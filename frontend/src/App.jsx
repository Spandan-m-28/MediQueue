import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'

import Landing from "./pages/Landing.jsx";

function App() {

  return (
    <> 
    <Routes>
      <Route path="/" element={<Landing/>} />
    </Routes>
    </>
  )
}

export default App
