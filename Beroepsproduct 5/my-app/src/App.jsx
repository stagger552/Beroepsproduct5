
import React from 'react';
import Home from './Home';  // Import the Dashboard component
import Dashboard from './Dashboard';  // Import the Dashboard component
import Callback from './Callback';  // Add the Callback component
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


/******  1217d872-85b9-44e7-acef-7cb2db122df9  *******/function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />          {/* Homepage */}
        <Route path="/Dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/callback" element={<Callback />} /> {/* Keycloak callback */}
      </Routes>
    </Router >
  )
}

export default App;