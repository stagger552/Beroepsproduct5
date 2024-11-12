import React from 'react';
import { ReactComponent as Boei } from './img/boei.svg';
import { useHeader } from './headerContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguangeContext';


const pages = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];


function Footer() {

    const { translations, setLanguage } = useLanguage();

    const { Darkmode, setDarkmode } = useHeader();

    setDarkmode(Darkmode);

    const { i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <div className={`container-fluid  ${Darkmode ? 'dark:bg-zwart' : 'bg-white'} mt-16 footer py-28`}>
            <div className="container">
                <div className="row flex items-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <input className='text-center bg-beige rounded-lg p-2' type="text" placeholder="Email" />
                        <button className='text-md font-alatsi bg-green p-2 rounded-lg max-w-36 ml-5 dark:text-white'>Subscribe</button>
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
                                <div className="p-4  text-zwart dark:text-white font-alatsi m-4">{page}</div>
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
                        <div className="drowdown dark:text-zwart">

                            <select  defaultValue={i18n.language} onChange={(e) => changeLanguage(e.target.value)} name="Language" className='text-center bg-beige  rounded-lg p-2 max-w-72 w-full font-alatsi h-70px'>
                                <option value="nl">Nederlands</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="zu">Zulu</option>
                                <option value="xh">Xhosa</option>
                                <option value="af">Afrikaans</option>

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

export default Footer