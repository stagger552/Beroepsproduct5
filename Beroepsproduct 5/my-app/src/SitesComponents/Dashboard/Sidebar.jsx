import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDashboard } from "./DashboardContext"

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { t } = useTranslation(); // Add translation hook
    const { temperatureUnit, setTemperatureUnit } = useDashboard();

    const {
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
        setMeting
    } = useDashboard(); // Destructure all the context values

    const handleTemperatureUnitChange = (e) => {
        setTemperatureUnit(e.target.value);
    };

    return (
        <div className='bg-green'>
            {/* Button to toggle the sidebar */}
         

            {/* Sidebar */}
            <div
                className={`fixed z-50 top-0 left-0 h-full w-64 bg-green  text-white p-4 transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
               

                <div className="mt-4">
                    <h2 className="block mb-2 font-roboto text-zwart ">{t('temperature')} </h2>
                    <select 
                        className="p-1 text-gray-800"
                        value={temperatureUnit}
                        onChange={handleTemperatureUnitChange}
                    >
                        <option value="Celsius">Celsius</option>
                        <option value="Fahrenheit">Fahrenheit</option>
                        <option value="Kelvin">Kelvin</option>
                    </select>
                </div>
            </div>

            
        </div>
    );
};

export default Sidebar;
