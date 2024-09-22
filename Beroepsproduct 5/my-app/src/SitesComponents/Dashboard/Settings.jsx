
import React from 'react';

function Settings() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">

                        <select name="Boei" className='text-center text-zwart bg-lightblue w-full rounded-lg p-2 max-w-72 w-full font-alatsi h-70px'>
                            <option value="NL">Boei 1</option>
                        </select>
                    </div>
                    <div className="col-lg-4">
                        <input type="checkbox" id="toggle" class="toggleCheckbox" />
                        <label for="toggle" class='toggleContainer'>
                            <div>Default</div>
                            <div>Geavanceerd</div>
                        </label>

                    </div>
                </div>
            </div>
        </div>)
}

export default Settings;