import React, { useEffect } from 'react';
import keycloak from './keycloak'; // Importeer je Keycloak-instantie

const Callback = () => {
  useEffect(() => {
    keycloak
      .login({ redirectUri: window.location.href }) // Zorg ervoor dat de URL correct wordt doorgegeven
      .then(() => {
        window.location.href = '/Dashboard';  // Verwijs naar de dashboardpagina na succesvolle inlog
      })
      .catch((error) => {
        console.error('Fout tijdens de Keycloak callback', error);
      });
  }, []);

  return <div>Inloggen...</div>;
};

export default Callback;
