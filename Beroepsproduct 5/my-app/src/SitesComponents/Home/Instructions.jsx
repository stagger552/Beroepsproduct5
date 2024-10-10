import React from 'react';
import { ReactComponent as Tempratuur } from '../../img/temperature.svg';
import { ReactComponent as PHmeter } from '../../img/ph-meter.svg';
import IconButton from "../../IconButton"
// import {ReactComponent as Smallscreen} from "../../img/small-screen.svg"

function InfoCards() {

    // const [isFullscreen, setIsFullscreen] = useState(false);

    // const handleFullscreen = () => {
    //   setIsFullscreen(true);
    // };

    // const handleCloseFullscreen = () => {
    //   setIsFullscreen(false);
    // };

    const rowhide = () => {
        const hideRows = document.querySelectorAll(".rowHide");

        hideRows.forEach((row) => {
            if (row.style.display === "flex") {
                row.style.display = "none";
            } else {
                row.style.display = "flex";
            }
        });
    }
    return (

        <div className="container ">
            <div className="row m-4">
                <div className="col-lg-4 text-center ">
                    <button className='text-md font-alatsi bg-green p-2 rounded-lg w-full max-w-52' onClick={rowhide}> Laat alles zien</button>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4"></div>
            </div>
            <div className="row infocards flex">
                <div className="col-lg-6">
                    <div className={`card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5`}>
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <Tempratuur className=' w-full h-full ' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                Temperature 5
                            </div>
                            <div className="textCard font-roboto">
                                Duis cillum cupidatat pariatur veniam culpa laboris id.
                                Ad non ut cillum consequat ad mollit commodo irure aliqua
                                consequat esse eu id eiusmod. Cupidatat occaecat deserunt
                                exercitation excepteur consequat incididunt id reprehenderit.
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <IconButton>
                                {/* <Fullscreen />  */}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className={`card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5`}>
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <PHmeter className=' w-full h-full' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                PH meter
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

            <div className="row infocards rowHide flex transition duration-300 ease-in-out transform">
                <div className="col-lg-6 ">
                    <div className={`card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5`}>
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <Tempratuur className=' w-full h-full ' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                Temperature 5
                            </div>
                            <div className="textCard font-roboto">
                                Duis cillum cupidatat pariatur veniam culpa laboris id.
                                Ad non ut cillum consequat ad mollit commodo irure aliqua
                                consequat esse eu id eiusmod. Cupidatat occaecat deserunt
                                exercitation excepteur consequat incididunt id reprehenderit.
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <IconButton>
                                {/* <Fullscreen />  */}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className={`card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5`}>
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <PHmeter className=' w-full h-full' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                PH meter
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
            <div className="row infocards rowHide flex transition duration-300 ease-in-out transform">
                <div className="col-lg-6 ">
                    <div className={`card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5`}>
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <Tempratuur className=' w-full h-full ' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                Temperature 5
                            </div>
                            <div className="textCard font-roboto">
                                Duis cillum cupidatat pariatur veniam culpa laboris id.
                                Ad non ut cillum consequat ad mollit commodo irure aliqua
                                consequat esse eu id eiusmod. Cupidatat occaecat deserunt
                                exercitation excepteur consequat incididunt id reprehenderit.
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <IconButton>
                                {/* <Fullscreen />  */}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 ">
                    <div className="card p-4 border-5 border-green shadow-lg max-w-lg min-h-lg m-auto mb-5">
                        <div className="InstructionsIcon lg:w-1/2 md:w-5/12 ">
                            <PHmeter className=' w-full h-full' />
                        </div>
                        <div className="InstructionTextlg:w-1/2 md:w-full m-auto pr-10 ">
                            <div className={`text-5xl font-alatsi font-bold mb-4 `}>
                                PH meter
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

            <div className="row">
                <div className="col-lg-12">

                    <div className="flex justify-center mt-7">
                        <button className='btn bg-lightblue text-zwart font-alatsi text-1xl p-4'>
                            Ga naar dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default InfoCards