import Header from "./Header";
import Footer from "./footer";
import React, { useEffect, useState } from 'react';
import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";


const socket = new WebSocket('ws://141.144.200.89:1880/ws/boei');

// Eventlistener voor succesvolle verbinding
socket.onopen = (event) => {
    console.log('Verbonden met de WebSocket-server');
    // Stuur een bericht naar de server
    socket.send('Hallo server!');
};

// Eventlistener voor ontvangen berichten
socket.onmessage = (event) => {
    console.log('Bericht ontvangen van server:', event.data);
    // Verwerk het ontvangen bericht
};

// Eventlistener voor fouten
socket.onerror = (event) => {
    console.error('WebSocket-fout opgetreden:', event);
};

// Eventlistener voor gesloten verbinding
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`Verbinding netjes gesloten, code: ${event.code}, reden: ${event.reason}`);
    } else {
        console.error('Verbinding abrupt gesloten');
    }
};



function Logging() {
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


