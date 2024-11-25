import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div>
            {/* Button to toggle the sidebar */}
         

            {/* Sidebar */}
            <div
                className={`fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-white p-4 transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <h2 className="text-xl mb-4">Settings</h2>
                <button
                    className="absolute top-4 right-4 text-xl"
                    onClick={toggleSidebar}
                >
                    &times;
                </button>
                
                {/* Settings Options */}
                <div>
                    <label className="block mb-2 text-zwart dark:text-white">Dark Mode</label>
                    <input type="checkbox" />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-zwart dark:text-white">Notifications</label>
                    <input type="checkbox" />
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-zwart dark:text-white">Language</label>
                    <select className="p-1 text-gray-800">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>Dutch</option>
                    </select>
                </div>
            </div>

            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
