
import React, { useEffect, useRef, useState } from 'react';
import { useDashboard } from "./DashboardContext"

import { useHeader} from "../../headerContext"
// import { Chart, registerables } from 'chart.js';

import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';

import EN from "../../Translation/EN/translation.json";
import NL from "../../Translation/NL/translation.json";

import TempGauge from './Gauges/TempGauge';
import PhGauge from "./Gauges/PhGauge";
import ZuurstofGauge from "./Gauges/ZuurstofGauge";
import TroebelheidGauge from "./Gauges/TroebelheidGauge";

function DashboardData() {
  const savedLanguage = localStorage.getItem('language') || 'en';


  const { Darkmode, setDarkmode } = useHeader();

  setDarkmode(Darkmode);
  
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


  useEffect(() => {
    const timer = setInterval(() => {
      setTemperatureValue(prevTemp => (prevTemp + 1 > 100 ? -40 : prevTemp + 1));
      setPhMeterValue(prevPh => (prevPh + 0.1 > 14 ? 0 : prevPh + 0.1));
      setZuurstofValue(prevOxygen => (prevOxygen + 0.1 > 10 ? 0 : prevOxygen + 0.1));
      setTroebelheidValue(prevTurbidity => (prevTurbidity + 0.1 > 10 ? 0 : prevTurbidity + 0.1));

    }, 1000); // Update values every second

    return () => clearInterval(timer);
  }, [setTemperatureValue, setPhMeterValue, setZuurstofValue, setTroebelheidValue]);

  
  const handleFullscreen = (cardId) => {
    setFullscreenState((prevState) => !prevState);
    setFullscreenGauge(cardId);
  };
  setFullscreenGauge(false);
  setFullscreenState(null)
  return (
    <div className='container'>

      {FullscreenState && (
        <div className="row dark">
          <div className="col-lg-12">
          <div className={`Card    ${Darkmode ? 'bg-zwart' : 'bg-white'}  w-full border-0 p-6 rounded-lg m-auto mb-5 w-auto min-h-96 flex flex-col justify-between `}>              
              

              {FullscreenGauge === 1 && <TempGauge />}
              {FullscreenGauge === 2 && <PhGauge />}
              {FullscreenGauge === 3 && <TroebelheidGauge />}
              {FullscreenGauge === 4 && <ZuurstofGauge />}
            </div>
          </div>
        </div>
      )}
      {!FullscreenState && (

        <div>
          <div className="row">
            <div className="col-lg-6">
              <div className={`Card  ${Darkmode ? 'bg-zwart' : 'bg-white'} border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <TempGauge />


              </div>
            </div>
            <div className="col-lg-6">

              <div className={`Card  ${Darkmode ? 'bg-zwart' : 'bg-white'} border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <PhGauge />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className={`Card  ${Darkmode ? 'bg-zwart' : 'bg-white'} border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
                <TroebelheidGauge />
              </div>
            </div>
            <div className="col-lg-6">

              <div className={`Card  ${Darkmode ? 'bg-zwart' : 'bg-white'} border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
              <ZuurstofGauge />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>)
}

export default DashboardData;