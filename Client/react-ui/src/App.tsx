import { Route, Routes } from "react-router-dom"
import React from "react";
import Home from "./Home";
import Unknown from "./Unknown";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Books" element={<h1> To be implemented </h1>} />
      <Route path="/Authors" element={<h1> To be implemented </h1>} />
      <Route path="/Borrowers" element={<h1> To be implemented </h1>} />
      <Route path="/Loans" element={<h1> To be implemented </h1>} />
      <Route path="/Fines" element={<h1> To be implemented </h1>} />
      <Route path="*" element={<Unknown />} />

    </Routes>
  );
}

export default App;
