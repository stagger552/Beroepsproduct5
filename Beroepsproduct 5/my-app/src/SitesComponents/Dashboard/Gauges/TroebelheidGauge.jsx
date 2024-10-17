
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../../IconButton"
import { ReactComponent as Fullscreen } from "../../../img/fullscreen.svg"
import { ReactComponent as Smallscreen } from "../../../img/smallscreen.svg"

import { useDashboard } from "../DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from '../CircularGauge';

function TempGauge() {

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
    var gaugePhmeter = PhMeterValue.toFixed(2)
    var gaugeZuurstof = ZuurstofValue.toFixed(2)
    var gaugeTroebelheid = TroebelheidValue.toFixed(2)



    const getColorTemperature = () => {
        // if (gaugeTemeprature < -40 && gaugeTemeprature > 0) return 'bg-blue-500';
        // if (gaugeTemeprature <= 0 && gaugeTemeprature >= 20) return 'bg-yellow-300';
        // if (gaugeTemeprature < 20) return 'bg-red-300';

        if (gaugeTemeprature < 0) return 'bg-qk_blue';
        if (gaugeTemeprature > 0) return 'bg-qk_red';
    };
    const getColorTroebelheid = () => {
        // if (gaugeTemeprature < -40 && gaugeTemeprature > 0) return 'bg-blue-500';
        // if (gaugeTemeprature <= 0 && gaugeTemeprature >= 20) return 'bg-yellow-300';
        // if (gaugeTemeprature < 20) return 'bg-red-300';

        if (gaugeTemeprature < 50) return 'bg-qk_blue';
        if (gaugeTemeprature > 50) return 'bg-qk_red';
    };

    const TroebelheidgaugeHeight = `${((gaugeTroebelheid) / 100) * 100}%`;


    const PHGauge = useRef(null);
    const ZuurstofGauge = useRef(null);


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

    useEffect(() => {
        if (Advanced && ZuurstofGauge.current) {

            const opts = {
                angle: 0,
                lineWidth: 0.44,
                radiusScale: 0.88,
                pointer: {
                    length: 0.6,
                    strokeWidth: 0.013,
                    color: '#000000',
                },
                limitMax: false,
                limitMin: false,
                colorStart: '#6FADCF',
                colorStop: '#8FC0DA',
                strokeColor: '#E0E0E0',
                generateGradient: true,
                highDpiSupport: true,
            };

            const target = ZuurstofGauge.current;
            const gauge = new Gauge(target).setOptions(opts);
            gauge.maxValue = 100;
            gauge.setMinValue(0);
            gauge.animationSpeed = 99;
            gauge.set(gaugeZuurstof);
        } else {
            console.log("Gauge not found")
            // alert("Gauge not found")
        };

    }, [Advanced, ZuurstofGauge]);


    // Ensure the value is between 0 and 14
    const clampedValue = Math.min(Math.max(7.4, 0), 14);

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


    // Zuurstof Gauge
    useEffect(() => {

    }, []);


    setFullscreenGauge(FullscreenGauge);
    setFullscreenState(FullscreenState)

    const handleFullscreen = (cardId) => {
 

        if(FullscreenState)
        {
            setFullscreenState(false);
            setFullscreenGauge(null);
        }else
        {
            setFullscreenState(true);
            setFullscreenGauge(cardId);
        }
    
    };
    const consoleLog = () => {
        console.log("hello")
        alert("hello")
    }
    return (
        <div>
            {FullscreenState && (
                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl '>Troebelheid</h2>
                    </div>


                    {!Advanced && (
                        <div>
                            <div className="Gauge justify-center flex flex-col items-center">
                                <div className="relative w-full max-w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTroebelheid()}`}
                                        style={{ height: TroebelheidgaugeHeight }}
                                    ></div>
                                </div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center">{gaugeTroebelheid} PH</h3>
                        </div>
                    )}
                    {Advanced && (
                        <div className='lg:w-1/2 sm:w-full'>
                            <div className="Gauge justify-center flex flex-col items-center ">
                                <div className="relative w-full max-w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTroebelheid()}`}
                                        style={{ height: TroebelheidgaugeHeight }}
                                    ></div>
                                </div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center ">{gaugeTroebelheid} PH</h3>
                        </div>
                    )}
                    <div className='flex justify-end mt-4'>

                        <IconButton onClick={() => handleFullscreen(1)} >
                            <Smallscreen />
                        </IconButton>
                    </div>
                </div>
            )}
            {!FullscreenState && (

                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl '>Troebelheid</h2>
                    </div>


                    {!Advanced && (
                        <div>
                            <div className="Gauge justify-center flex flex-col items-center">
                                <div className="relative w-full max-w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTroebelheid()}`}
                                        style={{ height: TroebelheidgaugeHeight }}
                                    ></div>
                                </div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center">{gaugeTroebelheid} PH</h3>
                        </div>
                    )}
                    {Advanced && (
                        <div className='lg:w-1/2 sm:w-full'>
                            <div className="Gauge justify-center flex flex-col items-center ">
                                <div className="relative w-full max-w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTroebelheid()}`}
                                        style={{ height: TroebelheidgaugeHeight }}
                                    ></div>
                                </div>
                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center ">{gaugeTroebelheid} PH</h3>
                        </div>
                    )}
                    <div className='flex justify-end mt-4'>

                        <IconButton onClick={() => handleFullscreen(3)} >
                            <Fullscreen />
                        </IconButton>
                    </div>
                </div>
            )}

        </div>)
}

export default TempGauge;