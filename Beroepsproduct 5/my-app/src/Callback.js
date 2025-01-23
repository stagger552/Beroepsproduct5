import React, { useEffect } from 'react';
import keycloak from './keycloak';

const Callback = () => {
  useEffect(() => {
    keycloak
      .login({ redirectUri: window.location.href })
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
