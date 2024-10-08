import React, { createContext, useState, useContext } from 'react';

const AdvancedContext = createContext();

export const AdvancedProvider = ({ children }) => {
  const [Advanced, setAdvanced] = useState(false);
  // const [otherInfo, setOtherInfo] = useState('');
  // Add any other state you want to share

  return (
    <AdvancedContext.Provider value={{ 
      Advanced, 
      setAdvanced, 
      // otherInfo, 
      // setOtherInfo,
      // Add other state and setter functions here
    }}>
      {children}
    </AdvancedContext.Provider>
  );
};

export const useAdvanced = () => useContext(AdvancedContext);