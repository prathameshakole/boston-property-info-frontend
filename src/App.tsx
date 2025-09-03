import React, { useState, useMemo } from 'react';
import './App.css';
import Homepage from './components/Homepage/homepage';
import Details from './components/Details/Details';
import About from './components/About/About';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { getTheme } from './theme';

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');


  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage darkMode={mode === 'dark'} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/property-details" element={<Details darkMode={mode === 'dark'} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/about" element={<About darkMode={mode === 'dark'} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;