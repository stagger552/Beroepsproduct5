import React, { useEffect } from 'react';


function Arjs() {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://aframe.io/releases/1.3.0/aframe.min.js';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js';
        document.head.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
        document.head.appendChild(script3);

        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
            document.head.removeChild(script3);
        };
    }, []);

    return (
        <a-scene
            vr-mode-ui='enabled: false'
            arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
            renderer='antialias: true; alpha: true'
        >
            <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
            <a-entity
                material='color: red'
                geometry='primitive: box'
                gps-new-entity-place="latitude: 51.5974; longitude: 5.0384"
                scale="10 10 10"
            ></a-entity>
        </a-scene>
    )

}

export default Arjs