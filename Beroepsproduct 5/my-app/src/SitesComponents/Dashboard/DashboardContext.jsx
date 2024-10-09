import React, { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [Advanced, setAdvanced] = useState(false);
  const [TemperatureValue, setTemperatureValue] = useState(40);
  const [PhMeterValue, setPhMeterValue] = useState(8);
  const [ZuurstofValue, setZuurstofValue] = useState(9);
  const [TroebelheidValue, setTroebelheidValue] = useState(7);

  return (
    <DashboardContext.Provider value={{ 
      Advanced, 
      setAdvanced, 
      TemperatureValue, 
      setTemperatureValue, 
      PhMeterValue, 
      setPhMeterValue, 
      ZuurstofValue, 
      setZuurstofValue, 
      TroebelheidValue, 
      setTroebelheidValue
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
