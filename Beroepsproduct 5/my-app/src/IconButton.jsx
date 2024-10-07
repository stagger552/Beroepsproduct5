import React from 'react';

function IconButton({ onClick, children }) {
    return (
        <div>
            <button className='w-full h-full min-w-11 min-h-11 max-h-14 max-w-14 bg-white rounded-lg border-spacing-0 
                hover:bg-green transition duration-300 ease-in-out transform hover:scale-105' 
                onClick={onClick}>
                {React.Children.map(children, child => (
                    React.cloneElement(child, { className: 'max-w-7 max-h-7 m-auto' })
                ))}
            </button>
        </div>
    )
}
export default IconButton