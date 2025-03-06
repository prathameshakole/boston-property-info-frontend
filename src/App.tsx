import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage/homepage';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
