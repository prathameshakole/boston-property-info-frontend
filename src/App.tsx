import React from 'react';
import './App.css';
import Homepage from './components/Homepage/homepage';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Details from './components/Details/Details';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/property-details" element={<Details />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
