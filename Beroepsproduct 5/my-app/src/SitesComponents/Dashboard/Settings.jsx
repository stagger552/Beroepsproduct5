
import React, { useState } from 'react';
import SideBar from "../../Sidebar"
import { useDashboard } from "./DashboardContext"
import { useHeader } from '../../headerContext';
import QuickAlert from '../../QuickAlert';
import swal from 'sweetalert';


function Settings() {

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
        setTroebelheidValue
    } = useDashboard(); // Destructure all the context values

    // Example usage:
    const done = 5
    const OpenAIapiKey = null
    const AiContext = "Je bent assistent van een boei app. water zal worden genanazlyzeerd met 4 waardes: Tempratuur, PH , Troebelheid en zuurstof meting" +
        "Jij zult een sammenvatting moeten geven van alles waneer gebruiker om vraagt. Maak het kort en zeg wat dit kan betekenen. Maak het kort onder 50 woorden";


    const openSideBar = () => {
        console.log("open sidebar")
        setIsOpen(!SideIsOpen);
    }
    const switchMode = () => {
        console.log("switch mode")
        setAdvanced(!Advanced);
    }

    async function callOpenAI() {
        const Aiprompt = `Geef mij een samenvatting: van deze data en informatie die ik goed kan gberuiken Data nu: Tempratuur ${TemperatureValue} , PH ${PhMeterValue} , Troebelheid ${TroebelheidValue} , Zuurstof ${ZuurstofValue} `;

        const url = "https://api.openai.com/v1/chat/completions";

        // Prepare the headers
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OpenAIapiKey}`
        };

        // Prepare the body with your parameters
        const body = {
            model: "gpt-4o-mini", // Assuming 'gpt-4-mini' is available; adjust based on OpenAI model availability
            messages: [
                { role: "user", content: AiContext },  // Add system context
                { role: "user", content: Aiprompt }      // User input
            ]
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;  // Return the AI response text
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
    return (
        <div>

            <div className={`container ${Darkmode ? 'dark' : 'light'}`}>
                <div className="row my-4">
                    <div className="col-lg-4 flex justify-center items-center my-2">
                        <select name="Boei" className='text-center text-zwart bg-lightblue w-full rounded-lg p-2 max-w-72 w-full font-alatsi h-70px dark:bg-zwart dark:text-white' >
                            <option value="NL">Boei 1</option>
                        </select>
                    </div>
                    <div className="col-lg-4 flex justify-center items-center my-2">
                        <input type="checkbox" id="toggle" class="toggleCheckbox" onClick={switchMode} />
                        <label for="toggle" class='toggleContainer'>
                            <div className=' dark:text-white  text-zwart'>Default</div>
                            <div  className=' dark:text-white  text-zwart'>Geavanceerd</div>
                        </label>
                       
                    </div>
                    <div className="col-lg-4 my-2">
                        <div className="Button flex justify-center items-center">
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white' onClick={openSideBar} SideIsOpen={SideIsOpen}>
                                <h5 className='font-alatsi'>
                                    Ai chatbot
                                </h5>
                            </button>
                            {/* Sidebar Component */}
                            <SideBar SideIsOpen={SideIsOpen} toggleSidebar={openSideBar} />
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white' onClick={GetSamenvatting}>
                                <h5 className='font-alatsi'>
                                    Samenvatting
                                </h5>
                            </button>
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white' >
                                <h5 className='font-alatsi'>
                                    Analysis
                                </h5>
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>)
}

export default Settings;