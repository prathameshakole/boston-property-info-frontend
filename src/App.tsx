import React, { useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/homepage';
import Details from './components/Details/Details';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/property-details" element={<Details darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
