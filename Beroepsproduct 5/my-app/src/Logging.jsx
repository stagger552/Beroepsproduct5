import Header from "./Header";
import Footer from "./footer";
import React, { useEffect, useState } from 'react';
import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";
const CryptoJS = require("crypto-js");

// const socket = new WebSocket('ws://141.144.200.89:1880/ws/boei');

/* 


socket.onopen = (event) => {
    console.log('Verbonden met de WebSocket-server');
    
    socket.send('Hallo server!');
};


socket.onmessage = (event) => {
    console.log('Bericht ontvangen van server:', event.data);
    sessionStorage.setItem('Logs', JSON.stringify(event.data))

    
};


socket.onerror = (event) => {
    console.error('WebSocket-fout opgetreden:', event);
};


socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`Verbinding netjes gesloten, code: ${event.code}, reden: ${event.reason}`);
    } else {
        console.error('Verbinding abrupt gesloten');
    }
}; */

    const dataWeb = [
    {
    "ID_BOEI": 2,
    "ID_KOPPELING": 1002,
    "ID_SENSOR": 102,
    "SENSOR_WAARDE": "60",
    "SENSOR_TYPE_INFO": "Vochtigheid",
    "ID_LOCATIE": 2,
    "LONGITUDE": 52.3667,
    "LATITUDE": 4.8945,
    "ID_MEETIN": 2002,
    "MEETING_TIJDSTIP": "2023-10-02T14:10:00.000Z",
    "MEETING_WAARDE": "60",
    "ID_SENSOR_1": 102,
    "LOG_ID": 2,
    "LOG_GEBRUIKER": "user",
    "LOG_TIJD": "2023-10-02T14:00:00.000Z",
    "LOG_ACTIE": "Sensor 102 gekoppeld aan Boei 2"
    },
    {
    "ID_BOEI": 3,
    "ID_KOPPELING": 1003,
    "ID_SENSOR": 103,
    "SENSOR_WAARDE": "1020",
    "SENSOR_TYPE_INFO": "Luchtdruk",
    "ID_LOCATIE": 3,
    "LONGITUDE": 48.8566,
    "LATITUDE": 2.3522000000000003,
    "ID_MEETIN": 2003,
    "MEETING_TIJDSTIP": "2023-10-03T16:15:00.000Z",
    "MEETING_WAARDE": "1020",
    "ID_SENSOR_1": 103,
    "LOG_ID": 3,
    "LOG_GEBRUIKER": "admin",
    "LOG_TIJD": "2023-10-03T16:00:00.000Z",
    "LOG_ACTIE": "Locatie 3 toegevoegd"
    }
    ];

    sessionStorage.setItem('Logs', JSON.stringify(dataWeb));



    
    
    function Logging() {
        // State om logs op te slaan
        const [logs, setLogs] = useState([]);
        useEffect(() => {
            const secretKey = "superveiligwachtwoord"; // Zorg dat dit overeenkomt met de encryptiesleutel
            const encryptedLogs = JSON.parse(localStorage.getItem("pageLogs")) || []; // Ophalen van de JSON
    
            // Decrypt specifieke velden in de logs
            const decryptedLogs = encryptedLogs.map((log) => ({
                ...log, // Neem alle niet-versleutelde velden over
                LOG_GEBRUIKER: decryptField(log.LOG_GEBRUIKER, secretKey),
                LOG_ACTIE: decryptField(log.LOG_ACTIE, secretKey),
            }));
    
            setLogs(decryptedLogs); // Opslaan in de state
        }, []);
    
        // Helperfunctie voor decryptie
        const decryptField = (encryptedValue, secretKey) => {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
                return bytes.toString(CryptoJS.enc.Utf8); // Converteer naar tekst
            } catch (error) {
                console.error("Fout bij decryptie:", error);
                return "Decryptie mislukt"; // Fallback
            }
        };

        
    
        /* useEffect(() => {
            // Haal logs op uit sessionStorage
            //const storedLogs = JSON.parse(sessionStorage.getItem('Logs')) || [];
            const storedLogs = JSON.parse(localStorage.getItem('pageLogs')) || [];
            setLogs(storedLogs); // Zet de logs in de state
        }, []); */
    
        return (
            <HeaderProvider>
                <LanguageProvider>
                    <div className={`bg-beige dark:bg-zwart`}>
                        <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                            {/* Header */}
                            <Header />
    
                            {/* Main Content */}
                            <div className="flex-grow mt-16">
                                <h1 className="text-2xl text-center text-gray-800 dark:text-gray-200">
                                    Logging Page
                                </h1>
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    This is the logging page where you can view and manage logs.
                                </p>
    
                                {/* Log List */}
                                <div className="mt-8 max-w-4xl mx-auto">
                                    <table className="min-w-full table-auto text-left border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                                                <th className="px-4 py-2 text-gray-700 dark:text-gray-200">Log ID</th>
                                                <th className="px-4 py-2 text-gray-700 dark:text-gray-200">User</th>
                                                <th className="px-4 py-2 text-gray-700 dark:text-gray-200">Timestamp</th>
                                                <th className="px-4 py-2 text-gray-700 dark:text-gray-200">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {logs.length > 0 ? (
                                                logs.map((log) => (
                                                    <tr key={log.LOG_ID} className="border-b border-gray-300 dark:border-gray-600">
                                                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.LOG_ID}</td>
                                                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.LOG_GEBRUIKER}</td>
                                                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.LOG_TIJD}</td>
                                                        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{log.LOG_ACTIE}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="4"
                                                        className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                                                    >
                                                        No logs available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
    
                            {/* Footer */}
                            <Footer />
                        </div>
                    </div>
                </LanguageProvider>
            </HeaderProvider>
        );
    }
    
    

export default Logging


