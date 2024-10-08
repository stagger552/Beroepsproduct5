import React from 'react';

const QuickAlert = ({ Message, Icon }) => {
    return (
        <div className=" fixed max-h-9 w-10/12 inset-0 bg-black bg-opacity-50 flex items-center justify-center fade-in z-50">
            <h1 className='text-3xl font-roboto'>
                {Message}
            </h1>
            <div>
                {Icon}
            </div>
        </div>
    );
};

export default QuickAlert;