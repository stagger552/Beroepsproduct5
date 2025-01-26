import Header from "./Header";
import Footer from "./footer";
import React, { useEffect, useState } from 'react';
import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";
const CryptoJS = require("crypto-js");


    
    function CreateBoei() {
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

        return (
            <HeaderProvider>
                <LanguageProvider>
                    <div className={`bg-beige dark:bg-zwart`}>
                        <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                            {/* Header */}
                            <Header />
    
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2>
                                            Boei aanmaken
                                        </h2>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2>
                                            Boei aanmaken
                                        </h2>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                       <input type="number" className="w-full min-h-8 max-w-64 p-3" placeholder="BoeiID" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                       <input type="number" className="w-full min-h-8 max-w-64 p-3" placeholder="Latitude" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                       <input type="number" className="w-full min-h-8 max-w-64 p-3" placeholder="Longitude" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                       <Button> Boei aanmaken</Button>
                                    </div>
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
    
    

export default CreateBoei


