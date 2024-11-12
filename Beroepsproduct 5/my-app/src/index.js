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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>

      <App />
    </I18nextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
