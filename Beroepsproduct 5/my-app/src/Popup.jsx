import React from 'react';

const Popup = ({ children, onClose }) => {
    return (
        <div className=" fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="popup max-w-lg bg-white w-10/12  p-5 rounded-lg relative">
                <button
                    className="absolute  top-2 right-2 text-black bg-gray-300 rounded-full px-2 text-5xl"
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