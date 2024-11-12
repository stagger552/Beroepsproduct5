
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../../IconButton"
import { ReactComponent as Fullscreen } from "../../../img/fullscreen.svg"
import { ReactComponent as Smallscreen } from "../../../img/smallscreen.svg"

import { useDashboard } from "./../DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from './../CircularGauge';

import { useTranslation } from 'react-i18next'; // Import useTranslation



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
    return (
        <div>
            {FullscreenState && (


                <div>
                    <div className="textHeader mb-2">
                        <h2 className='font-alatsi text-3xl dark:text-white '>
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
                        <div className='lg:w-1/2 sm:w-full'>

                            <div className="p-4 flex justify-center ">
                                <CircularGauge value={gaugeTemeprature} max={100} size={200} color='qk_blue' background='qk_blue_bg' />

                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>
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
                        <div className='lg:w-1/2 sm:w-full'>

                            <div className="p-4 flex justify-center ">
                                <CircularGauge value={gaugeTemeprature} max={100} size={200} color='qk_blue' background='qk_blue_bg' />

                            </div>
                            <h3 className="mt-4 text-4xl font-semibold text-center dark:text-white">{gaugeTemeprature}°C</h3>
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