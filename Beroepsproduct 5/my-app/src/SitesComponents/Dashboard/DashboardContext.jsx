import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
  const [Meting, setMeting] = useState(false);

  var Responseresult = null

  // Add new state for temperature unit
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');

  const fetchData = async () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
      "https://node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data";

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "ARRAffinity=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d; ARRAffinitySameSite=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d",
        },
      });

      if (response.data.error) {
        console.log("Error with the response");
        setTemperatureValue(0);
        setPhMeterValue(0);
        setTroebelheidValue(0);
      } else {
        console.log("Data received:", response.data);
        setTemperatureValue(response.data.decodedPayload.temperature);
        setPhMeterValue(response.data.decodedPayload.pH);
        setTroebelheidValue(response.data.decodedPayload.turbidity);
        setReceivedAt( formatDateTime( response.data.receivedAt));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      console.error("Error message:", err.message);
    }
  };
 
  useEffect(() => {
  

    fetchData();

    const interval = setInterval(fetchData, 5000);

  

}, []); // Empty dependency array ensures this runs only once

const formatDateTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

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
      Meting,
      setMeting,
      temperatureUnit,
      setTemperatureUnit
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
