import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [Darkmode, setDarkmode] = useState(false);


    return (
        <HeaderContext.Provider value={{
            Darkmode,
            setDarkmode,
           
        }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);
