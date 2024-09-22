import React from 'react';

const Popup = ({ children, onClose }) => {
    return (
        <div className="fixed w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg relative">
                <button
                    className="absolute top-2 right-2 text-black bg-gray-300 rounded-full px-2"
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;