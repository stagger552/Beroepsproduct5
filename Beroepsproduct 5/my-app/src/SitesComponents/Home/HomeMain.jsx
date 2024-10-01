import React, { useEffect, useRef } from 'react';
import { ReactComponent as Boei } from '../../img/boei.svg';
import  Arduino  from '../../img/ArduinoUno.png';
import waves from 'nice-waves'; // Import the nice-waves library


function MainHome() {
    const waveRef = useRef(null);

    useEffect(() => {
        const opts = {
            fills: [
                "rgba(39, 96, 210, 0.4)",
                "rgba(18, 212, 121, 0.4)",
                "rgba(0, 201, 255, 0.4)"
            ],
            offset: 0.13,
            randomWavelength: 0.31,
            wavelength: 16,


        };

        const waveInstance = waves(opts).mount(waveRef.current);

        return () => {
            waveInstance.stop(); // Clean up the wave animation when the component unmounts
        };
    }, []);

    return (
        <div className="relative w-full h-full my-5 py-5">
            <div className="absolute top-0 left-0 w-full h-full" ref={waveRef}></div> {/* Wave container */}

            <div className="container Home relative z-10">
                
                <div className="row">
                    <div className="col-lg-6 flex justify-center items-center ">
                        <Boei className='max-w-md' />
                    </div>
                    <div className="col-lg-6 flex justify-center items-center ">
                        <img src={Arduino} className='max-w-md' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHome