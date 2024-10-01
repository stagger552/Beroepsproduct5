import React from 'react';
import { ReactComponent as Boei } from './img/boei.svg';

import { Link } from 'react-router-dom';

function Header() {

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        // Add more items here if needed
    ];


    return (
        <div className="container-fluid  bg-lightblue mb-16">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 flex justify-between items-center">
                        <nav>
                            {/* Navigation */}
                            <nav className="flex space-x-6 ">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className="text-xl font-alatsi font-medium text-gray-800 p-2 rounded-lg hover:bg-white  transition"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </nav>
                    </div>

                    <div className="col-lg-4 flex items-center">
                        <Boei className='max-w-20' />
                        <Link to={'/'}>
                            <h4 className='text-5xl font-bold font-alatsi ml-4 text-center'>Arduino Metingen</h4>
                        </Link>
                    </div>

                    <div className="col-lg-4">
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header