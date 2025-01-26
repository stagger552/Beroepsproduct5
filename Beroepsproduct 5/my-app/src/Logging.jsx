import Header from "./Header";
import Footer from "./footer";
import React, { useEffect, useState } from 'react';
import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";
const CryptoJS = require("crypto-js");

const socket = new WebSocket('ws://141.144.200.89:1880/ws/log');

// Wanneer de WebSocket verbinding maakt
socket.onopen = () => {
    console.log('Verbonden met WebSocket');
    // Stuur een bericht naar de WebSocket In node zodra de verbinding is gemaakt
    socket.send(JSON.stringify({ status: "connected" }));
};

// Luister naar berichten van de WebSocket
socket.onmessage = (event) => {
    console.log('Ontvangen data:', event.data);
    // Als de data in een string-formaat is, converteren we deze eerst naar een object
    const data = JSON.parse(event.data);
    sessionStorage.setItem("pageLogs", JSON.stringify(data)); // Opslaan in sessionStorage
};


// WebSocket foutmelding
socket.onerror = (error) => {
    console.error('WebSocket fout:', error);
}
    
    
    function Logging() {
        
        // State om logs op te slaan
        const [logs, setLogs] = useState([]);
        useEffect(() => {
            const secretKey = "superveiligwachtwoord"; // Zorg dat dit overeenkomt met de encryptiesleutel
            const encryptedLogs = JSON.parse(sessionStorage.getItem("pageLogs")) || []; // Ophalen van de JSON
    
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


