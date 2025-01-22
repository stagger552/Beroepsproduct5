import React, { createContext, useState, useContext, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [Advanced, setAdvanced] = useState(false);
  const [TemperatureValue, setTemperatureValue] = useState(null);
  const [PhMeterValue, setPhMeterValue] = useState(null);
  const [ZuurstofValue, setZuurstofValue] = useState(null);
  const [TroebelheidValue, setTroebelheidValue] = useState(null);
  const [FullscreenState, setFullscreenState] = useState(false);
  const [FullscreenGauge, setFullscreenGauge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ReceivedAt, setReceivedAt] = useState(null);


  const fetchSensorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data');
      const data = await response.json();
      
      if (data.error) {
        // Handle the "No data available" case
        setTemperatureValue(null);
        setPhMeterValue(null);
        setTroebelheidValue(null);
        setError(data.error);
      } else {
        // Update sensor values from the API response
        setTemperatureValue(data.decodedPayload.temperature);
        setPhMeterValue(data.decodedPayload.pH);
        setTroebelheidValue(data.decodedPayload.turbidity);
        setReceivedAt(data.decodedPayload.receivedAt);

      }
      
    } catch (err) {
      setError('Failed to fetch sensor data');
      console.error('Error fetching data:', err);
      // Set values to null on error
      setTemperatureValue(null);
      setPhMeterValue(null);
      setTroebelheidValue(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchSensorData();
    
    // Set up interval to fetch data every 30 seconds
    const interval = setInterval(fetchSensorData, 30000);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

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
      setTroebelheidValue,
      FullscreenState,
      setFullscreenState,
      FullscreenGauge,
      setFullscreenGauge,
      loading,
      error,
      fetchSensorData // Exposing the fetch function so it can be called from components
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
