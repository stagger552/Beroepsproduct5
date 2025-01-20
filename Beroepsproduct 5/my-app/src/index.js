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

import keycloak from "./keycloak";

// Get the saved language from localStorage, or default to 'en'
const savedLanguage = localStorage.getItem('language')
alert(savedLanguage)
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: EN },
      nl: { translation: NL }
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
  checkLoginIframe: false, // Schakel iframe checks uit
})
.then((authenticated) => {
  console.log("Authenticated:", authenticated);
  if (authenticated) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
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
