import React from 'react';
import { ReactComponent as Tempratuur } from '../img/temperature.svg';
import { ReactComponent as PHmeter } from '../img/ph-meter.svg';

function InfoCards() {
    return (

        <div className="container Home">
            <link rel="stylesheet" href="../Style/style.css"></link>
            <div className="row">
                <div className="col-lg-12 object-center">
                    <div className="dropdown">
                    </div>
                </div>

            </div>
            <div className="row infocards">
                <div className="col-lg-6">
                    <div className="card p-4 bg-white shadow-lg max-w-lg m-auto border-">
                        <div className="flex items-start">
                            <Tempratuur className=' w-full max-h-72' />
                            <div className="w-full m-auto pr-10">
                                <div className="text-5xl font-alatsi font-bold mb-4">
                                    Temperature
                                </div>
                                <div className="textCard font-roboto">
                                    Duis cillum cupidatat pariatur veniam culpa laboris id.
                                    Ad non ut cillum consequat ad mollit commodo irure aliqua
                                    consequat esse eu id eiusmod. Cupidatat occaecat deserunt
                                    exercitation excepteur consequat incididunt id reprehenderit.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card p-4 bg-white shadow-lg max-w-lg m-auto">
                        <div className="flex items-start">
                            <PHmeter className=' w-full max-h-72' />
                            <div className="w-full m-auto">
                                <div className="text-5xl font-alatsi font-bold mb-4">
                                    Temperature
                                </div>
                                <div className="textCard font-roboto">
                                    Duis cillum cupidatat pariatur veniam culpa laboris id.
                                    Ad non ut cillum consequat ad mollit commodo irure aliqua
                                    consequat esse eu id eiusmod. Cupidatat occaecat deserunt
                                    exercitation excepteur consequat incididunt id reprehenderit.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">

                    <div className="flex justify-center mt-7">
                        <button className='btn bg-green text-zwart font-alatsi text-6xl p-4'>
                            Ga naar dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default InfoCards