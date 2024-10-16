
import React, { useState, useEffect } from 'react';
import { useDashboard } from "./DashboardContext"
import CircularGauge from './CircularGauge';

function QuikData() {
  const [temperature, setTemperature] = useState(29);
  const [animationProgress, setAnimationProgress] = useState(0);
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

  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTemperature(prevTemp => {
  //       const newTemp = prevTemp + (Math.random() - 0.5) * 5;
  //       return Math.min(Math.max(newTemp, 0), 50); // Keep temperature between 0 and 50
  //     });
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   setAnimationProgress(0);
  //   const animation = setInterval(() => {
  //     setAnimationProgress(prev => Math.min(prev + 0.05, 1));
  //   }, 50);

  //   return () => clearInterval(animation);
  // }, [TemperatureValue]);

  function calculateWidth(value,Minimum, Maximum) {
    
    const width = value + Minimum / Maximum  * 100;
    return `${width}%`;
  }

  const gaugeWidthValue = 100; // percentage value as a number
  const gaugeWidth = `${gaugeWidthValue}%`; // percentage value as a string
  const gaugeHeight = 40;
  // const filledWidth = (TemperatureValue / 100) * gaugeWidthValue * animationProgress;
  const filledWidthTemperature = calculateWidth(TemperatureValue, 30 , 100)
  const filledWidthPhmeter = calculateWidth(PhMeterValue,0 , 14)
  const filledWidthZuurstof = calculateWidth(ZuurstofValue,0 , 100)

  return (
    <div>
      <div className="container my-7">
        <div className="row">
          <div className="col-lg-4 flex justify-center items-center">
            <div className="bg-white h-full border-0 rounded-lg  max-w-lg m-auto mb-5 w-full  h-48 flex flex-col items-center justify-center">
              {!Advanced && (
                <div className="DataGauge w-full  flex flex-col items-center">
                  <div className="Gauge w-full">
                    <div className="w-3/4 m-auto flex justify-center">
                      <svg width={gaugeWidth} height={gaugeHeight}>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height={gaugeHeight}
                          fill="#FFD1DC"
                          rx="10"
                          ry="10"
                        />
                        <rect
                          x="0"
                          y="0"
                          width={filledWidthTemperature}
                          height={gaugeHeight}
                          fill="#FF6B6B"
                          rx="10"
                          ry="10"
                        />
                      </svg>
                      <div className="gaugeText w-1/4 text-2xl font-bold text-qk_red ml-2">
                        {TemperatureValue.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="DataText">
                    <h3 className="text-center text-2xl font-bold text-qk_red  my-6">
                      Tempratures
                    </h3>
                  </div>
                </div>
              )}

              {Advanced && (
                <div className="p-4">
                  <div className='w-full'>
                    <CircularGauge value={TemperatureValue} max={100} size={200} color='qk_red' background='qk_red_bg' />
                  </div>
                  <div className="DataText w-full">
                    <h3 className="text-center text-5xl font-bold text-qk_red my-4 ">
                      Temperatuur
                    </h3>
                  </div>
                </div>

              )}
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="bg-white border-0 h-full  rounded-lg  max-w-lg m-auto mb-5 w-full h-48 flex flex-col items-center justify-center">
              {!Advanced && (

                <div className="DataGauge w-full  flex flex-col items-center">
                  <div className="Gauge w-full">
                    <div className="w-3/4 m-auto flex justify-center">
                      <svg width={gaugeWidth} height={gaugeHeight}>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height={gaugeHeight}
                          fill="#CCCEFF"
                          rx="10"
                          ry="10"
                        />
                        <rect
                          x="0"
                          y="0"
                          width={filledWidthPhmeter}
                          height={gaugeHeight}
                          fill="#636AE8"
                          rx="10"
                          ry="10"
                        />
                      </svg>
                      <div className="gaugeText w-1/4 text-2xl font-bold text-qk_purple ml-2 ">
                        {PhMeterValue.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="DataText">
                    <h3 className="text-center text-2xl font-bold text-qk_purple my-2 ">
                      Ph meter
                    </h3>
                  </div>
                </div>
              )}
              {Advanced && (
                <div className="p-4">
                  <CircularGauge value={PhMeterValue} max={100} size={200} color='qk_purple' background='qk_purple_bg' />
                  <div className="DataText">
                    <h3 className="text-center text-5xl font-bold text-qk_purple my-4 ">
                      Ph Meter
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="bg-white border-0  h-full rounded-lg  max-w-lg m-auto mb-5 w-full h-48 flex flex-col items-center justify-center">
              {!Advanced && (

                <div className="DataGauge w-full flex flex-col items-center">
                  <div className="Gauge w-full">
                    <div className="w-3/4 m-auto flex justify-center">
                      <svg width={gaugeWidth} height={gaugeHeight}>
                        <rect
                          x="0"
                          y="0"
                          width="100%"
                          height={gaugeHeight}
                          fill="#CCE8FF"
                          rx="10"
                          ry="10"
                        />
                        <rect
                          x="0"
                          y="0"
                          width={filledWidthZuurstof}
                          height={gaugeHeight}
                          fill="#379AE6"
                          rx="10"
                          ry="10"
                        />
                      </svg>
                      <div className="gaugeText w-1/4 text-2xl font-bold text-qk_blue ml-2">
                        {ZuurstofValue.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="DataText">
                    <h3 className="text-center text-2xl font-bold text-qk_blue my-2 ">
                      Zuurstof
                    </h3>
                  </div>
                </div>
              )}
              {Advanced && (
                <div className="p-4">
                  <CircularGauge value={ZuurstofValue} max={100} size={200} color='qk_blue' background='qk_blue_bg' />
                  <div className="DataText">
                    <h3 className="text-center text-5xl font-bold text-qk_blue my-4 ">
                      Zuurstof
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default QuikData;