import React, { Component } from 'react';


class ARView extends Component {
    render() {
        return (
            <a-scene
                vr-mode-ui="enabled: false"
                embedded
                arjs='sourceType: webcam; debugUIEnabled: false; videoTexture: true;'
            >
                <a-text
                    value="Your location-based content"
                    look-at="[gps-camera]"
                    scale="5 5 5"
                    gps-entity-place="latitude: YOUR_LATITUDE; longitude: YOUR_LONGITUDE;"
                ></a-text>

                <a-camera gps-camera rotation-reader></a-camera>
            </a-scene>
        );
    }
}

export default ARView