import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './Home';  // Homepage component
import Dashboard from './Dashboard';  // Dashboard component
import Callback from './Callback';  // Keycloak callback component
import Logging from './Logging';  // Logging page
import Geschiedenis from './Geschiedenis';  // History page
import CreateBoei from './Boei maken';  // Add this import

const CryptoJS = require("crypto-js");
// Role-based Route Protection
const ProtectedRoute = ({ children, requiredRoles }) => {
  const clientRoles = JSON.parse(sessionStorage.getItem('clientRoles')) || [];
  const clientUserName = sessionStorage.getItem('clientName')
  const location = useLocation();
  const secretKey = "superveiligwachtwoord";

  // Check if the user has at least one required role
  const hasAccess = requiredRoles.some((role) => clientRoles.includes(role));
      /* const logData = {
        LOG_GEBRUIKER: CryptoJS.AES.encrypt(clientUserName, secretKey).toString(), 
        LOG_ACTIE: CryptoJS.AES.encrypt(`Visited ${location.pathname}`, secretKey).toString(), // Bezochte pagina
        LOG_TIJD: new Date().toISOString(), // Tijdstempel in ISO-formaat
      }; */

      const logData = {
        LOG_GEBRUIKER: CryptoJS.AES.encrypt(clientUserName, secretKey).toString(), 
        LOG_ACTIE: CryptoJS.AES.encrypt(`Visited ${location.pathname}`, secretKey).toString(), // Bezochte pagina
        LOG_TIJD: new Date().toISOString().replace(/\.\d{3}Z$/, ''), // Verwijder milliseconden en "Z"
    };
    
    const postData = {
        query: `
            INSERT INTO Loggin (id, gebruiker, tijd, actie) 
            VALUES (
                (SELECT NVL(MAX(id), 0) + 1 FROM Loggin), 
                '${logData.LOG_GEBRUIKER}', 
                TO_DATE('${logData.LOG_TIJD}', 'YYYY-MM-DD"T"HH24:MI:SS'), 
                '${logData.LOG_ACTIE}'
            )
        `
    };
    
    // Voeg de query toe via fetch of via een andere methode, bijvoorbeeld:
    fetch('http://141.144.200.89:1880/sql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ontvangen data:', data);
    })
    .catch(error => {
        console.error('Fout bij het versturen van POST-verzoek:', error);
    });
    
    

      // Verkrijg bestaande logs uit localStorage
      //const logs = JSON.parse(localStorage.getItem('pageLogs')) || [];

      // Voeg nieuwe log toe aan bestaande logs
      //logs.push(logData);

      // Sla de bijgewerkte logs op in localStorage
      //localStorage.setItem('pageLogs', JSON.stringify(logs));


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
           <Route
          path="/CreateBoei"
          element={
            <ProtectedRoute requiredRoles={['Operator']}>
              <CreateBoei />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;