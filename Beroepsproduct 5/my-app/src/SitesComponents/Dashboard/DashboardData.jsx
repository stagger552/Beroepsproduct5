
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';

function DashboardData() {
  const [temperature, setTemperature] = useState(-42);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setTemperature(prevTemp => {
        const newTemp = prevTemp + 1;
        return newTemp > 40 ? -42 : newTemp;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const getColor = () => {
    if (temperature < -20) return 'bg-blue-500';
    if (temperature <= 0) return 'bg-blue-300';
    if (temperature < 20) return 'bg-red-300';
    return 'bg-red';
  };

  const gaugeHeight = `${((temperature + 42) / 82) * 100}%`;

  const PHGauge = useRef(null);
  const ZuurstofGauge = useRef(null);

  // PH Meter Gauge
  useEffect(() => {
    const opts = {
      angle: 0,
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
        { strokeStyle: "#FF0000", min: 0, max: 1 },
        { strokeStyle: "#FF4500", min: 1, max: 2 },
        { strokeStyle: "#FF8C00", min: 2, max: 3 },
        { strokeStyle: "#FFD700", min: 3, max: 4 },
        { strokeStyle: "#FFFF00", min: 4, max: 5 },
        { strokeStyle: "#ADFF2F", min: 5, max: 6 },
        { strokeStyle: "#7FFF00", min: 6, max: 7 },
        { strokeStyle: "#32CD32", min: 7, max: 8 },
        { strokeStyle: "#00FF00", min: 8, max: 9 },
        { strokeStyle: "#00FA9A", min: 9, max: 10 },
        { strokeStyle: "#00FFFF", min: 10, max: 11 },
        { strokeStyle: "#1E90FF", min: 11, max: 12 },
        { strokeStyle: "#0000FF", min: 12, max: 13 },
        { strokeStyle: "#8A2BE2", min: 13, max: 14 },
      ],
    };

    const target = PHGauge.current;
    const gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 14;
    gauge.setMinValue(0);
    gauge.animationSpeed = 32;
    gauge.set(7);
  }, []);

  // Zuurstof Gauge
  useEffect(() => {
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
    gauge.maxValue = 3000;
    gauge.setMinValue(0);
    gauge.animationSpeed = 99;
    gauge.set(1775);
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="Card bg-white border-0 p-6 rounded-lg max-w-lg m-auto mb-5 w-auto min-h-48 flex flex-col justify-between">
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl '>Temperature</h2>
              </div>
              <div className="Gauge justify-center flex flex-col items-center">
                <div className="relative w-full max-w-16 h-64 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColor()}`}
                    style={{ height: gaugeHeight }}
                  ></div>
                </div>
              </div>
              <h3 className="mt-4 text-4xl font-semibold text-center">{temperature}°C</h3>
            </div>
          </div>
          <div className="col-lg-6">

            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-48">
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl '>Ph Meter</h2>
              </div>
              <div className="Gauge justify-center flex">
                <canvas ref={PHGauge} ></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-48">
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl '>Troebelheid</h2>
              </div>
              <div className="Gauge justify-center flex flex-col items-center">
                <div className="relative w-full max-w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColor()}`}
                    style={{ height: gaugeHeight }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">

            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-48">
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl'>Zuurstof</h2>
              </div>
              <div className="Gauge justify-center flex">
                <canvas ref={ZuurstofGauge} ></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default DashboardData;