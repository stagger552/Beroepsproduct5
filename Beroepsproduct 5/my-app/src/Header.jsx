import React, { useEffect, useState, useRef } from 'react';
import { ReactComponent as Boei } from './img/boei.svg';
import IconButton from "./IconButton"
import { Link } from 'react-router-dom';

//Svg 
import { ReactComponent as Moon } from "./img/moon.svg"
import { ReactComponent as Zon } from "./img/Sun.svg"

import { ReactComponent as SoundMax } from "./img/sound-Full.svg"
import { ReactComponent as SoundMid } from "./img/sound-Mid.svg"
import { ReactComponent as SoundOff } from "./img/sound-Off.svg"


//mp 3
import soundFile from "./Sound/gentle-ocean-waves-birdsong.mp3"


function Header() {


    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        // Add more items here if needed
    ];
    const [darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    const audioRef = useRef(null);

    const ToggleTheme = (() => {

    })
    const [currentSound, setCurrentSound] = useState(localStorage.getItem("soundWave") || '0');

   

    const ToggleSound = (() => {
        let newSoundSetting;

        if (currentSound === '0') {
            newSoundSetting = '1';
        } else if (currentSound === '1') {
            newSoundSetting = '2';
        } else {
            newSoundSetting = '0';
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }

        localStorage.setItem("soundWave", newSoundSetting);
        setCurrentSound(newSoundSetting);

        if (newSoundSetting === '1' || newSoundSetting === '2') {
            playSound(newSoundSetting);
        }
    })


    const playSound = (volumeLevel) => {
        if (audioRef.current) {
            audioRef.current.volume = volumeLevel === '1' ? 0.5 : 1.0; // Set volume based on localStorage
            audioRef.current.play().catch(error => {
                console.log("Error playing audio:", error);
            });
        } else {
            console.error("Audio element is not loaded or accessible");
        }
    };
    const handleSoundSettings = () => {
        const soundSetting = localStorage.getItem('SoundWave');

        if (!soundSetting) {
            // Initialize with default setting if no soundWave in localStorage
            localStorage.setItem('SoundWave', 2);
        } else if (soundSetting === '1' || soundSetting === '2') {
            playSound(soundSetting);
        }
    };

    useEffect(() => {
        handleSoundSettings(); // Check sound settings when component mounts
    }, []);

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

                    <div className="col-lg-4 flex justify-between items-center hover:bg-green ">

                        <IconButton onClick={ToggleTheme()} >
                            <Zon />
                        </IconButton>

                        <IconButton onClick={ToggleSound}>
                            <audio ref={audioRef} src={soundFile} />
                            {currentSound === "1" ? <SoundMid /> : currentSound === "2" ? <SoundMax /> : <SoundOff />}


                        </IconButton>


                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header