import React from 'react';
import { ReactComponent as Boei } from './img/boei.svg';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="container-fluid  bg-lightblue mb-16">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/dashboard">Dashboard</Link>
                        </nav>
                    </div>

                    <div className="col-lg-4 flex items-center">
                        <Boei className='max-w-20' />
                        <h4 className='text-5xl font-bold font-alatsi ml-4 text-center'>Arduino Metingen</h4>
                    </div>

                    <div className="col-lg-4">
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header