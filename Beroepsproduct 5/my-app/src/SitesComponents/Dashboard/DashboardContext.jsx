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

  var Responseresult = null

  // Function to fetch sensor data from the API
  // const fetchSensorData = async () => {
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Cookie", "ARRAffinity=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d; ARRAffinitySameSite=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d");

      
  //     const requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,

  //       redirect: "follow"
  //     };

  //     const response = await fetch("https://node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data", requestOptions);
  //     const Responseresult = await response.text();
  //     console.log(Responseresult);

  //     if (Responseresult.error) {
  //       console.log("Error met het ophallen");
  //       setTemperatureValue(0);
  //       setPhMeterValue(0);
  //       setTroebelheidValue(0);
  //     } else {
  //       console.log("Iets ontvangen", Responseresult);
  //       setTemperatureValue(Responseresult.decodedPayload.temperature);
  //       setPhMeterValue(Responseresult.decodedPayload.pH);
  //       setTroebelheidValue(Responseresult.decodedPayload.turbidity);
  //       setReceivedAt(Responseresult.decodedPayload.receivedAt);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching data:', err);
  //     console.error('Error message fetching', err.message);
  //     console.log('Error message fetching', err.message);
  //   }
  // };
  const fetchData = async () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
      "https://node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data";

    try {
      const response = await axios.get(proxyUrl + apiUrl, {
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
        setReceivedAt(response.data.decodedPayload.receivedAt);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      console.error("Error message:", err.message);
    }
  };
 
  useEffect(() => {
    // async function fetchData() {
    //     try {
    //         const config = {
    //             method: 'get',
    //             url: 'https://node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Cookie': 'ARRAffinity=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d; ARRAffinitySameSite=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d',
    //                 'Access-Control-Allow-Origin': '*'
    //             },
    //             withCredentials: true,
    //             crossDomain: true
    //         };

    //         const response = await axios(config);
    //         console.log('Raw response:', response.data);

    //         if (response.data.error) {
    //             console.log('Error fetching data');
    //             setTemperatureValue(0);
    //             setPhMeterValue(0);
    //             setTroebelheidValue(0);
    //         } else {
    //             console.log('Data received:', response.data);
    //             setTemperatureValue(response.data.decodedPayload?.temperature || 0);
    //             setPhMeterValue(response.data.decodedPayload?.pH || 0);
    //             setTroebelheidValue(response.data.decodedPayload?.turbidity || 0);
    //             setReceivedAt(response.data.decodedPayload?.receivedAt || null);
    //         }
    //     } catch (err) {
    //         console.error('Error details:', {
    //             message: err.message,
    //             code: err.code,
    //             response: err.response
    //         });
    //         // Fallback to fetch if axios fails
    //         try {
    //             const myHeaders = new Headers();
    //             myHeaders.append("Content-Type", "application/json");
    //             myHeaders.append("Cookie", "ARRAffinity=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d; ARRAffinitySameSite=f713f0f1cb2d612cbe6f58d71b77f1092aa9f759c3a958fb9d0a879c478aeb7d");

    //             const requestOptions = {
    //                 method: "GET",
    //                 headers: myHeaders,
    //                 redirect: "follow",
    //                 credentials: 'include'
    //             };

    //             const response = await fetch("https://node-3-caaue0bmd0gcaabv.germanywestcentral-01.azurewebsites.net/data", requestOptions);
    //             const data = await response.json();
                
    //             if (data.error) {
    //                 setTemperatureValue(0);
    //                 setPhMeterValue(0);
    //                 setTroebelheidValue(0);
    //             } else {
    //                 setTemperatureValue(data.decodedPayload?.temperature || 0);
    //                 setPhMeterValue(data.decodedPayload?.pH || 0);
    //                 setTroebelheidValue(data.decodedPayload?.turbidity || 0);
    //                 setReceivedAt(data.decodedPayload?.receivedAt || null);
    //             }
    //         } catch (fetchErr) {
    //             console.error('Both axios and fetch failed:', fetchErr);
    //         }
    //     }
    // }

    // fetchData();
    
    // // Set up interval to fetch every 30 seconds
    // const interval = setInterval(fetchData, 30000);
    
    // // Cleanup on unmount
    // return () => clearInterval(interval);

    fetchData();


}, []); // Empty dependency array ensures this runs only once


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
