
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../IconButton"
import { ReactComponent as Fullscreen } from "../../img/fullscreen.svg"
import { useDashboard } from "./DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from './CircularGauge';

import TempGauge from './Gauges/TempGauge';
import PhGauge from "./Gauges/PhGauge";
import ZuurstofGauge from "./Gauges/ZuurstofGauge";
import TroebelheidGauge from "./Gauges/TroebelheidGauge";

function DashboardData() {

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


  useEffect(() => {
    const timer = setInterval(() => {
      setTemperatureValue(prevTemp => (prevTemp + 1 > 100 ? -40 : prevTemp + 1));
      setPhMeterValue(prevPh => (prevPh + 0.1 > 14 ? 0 : prevPh + 0.1));
      setZuurstofValue(prevOxygen => (prevOxygen + 0.1 > 10 ? 0 : prevOxygen + 0.1));
      setTroebelheidValue(prevTurbidity => (prevTurbidity + 0.1 > 10 ? 0 : prevTurbidity + 0.1));
    }, 1000); // Update values every second

    return () => clearInterval(timer);
  }, [setTemperatureValue, setPhMeterValue, setZuurstofValue, setTroebelheidValue]);

  const [fullscreenCard, setFullscreenCard] = useState(null); // Track which card is fullscreen

  
  return (
    <div className='container'>

      {fullscreenCard && (
        <div className="row">
          <div className="col-lg-12">
            <div className={`Card bg-white border-0 p-6 rounded-lg w-full  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between}`}>

            </div>
          </div>
        </div>
      )}
      {!fullscreenCard && (

        <div>
          <div className="row">
            <div className="col-lg-6">
              <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <TempGauge />


              </div>
            </div>
            <div className="col-lg-6">

              <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <PhGauge />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <TroebelheidGauge />
              </div>
            </div>
            <div className="col-lg-6">

              <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <ZuurstofGauge />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>)
}

export default DashboardData;