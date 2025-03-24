import React, { useState } from 'react';
import './App.css';
import Homepage from './components/Homepage/homepage';
import Details from './components/Details/Details';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/property-details" element={<Details darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
