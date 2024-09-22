import React, { useEffect, useState } from 'react';
import { ReactComponent as Boei } from './img/boei.svg'; // Import your SVG logo

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the duration (in milliseconds) as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className={`loading-screen ${loading ? 'fade-in' : 'fade-out'}`}>
                        <Boei className="logo max-w-28 m-auto" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 ">
                    <h1 className="text-6xl font-alatsi text-center">Loading...</h1>

                </div>
            </div>
        </div>

    );
};

export default LoadingScreen;
