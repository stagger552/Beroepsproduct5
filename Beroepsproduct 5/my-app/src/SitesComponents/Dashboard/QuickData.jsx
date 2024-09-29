
import React, { useState, useEffect } from 'react';

function QuikData() {
  const [temperature, setTemperature] = useState(29);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        const newTemp = prevTemp + (Math.random() - 0.5) * 5;
        return Math.min(Math.max(newTemp, 0), 50); // Keep temperature between 0 and 50
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimationProgress(0);
    const animation = setInterval(() => {
      setAnimationProgress(prev => Math.min(prev + 0.05, 1));
    }, 50);

    return () => clearInterval(animation);
  }, [temperature]);

  const gaugeWidthValue = 100; // percentage value as a number
  const gaugeWidth = `${gaugeWidthValue}%`; // percentage value as a string
  const gaugeHeight = 40;
  const filledWidth = (temperature / 50) * gaugeWidthValue * animationProgress;

  console.log(gaugeWidthValue)
  console.log(gaugeWidth)
  console.log(gaugeHeight)
  console.log(filledWidth)
  return (
    <div>
      <div className="container my-7">
        <div className="row">
          <div className="col-lg-4 flex justify-center items-center">
            <div className="bg-white border-0 rounded-lg  max-w-lg m-auto mb-5 w-full  h-48 flex flex-col items-center justify-center">
              <div className="DataGauge w-full flex flex-col items-center">
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
                        width={filledWidth}
                        height={gaugeHeight}
                        fill="#FF6B6B"
                        rx="10"
                        ry="10"
                      />
                    </svg>
                    <div className="gaugeText w-1/4 text-2xl font-bold text-gray-700 ml-2">
                      {temperature.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="DataText">
                  <h3 className="text-center text-2xl font-bold text-gray-700 my-2">
                    Temprature
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="bg-white border-0   rounded-lg  max-w-lg m-auto mb-5 w-full h-48 flex flex-col items-center justify-center">
              <div className="DataGauge w-full flex flex-col items-center">
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
                        width={filledWidth}
                        height={gaugeHeight}
                        fill="#636AE8"
                        rx="10"
                        ry="10"
                      />
                    </svg>
                    <div className="gaugeText w-1/4 text-2xl font-bold text-gray-700 ml-2 text-red-600">
                      {temperature.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="DataText">
                  <h3 className="text-center text-2xl font-bold text-gray-700 my-2 text-indigo-600">
                    Ph meter
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="bg-white border-0   rounded-lg  max-w-lg m-auto mb-5 w-full h-48 flex flex-col items-center justify-center">
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
                        width={filledWidth}
                        height={gaugeHeight}
                        fill="#379AE6"
                        rx="10"
                        ry="10"
                      />
                    </svg>
                    <div className="gaugeText w-1/4 text-2xl font-bold text-gray-700 ml-2">
                      {temperature.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="DataText">
                  <h3 className="text-center text-2xl font-bold text-gray-700 my-2 text-blue-600">
                    Zuurstof
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default QuikData;