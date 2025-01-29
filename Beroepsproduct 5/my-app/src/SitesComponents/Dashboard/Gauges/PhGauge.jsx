import React, { useEffect, useRef, createContext } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../../IconButton"
import { ReactComponent as Fullscreen } from "../../../img/fullscreen.svg"
import { ReactComponent as Smallscreen } from "../../../img/smallscreen.svg"

import { useDashboard } from "./../DashboardContext"
// import { Chart, registerables } from 'chart.js';
import { useTranslation } from 'react-i18next';
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
import { Line } from 'react-chartjs-2';
import { useState } from 'react';

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

    const LanguageContext = createContext();

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
        setFullscreenGauge,
        ReceivedAt,
        setReceivedAt,
        Meting,
        setMeting
    } = useDashboard(); // Destructure all the context values


    var gaugeTemeprature = TemperatureValue



    var gaugePhmeter = PhMeterValue
    // var gaugeZuurstof = ZuurstofValue.toFixed(2)
    // var gaugeTroebelheid = TroebelheidValue.toFixed(2)


    const PHGauge = useRef(null);

    // PH Meter Gauge
    useEffect(() => {
        if (Advanced && PHGauge.current) {

            const target = PHGauge.current;
            const opts = {
                angle: -0.00,
                lineWidth: 0.4,
                radiusScale: 1,
                pointer: {
                    length: 0.7,
                    strokeWidth: 0.035,
                    color: '#000000',
                },
                limitMax: false,
                limitMin: false,
                highDpiSupport: true,
                staticLabels: {
                    font: "10px sans-serif",
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                    color: "#000000",
                    fractionDigits: 0
                },
                renderTicks: {
                    divisions: 14,
                    divWidth: 1.1,
                    divLength: 0.7,
                    divColor: '#333333',
                    subDivisions: 0,
                    subLength: 0.5,
                    subWidth: 0.6,
                    subColor: '#666666'
                },
                staticZones: [
                    { strokeStyle: "#DC2626", min: 0, max: 1 },
                    { strokeStyle: "#EF4444", min: 1, max: 2 },
                    { strokeStyle: "#F97316", min: 2, max: 3 },
                    { strokeStyle: "#FB923C", min: 3, max: 4 },
                    { strokeStyle: "#FACC15", min: 4, max: 5 },
                    { strokeStyle: "#FDE047", min: 5, max: 6 },
                    { strokeStyle: "#A3E635", min: 6, max: 7 },
                    { strokeStyle: "#84CC16", min: 7, max: 8 },
                    { strokeStyle: "#22C55E", min: 8, max: 9 },
                    { strokeStyle: "#4ADE80", min: 9, max: 10 },
                    { strokeStyle: "#2DD4BF", min: 10, max: 11 },
                    { strokeStyle: "#60A5FA", min: 11, max: 12 },
                    { strokeStyle: "#3B82F6", min: 12, max: 13 },
                    { strokeStyle: "#7e22ce", min: 13, max: 14 },
                ],
            };
            const gauge = new Gauge(target).setOptions(opts);
            gauge.maxValue = 14;
            gauge.setMinValue(0);
            gauge.animationSpeed = 32;
            gauge.set(gaugePhmeter);
        } else {
            console.log("Gauge not found")
            // alert("Gauge not found")
        };

    }, [Advanced, PHGauge]);



    // Generate 14 color blocks for the pH scale
    const colorBlocks = [
        { color: '#DC2626', label: '0' }, // Red
        { color: '#EF4444', label: '1' }, // OrangeRed
        { color: '#F97316', label: '2' }, // Orange
        { color: '#FB923C', label: '3' }, // Gold
        { color: '#FACC15', label: '4' }, // Yellow
        { color: '#FDE047', label: '5' }, // GreenYellow
        { color: '#A3E635', label: '6' }, // Chartreuse
        { color: '#84CC16', label: '7' }, // Lime
        { color: '#22C55E', label: '8' }, // MediumSpringGreen
        { color: '#4ADE80', label: '9' }, // Cyan
        { color: '#2DD4BF', label: '10' }, // DodgerBlue
        { color: '#60A5FA', label: '11' }, // Blue
        { color: '#3B82F6', label: '12' }, // BlueViolet
        { color: '#7e22ce', label: '13' }, // Purple
    ];

    // Calculate the position of the pointer
    const pointerPosition = (gaugePhmeter / 14) * 100;


    setFullscreenGauge(FullscreenGauge);
    setFullscreenState(FullscreenState)

    const handleFullscreen = (cardId) => {


        if (FullscreenState) {
            setFullscreenState(false);
            setFullscreenGauge(null);
        } else {
            setFullscreenState(true);
            setFullscreenGauge(cardId);
        }

    };

    // Add these new states
    const [timeLabels, setTimeLabels] = useState([]);
    const [phData, setPhData] = useState([]);
    const [stats, setStats] = useState({
        average: 0,
        minimum: Infinity,
        maximum: -Infinity
    });

    // Add useEffect for updating the graph and stats
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLabels(prevLabels => {
                const newLabels = [...prevLabels];
                newLabels.push(new Date().toLocaleTimeString());
                if (newLabels.length > 10) newLabels.shift();
                return newLabels;
            });

            setPhData(prevData => {
                const newData = [...prevData];
                newData.push(gaugePhmeter);
                if (newData.length > 10) newData.shift();

                // Calculate statistics
                const avg = newData.reduce((a, b) => a + b, 0) / newData.length;
                const min = Math.min(...newData);
                const max = Math.max(...newData);

                setStats({
                    average: avg.toFixed(2),
                    minimum: min.toFixed(2),
                    maximum: max.toFixed(2)
                });

                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gaugePhmeter]);

    // Add chart configuration
    const chartData = {
        labels: timeLabels,
        datasets: [
            {
                label: 'pH Value',
                data: phData,
                borderColor: '#22C55E',
                tension: 0.1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                min: 0,
                max: 14
            }
        },
        animation: {
            duration: 0
        }
    };

    return (
        <div>
            {FullscreenState && (
                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl dark:text-white'>{t('Ph meter')}</h2>
                    </div>
                    {!Advanced && (
                        <div>
                            <div className="flex justify-center items-center">
                                <div className="w-12 h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                                    {colorBlocks.map((block, index) => (
                                        <div
                                            key={index}
                                            className="absolute w-full"
                                            style={{
                                                backgroundColor: block.color,
                                                height: '30px', // 100% / 14
                                                bottom: `${index * 7.14}%`,
                                            }}
                                        />
                                    ))}
                                    <div
                                        className="absolute left-0 w-full h-1 bg-black"
                                        style={{ bottom: `${pointerPosition}%` }}
                                    />
                                </div>
                                <div className="ml-4 flex flex-col justify-between h-64">
                                    {colorBlocks.slice().reverse().map((block, index) => (
                                        <div key={index} className="text-xs font-roboto">{block.label}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="ml-4 text-4xl font-semibold text-center my-6 font-alatsi dark:text-white">
                                {Meting ? (
                                    <>{gaugePhmeter} PH</>
                                ) : (
                                    <>{t('Geen meting')}</>
                                )}
                            </div>

                        </div>
                    )}
                    {Advanced && (
                        <div className='w-full'>
                            <div className='w-1/2 inline-block'>
                                <div className="Gauge justify-center flex">
                                    <canvas ref={PHGauge}></canvas>
                                </div>
                                <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">
                                    
                                {Meting ? (
                                    <>{gaugePhmeter} PH</>
                                ) : (
                                    <>{t('Geen meting')}</>
                                )}
                                </h3>

                                {/* Add statistics display */}
                                <div className="mt-4 text-center dark:text-white">
                                    <div className="grid grid-cols-3 gap-4 p-4">
                                        <div>
                                            <p className="font-semibold">{t('minimum')}</p>
                                            <p>{stats.minimum} pH</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('average')}</p>
                                            <p>{stats.average} pH</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t('maximum')}</p>
                                            <p>{stats.maximum} pH</p>
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
                        <IconButton onClick={() => handleFullscreen(2)} >
                            <Smallscreen />
                        </IconButton>
                    </div>
                </div>
            )}

            {!FullscreenState && (

                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl dark:text-white'> {t('Ph meter')}</h2>
                    </div>
                    {!Advanced && (
                        <div>
                            {Meting && (
                                <div className="flex justify-center items-center">
                                    <div className="w-12 h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                                        {colorBlocks.map((block, index) => (
                                            <div
                                                key={index}
                                                className="absolute w-full"
                                                style={{
                                                    backgroundColor: block.color,
                                                    height: '30px', // 100% / 14
                                                    bottom: `${index * 7.14}%`,
                                                }}
                                            />
                                        ))}
                                        <div
                                            className="absolute left-0 w-full h-1 bg-black"
                                            style={{ bottom: `${pointerPosition}%` }}
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-col justify-between h-64">
                                        {colorBlocks.slice().reverse().map((block, index) => (
                                            <div key={index} className="text-xs font-roboto">{block.label}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="ml-4 text-4xl font-semibold text-center my-6 font-alatsi dark:text-white">
                                {Meting ? (
                                    <>{gaugePhmeter} PH</>
                                ) : (
                                    <>{t('Geen meting')}</>
                                )}
                            </div>

                        </div>
                    )}
                    {Advanced && (
                        <div className='w-full'>
                            <div className='w-1/2 inline-block'>

                                {Meting && (
                                    <div className="Gauge justify-center flex">
                                        <canvas ref={PHGauge}></canvas>
                                    </div>
                                )}
                                <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{Meting ? (
                                    <>{gaugePhmeter} PH</>
                                ) : (
                                    "Geen meting"
                                )}</h3>

                                {/* Add statistics display */}
                                {Meting && (
                                    <div className="mt-4 text-center dark:text-white">
                                        <div className="grid grid-cols-3 gap-4 p-4">
                                            <div>
                                                <p className="font-semibold">{t('Minimaal')}</p>
                                                <p>{stats.minimum} pH</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{t('Gemiddeld')}</p>
                                                <p>{stats.average} pH</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{t('Maximaal')}</p>
                                                <p>{stats.maximum} pH</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='w-1/2 inline-block'>
                            {Meting && (
                                <div className="mt-4 p-4">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            )}
                            </div>
                        </div>
                    )}

                    <div className='flex justify-end mt-4'>
                        <IconButton onClick={() => handleFullscreen(2)} >
                            <Fullscreen />
                        </IconButton>
                    </div>
                </div>
            )}

        </div>)
}

export default TempGauge;