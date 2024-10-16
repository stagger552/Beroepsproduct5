
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../../IconButton"
import { ReactComponent as Fullscreen } from "../../../img/fullscreen.svg"
import { useDashboard } from "./../DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from './../CircularGauge';

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
        setTroebelheidValue
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

    const TemperaturegaugeHeight = `${((gaugeTemeprature + 30) / 100) * 100}%`;
   

    const [fullscreenCard, setFullscreenCard] = useState(null); // Track which card is fullscreen


    const handleFullscreen = (cardId) => {
        console.log("fullscreen");

        // Toggle fullscreen mode
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.body.classList.add('fullscreen-active');
        } else {
            document.exitFullscreen();
            document.body.classList.remove('fullscreen-active');
        }

        // Update CSS to make the specified card bigger
        const card = document.getElementById(cardId);
        if (card) {
            card.classList.toggle('fullscreen-mode');
        }
    }
    const consoleLog = () => {
        console.log("hello")
        alert("hello")
    }
    return (
        <div>
            <div className="container">

                {!fullscreenCard && (

                    <div>
                        <div className="textHeader mb-2">
                            <h2 className='font-alatsi text-3xl '>Temperature</h2>
                        </div>
                        {!Advanced && (
                            <div className="Gauge justify-center flex flex-col items-center">
                                <div className="relative w-full max-w-16 h-64 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTemperature()}`}
                                        style={{ height: TemperaturegaugeHeight }}
                                    ></div>
                                </div>
                                <h3 className="mt-4 text-4xl font-semibold text-center">{gaugeTemeprature}°C</h3>

                            </div>

                        )}


                        {Advanced && (
                            <div className='lg:w-1/2 sm:w-full'>

                                <div className="p-4 flex justify-center ">
                                    <CircularGauge value={gaugeTemeprature} max={100} size={200} color='qk_blue' background='qk_blue_bg' />

                                </div>
                                <h3 className="mt-4 text-4xl font-semibold text-center ">{gaugeTemeprature}°C</h3>
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
            </div>
        </div>)
}

export default TempGauge;