
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';  // Homepage component
import Dashboard from './Dashboard';  // Dashboard component
import Callback from './Callback';  // Keycloak callback component
import Logging from './Logging';  // Logging page
import Geschiedenis from './Geschiedenis';  // History page

// Role-based Route Protection
const ProtectedRoute = ({ children, requiredRoles }) => {
  const clientRoles = JSON.parse(sessionStorage.getItem('clientRoles')) || [];

  // Check if the user has at least one required role
  const hasAccess = requiredRoles.some((role) => clientRoles.includes(role));

  return hasAccess ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Homepage */}
        <Route path="/callback" element={<Callback />} /> {/* Keycloak callback */}
        
        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute requiredRoles={['Operator']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Geschiedenis"
          element={
            <ProtectedRoute requiredRoles={['Operator']}>
              <Geschiedenis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Logging"
          element={
            <ProtectedRoute requiredRoles={['Operator']}>
              <Logging />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;