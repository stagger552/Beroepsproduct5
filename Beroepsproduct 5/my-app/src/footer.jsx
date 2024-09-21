import React from 'react';
import { ReactComponent as Boei } from './img/boei.svg';
const pages = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
function Header() {
    return (
        <div className="container-fluid  bg-white mt-16 footer py-28">
            <div className="container">
                <div className="row flex items-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <input className='text-center bg-beige rounded-lg p-2' type="text" placeholder="Email" />
                        <button className='text-md font-alatsi bg-green p-2 rounded-lg max-w-36 ml-5'>Subscribe</button>
                    </div>
                    <div className="col-lg-4"></div>

                </div>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-3">
                        <Boei className='max-w-20' />
                    </div>
                    <div className="col-lg-7">
                        <div className="flex space-x-4">
                            {pages.map((page) => (
                                <div className="p-4 bg-blue-500 text-zwart font-alatsi">{page}</div>
                            ))}
                            
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <hr>
                    </hr>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="drowdown">

                            <select name="Language" className='text-center bg-beige rounded-lg p-2 max-w-72 w-full font-alatsi h-70px'>
                                <option value="NL">Nederlands</option>
                                <option value="EN">English</option>
                                <option value="FR">French</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4"></div>

                </div>
            </div>
        </div>

    );
}

export default Header