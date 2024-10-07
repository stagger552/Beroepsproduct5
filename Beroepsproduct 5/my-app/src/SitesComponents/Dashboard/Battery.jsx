
import React, { useState, useEffect } from 'react';

function Battery() {
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prevLevel) => {
        const newLevel = prevLevel - 5;
        return newLevel >= 0 ? newLevel : 100;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (level) => {
    if (level > 60) return '#8EEB3D';
    if (level > 40) return '#ede740';
    if (level > 20) return '#eda540';
    if (level > 10) return '#ed4e40';
    return 'darkred';
  };
  return (

    <div className='Battery bg-white w-full p-5 rounded-lg my-12'>
      <div className="text">
        <h3 className='font-alatsi text-3xl'>Batterij</h3>

      </div>
      <div className="batterydata p-3 my-4 mx-auto rounded-lg w-full bg-beige min-h-60">
        <h5 className='font-roboto text-lg text-center'>Battery level</h5>
        <h3 className='font-alatsi weight-bold text-5xl text-center my-4'>{batteryLevel}%</h3>
        <div className="relative h-40 w-2/6 bg-white rounded-2/3 overflow-hidden  m-auto rounded-3xl  ">
          <div
            className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ease-in-out ${getColor(batteryLevel)}`}
            style={{ backgroundColor: getColor(batteryLevel), height: `${batteryLevel}%` }}
          ></div>

        </div>
        {batteryLevel === 100 &&(
          <h3 className='font-alatsi text-3xl text-center text-green-400'>Batterij Vol</h3>
        )}
          {batteryLevel <= 99  &&  batteryLevel > 50 &&(
          <h3 className='font-alatsi text-3xl text-center text-green-400'>Batterij Voldoende geladen</h3>
        )}
        {batteryLevel <= 40  &&  batteryLevel > 20 &&(
          <h3 className='font-alatsi text-3xl text-center text-green-400'>Batterij Erg Laag</h3>
        )}
         {batteryLevel <= 20  &&  batteryLevel > 10 &&(
          <h3 className='font-alatsi text-3xl text-center text-green-400'>Batterij Bijna Leeg, vervang batterijen Aub</h3>
        )}
        {batteryLevel === 0 && (
          <h3 className='font-alatsi text-3xl text-center text-green-400'>Batterij Leeg, vervang batterijen Aub</h3>
        )}
      </div>

    </div>
  )
}

export default Battery;