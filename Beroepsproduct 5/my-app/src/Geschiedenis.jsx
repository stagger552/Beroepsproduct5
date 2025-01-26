import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./footer";

import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";
import BoeiTable from './components/BoeiTable';

function Geschiedenis() {
    const [data, setData] = useState('Loading...');
    const [wsData, setWsData] = useState('Waiting for WebSocket data...');

    useEffect(() => {
        // Initialize WebSocket connection
        const socket = new WebSocket('ws://141.144.200.89:1880/ws/boei');

        socket.onopen = () => {
            console.log('Verbonden met WebSocket');
            socket.send(JSON.stringify({ status: "connected" }));
        };

        socket.onmessage = (event) => {
            console.log('Ontvangen data:', event.data);
            setWsData(event.data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket fout:', error);
            setWsData('WebSocket Error: ' + error.message);
        };

        // Fetch initial data
        const fetchData = async () => {
            try {
                const response = await fetch('http://141.144.200.89:1880/sql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: 'SELECT * FROM BOEIEN'
                    })
                });
                const result = await response.json();
                setData(JSON.stringify(result, null, 2));
            } catch (error) {
                setData('Error fetching data: ' + error.message);
            }
        };

        fetchData();

        // Cleanup WebSocket connection on component unmount
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);

    const handleRefreshClick = async () => {
        try {
            const response = await fetch('http://141.144.200.89:1880/sql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: 'SELECT * FROM BOEIEN'
                })
            });
            const result = await response.json();
            setData(JSON.stringify(result, null, 2));
        } catch (error) {
            setData('Error fetching data: ' + error.message);
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
                        <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-bold mb-4 dark:text-white">Boei Data</h1>
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2 dark:text-white">WebSocket Data:</h2>
                                <pre className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow dark:text-white overflow-auto">
                                    {wsData}
                                </pre>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold dark:text-white">Database Data:</h2>
                                    <button 
                                        onClick={handleRefreshClick}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Refresh Data
                                    </button>
                                </div>
                                <pre className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow dark:text-white overflow-auto">
                                    {data}
                                </pre>
                            </div>
                        </div>
                        // For Boeien data

                        
<BoeiTable queryType="boeien" />

// For Meetings data
<BoeiTable queryType="meetings" />
                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </LanguageProvider>
        </HeaderProvider>
    );
}

export default Geschiedenis