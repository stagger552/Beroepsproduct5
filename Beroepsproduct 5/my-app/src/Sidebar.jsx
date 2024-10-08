import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* Button to toggle the sidebar */}
      <button
        className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-10"
        onClick={toggleSidebar}
      >
        {isOpen ? '' : 'Open'} 
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform transform ${
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
          <label className="block mb-2">Dark Mode</label>
          <input type="checkbox" />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Notifications</label>
          <input type="checkbox" />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Language</label>
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
          className="fixed "
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
