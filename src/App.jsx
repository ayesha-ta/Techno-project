import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Placeholder routes for future expansion */}
          <Route path="jobs" element={<div style={{ padding: '2rem' }}>Jobs Page (Coming Soon)</div>} />
          <Route path="interview" element={<div style={{ padding: '2rem' }}>Interview Simulator (Coming Soon)</div>} />
          <Route path="agencies" element={<div style={{ padding: '2rem' }}>Agency Portal (Coming Soon)</div>} />
          <Route path="universities" element={<div style={{ padding: '2rem' }}>University Portal (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
