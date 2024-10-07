
import React from 'react';

function Settings() {
    return (
        <div>
            <div className="container">
                <div className="row my-4">
                    <div className="col-lg-4 flex justify-center items-center my-2">
                        <select name="Boei" className='text-center text-zwart bg-lightblue w-full rounded-lg p-2 max-w-72 w-full font-alatsi h-70px'>
                            <option value="NL">Boei 1</option>
                        </select>
                    </div>
                    <div className="col-lg-4 flex justify-center items-center my-2">
                        <input type="checkbox" id="toggle" class="toggleCheckbox" />
                        <label for="toggle" class='toggleContainer'>
                            <div>Default</div>
                            <div>Geavanceerd</div>
                        </label>

                    </div>
                    <div className="col-lg-4 my-2">
                        <div className="Button flex justify-center items-center">
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3'> 
                                <h5 className='font-alatsi'>
                                    Ai chatbot
                                </h5>
                            </button>
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3'> 
                                <h5 className='font-alatsi'>
                                    Samenvatting
                                </h5>
                            </button>
                            <button className='bg-lightblue p-2 rounded-lg mx-1 w-1/3'> 
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