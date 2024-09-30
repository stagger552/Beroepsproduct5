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
                    <div id="map" className="w-full" >
                        <div><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Onderwijsboulevard%203+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <a href="https://www.gps.ie/">
                                gps vehicle tracker
                            </a>
                        </iframe>
                        </div>
                    </div> {/* Set height for map */}

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