import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pricing from './pages/Pricing';
import Universities from './pages/Universities';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ApplicationTracker from './pages/ApplicationTracker';
import Network from './pages/Network';

import InterviewSetup from './pages/InterviewSetup';
import InterviewSession from './pages/InterviewSession';
import InterviewFeedback from './pages/InterviewFeedback';
import { db } from "./firebase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="network" element={<Network />} />

          <Route path="applications" element={<ApplicationTracker />} />
          <Route path="interview" element={<InterviewSetup />} />
          <Route path="interview/session" element={<InterviewSession />} />
          <Route path="interview/feedback" element={<InterviewFeedback />} />

          <Route path="agencies" element={<AgencyDashboard />} />
          <Route path="candidate/:id" element={<CandidateProfile />} />
          <Route path="universities" element={<Universities />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
