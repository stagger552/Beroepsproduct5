
import React, { useEffect, useRef, useState } from 'react';
import { Gauge } from 'gaugeJS';
import IconButton from "../../IconButton"
import { ReactComponent as Fullscreen } from "../../img/fullscreen.svg"
import { useDashboard } from "./DashboardContext"
// import { Chart, registerables } from 'chart.js';
import CircularGauge from './CircularGauge';

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

  var gaugeTemeprature = TemperatureValue
  var gaugePhmeter = PhMeterValue.toFixed(2)
  var gaugeZuurstof = 8
  var gaugeTroebelheid = 20



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

  const TemperaturegaugeHeight = `${((gaugeTemeprature + 30) / 100) * 100}%`;
  const TroebelheidgaugeHeight = `${((gaugeTroebelheid) / 100) * 100}%`;
  const ZuurstofgaugeHeight = `${((gaugeTroebelheid) / 100) * 100}%`;


  const PHGauge = useRef(null);
  const ZuurstofGauge = useRef(null);


  // PH Meter Gauge
  useEffect(() => {
    if (Advanced && PHGauge.current) {

      const target = PHGauge.current;
      const opts = {
        angle: -0.20,
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
  const pointerPosition = (clampedValue / 14) * 100;


  // Zuurstof Gauge
  useEffect(() => {

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
            <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
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

                <IconButton onclick={handleFullscreen} >
                  <Fullscreen />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-lg-6">

            <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl '>Ph Meter</h2>
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
                  <div className="ml-4 text-4xl font-semibold text-center my-6 font-alatsi">{gaugePhmeter}</div>

                </div>
              )}
              {Advanced && (
                <div>
                  <div className="Gauge justify-center flex lg:w-1/2 sm:w-full">
                    <canvas ref={PHGauge} ></canvas>

                  </div>
                  <h3 className="mt-4 text-4xl font-semibold text-center lg:w-1/2 sm:w-full">{gaugePhmeter} PH</h3>

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
            <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
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
            </div>
          </div>
          <div className="col-lg-6">

            <div className={`Card bg-white border-0 p-6 rounded-lg  m-auto mb-5 w-auto min-h-96 flex flex-col justify-between ${Advanced ? '' : 'max-w-72'}`}>
              <div className="textHeader mb-2">
                <h2 className='font-alatsi text-3xl'>Zuurstof</h2>
              </div>
              {!Advanced && (

                <div className="Gauge justify-center flex flex-col items-center">
                  <div className="relative w-full max-w-16 h-64 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`absolute bottom-0 w-full transition-all duration-300 ease-in-out ${getColorTemperature()}`}
                      style={{ height: ZuurstofgaugeHeight }}
                    ></div>
                  </div>
                  <h3 className="mt-4 text-4xl font-semibold text-center">{gaugeTemeprature} Zuurstof</h3>

                </div>


              )}

              {Advanced && (
                <div className='lg:w-1/2 sm:w-full'>
                  <div className="Gauge justify-center flex ">
                    <canvas ref={ZuurstofGauge} ></canvas>
                  </div>
                  <h3 className="mt-4 text-4xl font-semibold  text-center ">{gaugeZuurstof} PH</h3>
                </div>
              )}



            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default DashboardData;