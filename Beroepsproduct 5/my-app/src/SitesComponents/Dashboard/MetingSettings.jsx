import React, { useState, useEffect } from 'react';
import SideBar from "./Sidebar"
import { useDashboard } from "./DashboardContext"
import { useHeader } from '../../headerContext';
import QuickAlert from '../../QuickAlert';
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';


function MetingSettings() {

    const { t } = useTranslation(); // Initialize translation hook

    const [SideIsOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);  // State to control visibility of the alert
    const [alertMessage, setAlertMessage] = useState(''); // Store the response from OpenAI



    const { Darkmode, setDarkmode } = useHeader();

    setDarkmode(Darkmode);

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
        setTroebelheidValue,
        FullscreenState,
        setFullscreenState,
        FullscreenGauge,
        setFullscreenGauge,
        ReceivedAt,
        setReceivedAt,
        Meting,
        setMeting
    } = useDashboard(); // Destructure all the context values

    const [isConnected, setIsConnected] = useState(Meting); // State to track connection status

    const openSideBar = () => {
        console.log("open sidebar")
        setIsOpen(!SideIsOpen);
    }
    const switchMeting = () => {
        try {
            console.log("switch meting")

            if (isConnected) {
                setIsConnected(false)
                setMeting(false)
            } else {
                setIsConnected(true)
                setMeting(true)
            }
        } catch (error) {
            console.log(error)
        }
    }



    async function callOpenAI() {
        const Aiprompt = `Geef mij een samenvatting: van deze data en informatie die ik goed kan gberuiken Data nu: Tempratuur ${TemperatureValue} , PH ${PhMeterValue} , Troebelheid ${TroebelheidValue} , Zuurstof ${ZuurstofValue} `;

        // try {
        //     const response = await fetch('http://localhost:5000//api/callOpenAI', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             prompt: Aiprompt,
        //             context: AiContext
        //         })
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     return data;  // Return the AI response text
        // } catch (error) {
        //     console.error("Error calling OpenAI API:", error);
        //     return null;
        // }
    }

    console.log(ReceivedAt)

    const GetSamenvatting = async () => {
        console.log("start samenvatting")
        const response = await callOpenAI();

        if (response) {
            swal({
                title: "Samenvatting",
                text: response,
                icon: "info",
                button: "Sluiten"
            });
        } else {
            swal({
                title: "Fout",
                text: "Er is een probleem opgetreden bij het ophalen van de samenvatting.",
                icon: "error",
                button: "Probeer opnieuw"
            });
        }
    }



    return (
        <div>

            <div className={`container ${Darkmode ? 'dark' : 'light'}`}>
                <div className="row my-4">

                    <div className="col-lg-4 flex justify-center items-center my-2">
                        <input type="checkbox" id="meting-toggle" className="toggleCheckbox" onClick={switchMeting} />
                        <label htmlFor="meting-toggle" className='toggleContainer'>
                            <div className='dark:text-white text-zwart'>Stop Meting</div>
                            <div className='dark:text-white text-zwart'>Start Meting</div>
                        </label>
                    </div>
                    <div className="col-lg-4 my-2">
                        <div className={`text-center w-full h-full rounded-full  text-white p-4  ${isConnected ? 'bg-lime-500' : 'bg-qk_red'}`}>
                            <h5 className='dark:text-white  text-zwart font-roboto  text- '>
                                {isConnected ? 'Verbonden' : 'Niet verbonden'}
                            </h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h1 className='dark:text-white text-zwart text-l block m-auto'>Laatste meting: {ReceivedAt}</h1>
                    </div>
                </div>

            </div>
        </div>)
}

export default MetingSettings;