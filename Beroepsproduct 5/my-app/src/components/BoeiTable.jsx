import React, { useState, useEffect } from 'react';

function BoeiTable({ queryType = 'boeien' }) {
    const [rowData, setRowData] = useState([]);
    const [wsData, setWsData] = useState([]);

    // Define headers based on query type
    const getHeaders = () => {
        switch (queryType.toLowerCase()) {
            case 'meetings':
                return [
                    { key: 'ID_MEETIN', label: 'Meeting ID' },
                    { key: 'ID_BOEI', label: 'Boei ID' },
                    { key: 'MEETING_TIJDSTIP', label: 'Tijdstip', format: (value) => new Date(value).toLocaleString() },
                    { key: 'MEETING_WAARDE', label: 'Waarde' },
                    { key: 'SENSOR_TYPE_INFO', label: 'Sensor Type' },
                    { key: 'LOG_GEBRUIKER', label: 'Gebruiker' },
                    { key: 'LOG_TIJD', label: 'Log Tijd', format: (value) => new Date(value).toLocaleString() },
                    { key: 'LOG_ACTIE', label: 'Log Actie' }
                ];
            case 'boeien':
            default:
                return [
                    { key: 'ID_BOEI', label: 'Boei ID' },
                    { key: 'SENSOR_TYPE_INFO', label: 'Sensor Type' },
                    { key: 'SENSOR_WAARDE', label: 'Sensor Waarde' },
                    { key: 'LONGITUDE', label: 'Longitude', format: (value) => Number(value).toFixed(6) },
                    { key: 'LATITUDE', label: 'Latitude', format: (value) => Number(value).toFixed(6) },
                    { key: 'MEETING_TIJDSTIP', label: 'Meeting Tijdstip', format: (value) => new Date(value).toLocaleString() },
                    { key: 'LOG_GEBRUIKER', label: 'Gebruiker' },
                    { key: 'LOG_ACTIE', label: 'Log Actie' }
                ];
        }
    };

    useEffect(() => {
        // WebSocket connection
        const socket = new WebSocket('ws://141.144.200.89:1880/ws/boei');

        socket.onopen = () => {
            console.log('WebSocket Connected');
            socket.send(JSON.stringify({ status: "connected" }));
        };

        socket.onmessage = (event) => {
            console.log('WebSocket data received:', event.data);
            try {
                const wsDataParsed = JSON.parse(event.data);
                setWsData(Array.isArray(wsDataParsed) ? wsDataParsed : [wsDataParsed]);
            } catch (error) {
                console.error('Error parsing WebSocket data:', error);
            }
        };

        // Initial data fetch
        const fetchData = async () => {
            try {
                const response = await fetch('http://141.144.200.89:1880/sql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `SELECT * FROM ${queryType.toUpperCase()}`
                    })
                });
                const data = await response.json();
                setRowData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Cleanup WebSocket on unmount
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [queryType]);

    // Combine initial data with WebSocket updates
    const allData = [...rowData, ...wsData];
    const headers = getHeaders();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
                {queryType === 'meetings' ? 'Meetings Data' : 'Boei Data'} Table
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            {headers.map((header) => (
                                <th 
                                    key={header.key}
                                    className="px-4 py-2 text-left text-gray-600 dark:text-gray-200"
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((row, index) => (
                            <tr 
                                key={index}
                                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {headers.map((header) => (
                                    <td 
                                        key={`${index}-${header.key}`}
                                        className="px-4 py-2 dark:text-gray-200"
                                    >
                                        {header.format 
                                            ? header.format(row[header.key])
                                            : row[header.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BoeiTable; 