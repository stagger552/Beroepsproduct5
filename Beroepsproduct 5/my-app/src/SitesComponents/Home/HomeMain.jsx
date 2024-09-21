import React from 'react';
import { ReactComponent as Boei } from '../../img/boei.svg';


function MainHome() {
    return (
        <div className="container Home">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="text-6xl font-alatsi text-center ">
                        Arduino Metingen
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 flex justify-center items-center ">
                    <Boei className='max-w-md'/>
                </div>
                <div className="col-lg-6 flex justify-center items-center ">
                </div>
            </div>
        </div>
    );
}

export default MainHome