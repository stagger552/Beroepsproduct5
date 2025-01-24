import React, { createContext, useState, useContext, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [Advanced, setAdvanced] = useState(false);

  const [TemperatureValue, setTemperatureValue] = useState(0);
  const [PhMeterValue, setPhMeterValue] = useState(0);
  const [ZuurstofValue, setZuurstofValue] = useState(0);
  const [TroebelheidValue, setTroebelheidValue] = useState(0);

  const [FullscreenState, setFullscreenState] = useState(false);
  const [FullscreenGauge, setFullscreenGauge] = useState(false);


  const [ReceivedAt, setReceivedAt] = useState(null);


  // Function to fetch sensor data from the API
  const fetchSensorData = async () => {

    try {

      // Make API request to fetch sensor data
      const response = await fetch('node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data');
      const data = await response.json();
      
      if (data.error) {

        console.log("Error met het ophallen")

        // If API returns an error, clear all sensor values and set error message
        setTemperatureValue(0);
        setPhMeterValue(0);
        setTroebelheidValue(0);
      } else {

        console.log("Iets ontvangen")
        // If successful, update sensor values with data from API response
        setTemperatureValue(data.decodedPayload.temperature);
        setPhMeterValue(data.decodedPayload.pH);
        setTroebelheidValue(data.decodedPayload.turbidity);
        setReceivedAt(data.decodedPayload.receivedAt);
      }
      
    } catch (err) {
      // If fetch fails, set error message and clear sensor values
      console.error('Error fetching data:', err);
    
      console.error('Error message fetching', err.message);
      console.log('Error message fetching', err.message);


    } finally {
      // Always set loading back to false when done
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    console.log("Start sensordata get")
    fetchSensorData();
    
    // // Set up interval to fetch data every 30 seconds
    // const interval = setInterval(fetchSensorData, 30000);
    
    // // Cleanup interval on unmount
    // return () => clearInterval(interval);
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
      ReceivedAt,
      setReceivedAt,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
