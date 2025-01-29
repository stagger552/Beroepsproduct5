import React, { useState } from 'react';
import SideBar from "./Sidebar"
import { useDashboard } from "./DashboardContext"
import { useHeader } from '../../headerContext';
import QuickAlert from '../../QuickAlert';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next'; // Import useTranslation

function Settings() {

    const [SideIsOpen, setIsOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);  // State to control visibility of the alert
    const [alertMessage, setAlertMessage] = useState(''); // Store the response from OpenAI
    const { Darkmode, setDarkmode } = useHeader();

    const { t } = useTranslation(); // Add translation hook

    const navigate = useNavigate();

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


    const openSideBar = () => {
        console.log("open sidebar")
        setIsOpen(!SideIsOpen);
    }
    const switchMode = () => {
        console.log("switch mode")
        setAdvanced(!Advanced);
    }

    async function callOpenAI() {

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
                        <input type="checkbox" id="settings-toggle" className="toggleCheckbox" onClick={switchMode} />
                        <label htmlFor="settings-toggle" className='toggleContainer'>
                            <div className='dark:text-white text-zwart'>{t('Normaal')}</div>
                            <div className='dark:text-white text-zwart'>{t('Geavanceerd')}</div>
                        </label>
                    </div>
                    <div className="col-lg-4 my-2">
                        <div className="Button flex justify-center items-center">
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white' onClick={openSideBar}>
                                <h5 className='font-alatsi'>
                                    {t('Menu')}
                                </h5>
                            </button>
                            {/* Pass the state and toggle function to Sidebar */}
                            <SideBar isOpen={SideIsOpen} toggleSidebar={openSideBar} />
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white' onClick={GetSamenvatting}>
                                <h5 className='font-alatsi'>
                                    {t('Samenvatting')}
                                </h5>
                            </button>
                            <button 
                                className='bg-lightblue p-2 rounded-lg mx-1 w-1/3 dark:bg-zwart dark:text-white'
                                onClick={() => navigate('/CreateBoei')}
                            >
                                <h5 className='font-alatsi'>
                                    {t('Boei aanmaken')}
                                </h5>
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>)
}

export default Settings;