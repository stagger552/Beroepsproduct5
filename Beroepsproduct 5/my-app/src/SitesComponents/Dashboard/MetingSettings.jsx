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
    const [isConnected, setIsConnected] = useState(false); // State to track connection status
    const [connectionMessage, setConnectionMessage] = useState('Niet verbonden'); // Initial message


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
        setTroebelheidValue
    } = useDashboard(); // Destructure all the context values

    // Example usage:
    const done = 5
    const OpenAIapiKey = "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"
    const AiContext = "Je bent assistent van een boei app. water zal worden genanazlyzeerd met 4 waardes: Tempratuur, PH , Troebelheid en zuurstof meting" +
        "Jij zult een sammenvatting moeten geven van alles waneer gebruiker om vraagt. Maak het kort en zeg wat dit kan betekenen. Maak het kort onder 50 woorden";


    const openSideBar = () => {
        console.log("open sidebar")
        setIsOpen(!SideIsOpen);
    }
    const switchMeting = () => {
     console.log("switch meting")  
    }

    async function callOpenAI() {
        const Aiprompt = `Geef mij een samenvatting: van deze data en informatie die ik goed kan gberuiken Data nu: Tempratuur ${TemperatureValue} , PH ${PhMeterValue} , Troebelheid ${TroebelheidValue} , Zuurstof ${ZuurstofValue} `;

        try {
            const response = await fetch('http://localhost:5000//api/callOpenAI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: Aiprompt,
                    context: AiContext
                })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;  // Return the AI response text
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            return null;
        }
    }

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

    const checkConnection = async () => {
        try {
            const response = await fetch('http://localhost:5000/StartConnection');
            if (response.ok) {
                setIsConnected(true);
                setConnectionMessage(t('Verbonden')); // Use translation for connected message
            } else {
                setIsConnected(false);
                setConnectionMessage(t('Niet verbonden')); // Use translation for not connected message
            }
        } catch (error) {
            console.error("Connection error:", error);
            setIsConnected(false);
            setConnectionMessage(t('Niet verbonden')); // Use translation for not connected message
        }
    };


    useEffect(() => {
        checkConnection(); // Check connection when component mounts
    }, []);

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
                                 {connectionMessage} 
                            </h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}

export default MetingSettings;