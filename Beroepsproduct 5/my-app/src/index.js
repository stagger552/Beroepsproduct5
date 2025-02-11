import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './Style/style.css';


import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';


import EN from "./Translation/EN/translation.json";
import NL from "./Translation/NL/translation.json";
import AF from "./Translation/AF/translation.json";
import FR from "./Translation/FR/translation.json";
import XH from "./Translation/XH/translation.json";
import ZU from "./Translation/ZU/translation.json";



import keycloak from "./keycloak";

// Get the saved language from localStorage, or default to 'en'
const savedLanguage = localStorage.getItem('language')
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: EN },
      nl: { translation: NL },
      af: { translation: AF },
      fr: { translation: FR },
      xh: { translation: XH },
      zu: { translation: ZU }
    },
    lng: savedLanguage,
    fallbackLng: 'nl',
    interpolation: { escapeValue: false }
  });

  
  const root = ReactDOM.createRoot(document.getElementById("root")); // Creëer de root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  



keycloak
.init({
  onLoad: "login-required",
  checkLoginIframe: false, 
})
.then((authenticated) => {
  console.log("Authenticated:", authenticated);
  if (authenticated) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    const clientRoles = Object.entries(keycloak.resourceAccess || {}).reduce(
      (roles, [client, access]) => {
        return [...roles, ...access.roles];
      },
      []
    );

    // Store client roles in session storage
    sessionStorage.setItem('clientRoles', JSON.stringify(clientRoles));
    const username = keycloak.tokenParsed.preferred_username;
    sessionStorage.setItem('clientName',username);

  } else {
    console.log("Not authenticated, redirecting to login.");
    keycloak.login();
  }
})
.catch((error) => {
  console.error("Keycloak initialization failed:", error);
});



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
