
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../IconButton"
import { ReactComponent as Fullscreen } from "../../img/fullscreen.svg"
import { useAdvanced } from "./DashboardContext"

function DashboardData() {
  const [temperature, setTemperature] = useState(-42);
  const { Advanced, setAdvanced } = useAdvanced();


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
    if (temperature <= 0) return 'bg-yellow-300';
    if (temperature < 20) return 'bg-red-300';
    return 'bg-red';
  };

  const gaugeHeight = `${((temperature + 42) / 82) * 100}%`;

  const PHGauge = useRef(null);
  const ZuurstofGauge = useRef(null);


  // PH Meter Gauge
  useEffect(() => {
    if (PHGauge.current) {

      const target = PHGauge.current;
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
      const gauge = new Gauge(target).setOptions(opts);
      gauge.maxValue = 14;
      gauge.setMinValue(0);
      gauge.animationSpeed = 32;
      gauge.set(7);
    } else {
      alert("Gauge not found")
    };
  }, []);

  // Ensure the value is between 0 and 14
  const clampedValue = Math.min(Math.max(7.4, 0), 14);

  // Generate 14 color blocks for the pH scale
  const colorBlocks = [
    { color: '#FF0000', label: '0' }, // Red
    { color: '#FF4500', label: '1' }, // OrangeRed
    { color: '#FFA500', label: '2' }, // Orange
    { color: '#FFD700', label: '3' }, // Gold
    { color: '#FFFF00', label: '4' }, // Yellow
    { color: '#ADFF2F', label: '5' }, // GreenYellow
    { color: '#7FFF00', label: '6' }, // Chartreuse
    { color: '#00FF00', label: '7' }, // Lime
    { color: '#00FA9A', label: '8' }, // MediumSpringGreen
    { color: '#00FFFF', label: '9' }, // Cyan
    { color: '#1E90FF', label: '10' }, // DodgerBlue
    { color: '#0000FF', label: '11' }, // Blue
    { color: '#8A2BE2', label: '12' }, // BlueViolet
    { color: '#800080', label: '13' }, // Purple
  ];

  // Calculate the position of the pointer
  const pointerPosition = (clampedValue / 14) * 100;


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


  const [isFullscreen, setIsFullscreen] = useState(false);


  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="Card bg-white border-0 p-6 rounded-lg max-w-lg m-auto mb-5 w-auto min-h-96 flex flex-col justify-between">
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

              {isFullscreen && (
                <div className="mt-8">
                  <h4 className="text-2xl font-semibold mb-2">Additional Information</h4>
                  <p className="text-lg">Here you can add more text and information that will only be visible in fullscreen mode.</p>
                  <ul className="list-disc list-inside mt-4">
                    <li>Humidity: 65%</li>
                    <li>Pressure: 1013 hPa</li>
                    <li>Wind Speed: 5 km/h</li>
                  </ul>
                </div>
              )}
              <div className='flex justify-end'>
                <button onclick={handleFullscreen}>

                </button>
                <IconButton onclick={handleFullscreen} >
                  <Fullscreen />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-lg-6">

            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-96">
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl '>Ph Meter</h2>
              </div>
              {!Advanced && (
                <div className="flex items-center">
                  <div className="w-12 h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                    {colorBlocks.map((block, index) => (
                      <div
                        key={index}
                        className="absolute w-full"
                        style={{
                          backgroundColor: block.color,
                          height: '7.14%', // 100% / 14
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
                      <div key={index} className="text-xs">{block.label}</div>
                    ))}
                  </div>
                  <div className="ml-4 text-lg font-semibold">{clampedValue.toFixed(1)}</div>
                </div>
              )}
              {Advanced && (
                <div>
                  <div className="Gauge justify-center flex">
                    <canvas ref={PHGauge} ></canvas>
                  </div>
                  <div className='bg-amber-700 w-full h-16'>
                  </div>
                </div>
              )}
              <div className='flex justify-end'>
                <button onclick={handleFullscreen}>

                </button>
                <IconButton onclick={handleFullscreen} >
                  <Fullscreen />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-96">
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

            <div className="Card bg-white border-0 p-6  rounded-lg  max-w-lg m-auto mb-5 w-auto min-h-96">
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