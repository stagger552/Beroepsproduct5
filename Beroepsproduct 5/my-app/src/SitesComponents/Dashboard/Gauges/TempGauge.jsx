import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../../IconButton"
import { ReactComponent as Fullscreen } from "../../../img/fullscreen.svg"
import { ReactComponent as Smallscreen } from "../../../img/smallscreen.svg"

import { useDashboard } from "./../DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from './../CircularGauge';
import { Line } from "react-chartjs-2";

import { useTranslation } from 'react-i18next'; // Import useTranslation

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function TempGauge() {

    const { t } = useTranslation(); // Add translation hook

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
        setFullscreenGauge

    } = useDashboard(); // Destructure all the context values

    var gaugeTemeprature = TemperatureValue

    const getColorTemperature = () => {
        // if (gaugeTemeprature < -40 && gaugeTemeprature > 0) return 'bg-blue-500';
        // if (gaugeTemeprature <= 0 && gaugeTemeprature >= 20) return 'bg-yellow-300';
        // if (gaugeTemeprature < 20) return 'bg-red-300';

        if (gaugeTemeprature < 0) return 'bg-qk_blue';
        if (gaugeTemeprature > 0) return 'bg-qk_red';
    };

    const TemperaturegaugeHeight = `${((gaugeTemeprature + 30) / 100) * 100}%`;

    setFullscreenGauge(FullscreenGauge);
    setFullscreenState(FullscreenState)

    //alert("Fullscreen value: " + FullscreenState + " Gauge value: " + FullscreenGauge) 
    const handleFullscreen = (cardId) => {


        if (FullscreenState) {
            setFullscreenState(false);
            setFullscreenGauge(null);
        } else {
            setFullscreenState(true);
            setFullscreenGauge(cardId);
        }

    };
    const consoleLog = () => {
        console.log("hello")
        alert("hello")
    }

    // Add these new states
    const [timeLabels, setTimeLabels] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);

    // Add these new states for statistics
    const [stats, setStats] = useState({
        average: 0,
        minimum: Infinity,
        maximum: -Infinity
    });

    // Update the useEffect to calculate statistics
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLabels(prevLabels => {
                const newLabels = [...prevLabels];
                newLabels.push(new Date().toLocaleTimeString());
                if (newLabels.length > 10) newLabels.shift();
                return newLabels;
            });

            setTemperatureData(prevData => {
                const newData = [...prevData];
                newData.push(TemperatureValue);
                if (newData.length > 10) newData.shift();

                // Calculate statistics
                const avg = newData.reduce((a, b) => a + b, 0) / newData.length;
                const min = Math.min(...newData);
                const max = Math.max(...newData);

                setStats({
                    average: avg.toFixed(1),
                    minimum: min,
                    maximum: max
                });

                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [TemperatureValue]);

    // Add chart data configuration
    const chartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'Temperature °C',
                data: temperatureData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
            }
        },
        animation: {
            duration: 0 // Disable animation for smoother updates
        }
    };

    return (
        <div>

            {FullscreenState && (


                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl   '>
                            {t('temperatures')}
                        </h2>
                    </div>
                    {!Advanced && (
                        <div className="Gauge justify-center flex flex-col items-center">
                            <div className="relative w-full max-w-16 h-64 bg-gray-300 rounded-full overflow-hidden">
                                <div
                                    className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTemperature()}`}
                                    style={{ height: TemperaturegaugeHeight }}
                                ></div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>


                        </div>


                    )}


                    {Advanced && (
                        <div className='w-full'>
                            <div className='w-1/2 inline-block'>
                                <div className="p-4 flex justify-center ">
                                    <CircularGauge value={gaugeTemeprature} max={100} size={200} color='qk_blue' background='qk_blue_bg' />
                                </div>
                                <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>

                                {/* Add statistics display */}
                                <div className="mt-4 text-center ">
                                    <div className="grid grid-cols-3 gap-4 p-4">
                                        <div>
                                            <p className="font-semibold">{t('minimum')}</p>
                                            <p>{stats.minimum}°C</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('average')}</p>
                                            <p>{stats.average}°C</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('maximum')}</p>
                                            <p>{stats.maximum}°C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 inline-block'>
                                <div className="mt-4 p-4">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='flex justify-end mt-4'>

                        <IconButton onClick={() => handleFullscreen(1)} >
                            <Smallscreen />
                        </IconButton>

                        <button onClick={consoleLog}>Klick mij</button>
                    </div>


                </div>



            )}

            {!FullscreenState && (

                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl dark:text-white '>
                            {t('temperature')}
                        </h2>
                    </div>
                    {!Advanced && (
                        <div className="Gauge justify-center flex flex-col items-center">
                            <div className="relative w-full max-w-16 h-64 bg-gray-300 rounded-full overflow-hidden">
                                <div
                                    className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTemperature()}`}
                                    style={{ height: TemperaturegaugeHeight }}
                                ></div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>

                        </div>

                    )}


                    {Advanced && (
                        <div className='w-full'>
                            <div className='w-1/2 inline-block'>
                                <div className="p-4 flex justify-center ">
                                    <CircularGauge value={gaugeTemeprature} max={100} size={200} color='qk_blue' background='qk_blue_bg' />
                                </div>
                                <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>

                                {/* Add statistics display */}
                                <div className="mt-4 text-center dark:text-white">
                                    <div className="grid grid-cols-3 gap-4 p-4">
                                        <div>
                                            <p className="font-semibold">{t('minimum')}</p>
                                            <p>{stats.minimum}°C</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('average')}</p>
                                            <p>{stats.average}°C</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('maximum')}</p>
                                            <p>{stats.maximum}°C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 inline-block'>
                                <div className="mt-4 p-4">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    )}



                    <div className='flex justify-end mt-4'>

                        <IconButton onClick={() => handleFullscreen(1)} >
                            <Fullscreen />
                        </IconButton>

                        <button onClick={consoleLog}>Klick mij</button>
                    </div>


                </div>
            )}

        </div>)
}

export default TempGauge;