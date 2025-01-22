import Header from "./Header";
import Footer from "./footer";
import React, { useState, useEffect } from "react";

import { HeaderProvider } from "./headerContext";
import { LanguageProvider } from "./LanguangeContext";

function CreateBoei() {
    const [formData, setFormData] = useState({
        id: '',
        longitude: '',
        latitude: '',
        sensors: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBuoyData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('YOUR_API_ENDPOINT_HERE');
            const data = await response.json();
            
            // Update form data with received values
            setFormData({
                id: data.deviceId || '',
                longitude: data.decodedPayload.Longitude || '',
                latitude: data.decodedPayload.Latitude !== "Geen waarde" ? data.decodedPayload.Latitude : '',
                sensors: JSON.stringify({
                    pH: data.decodedPayload.pH,
                    temperature: data.decodedPayload.temperature,
                    turbidity: data.decodedPayload.turbidity
                })
            });
        } catch (err) {
            setError('Failed to fetch buoy data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchBuoyData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the logic to handle the form submission
        console.log('Form submitted:', formData);
    };

    return (
        <HeaderProvider>
            <LanguageProvider>
                <div className={`bg-beige dark:bg-zwart`}>
                    <div className="min-h-screen flex flex-col bg-beige dark:bg-zinc-800">
                        {/* Header */}
                        <Header />

                        {/* Main Content */}
                        <div className="flex-grow mt-16 container mx-auto px-4">
                            <h1 className="text-2xl text-center text-gray-800 dark:text-gray-200 mb-8">
                                Create New Buoy
                            </h1>
                            
                            {loading && (
                                <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
                                    Loading data...
                                </div>
                            )}

                            {error && (
                                <div className="text-center text-red-500 mb-4">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                                <div>
                                    <label htmlFor="id" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Buoy ID
                                    </label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                                 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="longitude" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        id="longitude"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                                 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="latitude" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        id="latitude"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                                 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="sensors" className="block text-gray-700 dark:text-gray-300 mb-2">
                                        Sensors
                                    </label>
                                    <input
                                        type="text"
                                        id="sensors"
                                        name="sensors"
                                        value={formData.sensors}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                                 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 
                                                 transition-colors duration-200"
                                    >
                                        Create Buoy
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={fetchBuoyData}
                                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 
                                                 transition-colors duration-200"
                                        disabled={loading}
                                    >
                                        Refresh Data
                                    </button>
                                </div>
                            </form>

                            {/* Display current sensor values */}
                            {formData.sensors && (
                                <div className="mt-8 max-w-md mx-auto p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                        Current Sensor Values
                                    </h2>
                                    <div className="space-y-2">
                                        {Object.entries(JSON.parse(formData.sensors)).map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-300">{key}:</span>
                                                <span className="text-gray-800 dark:text-gray-200">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            </LanguageProvider>
        </HeaderProvider>
    );
}

export default CreateBoei;
