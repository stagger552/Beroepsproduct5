// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
import EN from "./Translation/EN/translation.json";
import NL from "./Translation/NL/translation.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("EN");
    const translations = language === "EN" ? EN : NL;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
