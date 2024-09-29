import React, { useState } from 'react';
import Popup from '../../Popup';
import Compass from './Compas';
function Maps() {

    const [showCompass, setShowCompass] = useState(false);

    const openCompassPopup = () => {
      setShowCompass(true);
    };
  
    const closePopup = () => {
      setShowCompass(false);
    };
    return (
        <div>
            <div className=' bg-white w-full p-5 rounded-lg my-12'>
                <div className="text">
                    <h3 className='font-alatsi text-3xl'>Map</h3>

                </div>
                <div className="flex flex-wrap">
                    <div id="map" className="w-full" style={{ height: '400px' }}></div> {/* Set height for map */}

                    <div className="w-full w-1/2">
                        <h3 className='font-alatsi text-4xl'>Longtude:{ }</h3>
                    </div>
                    <div className="w-full w-1/2">
                        <h3 className='font-alatsi text-4xl'>Latitude:{ }</h3>
                    </div>
                    <div className="w-1/3 flex justify-center my-5">
                        <button className='text-xl w-3/4 font-alatsi bg-green p-2 rounded-lg h-20px'>Navigeer</button>
                    </div>
                    <div className="w-1/3 flex justify-center my-5">
                        <button className='text-xl w-3/4 font-alatsi bg-green p-2 rounded-lg'>Ar</button>
                    </div>
                    <div className="w-1/3 flex justify-center my-5">
                        <button className='text-xl w-3/4 font-alatsi bg-green p-2 rounded-lg' onClick={openCompassPopup} >Compas</button>
                    </div>

                    {/* <div className="flex-item-full bg-red">This will take full space</div>
                    <div className="flex-item bg-green">This is another flex item</div> */}
                </div>
                {showCompass && (
                    <Popup onClose={closePopup}>
                        <Compass /> {/* The Compass component goes here */}
                    </Popup>
                )}
            </div>
        </div>)
}

export default Maps;