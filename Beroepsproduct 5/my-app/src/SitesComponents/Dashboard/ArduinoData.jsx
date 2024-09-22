import React from 'react';
import Battery from './Battery';
import Map from './Map';

function ArduinoData() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">


                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <Battery />
                </div>
                <div className="col-lg-7">
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default ArduinoData;