import React from 'react';

const CircularGauge = ({ value, max = 100, size = 200, color = "yellow-500", background = "yellow-400" }) => {
    const percentage = (value / max) * 100;
    const strokeWidth = size / 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Voeg aangepaste kleuren en standaard Tailwind-kleuren toe
    const classMap = {
        "yellow-500": "text-yellow-500",
        "yellow-400": "text-yellow-400",
        "red-500": "text-red-500",
        "green-500": "text-green-500",
        "blue-500": "text-blue-500",
        "lightblue": "text-lightblue",
        "green-custom": "text-green",      // aangepaste groene kleur
        "zwart": "text-zwart",
        "beige": "text-beige",
        "qk_red": "text-qk_red",
        "qk_red_bg": "text-qk_red_bg",
        "qk_purple": "text-qk_purple",
        "qk_purple_bg": "text-qk_purple_bg",
        "qk_blue": "text-qk_blue",
        "qk_blue_bg": "text-qk_blue_bg"
    };

    const colorClass = classMap[color] || "text-yellow-500";
    const BGcolorClass = classMap[background] || "text-yellow-400";
    const settingsText = `absolute text-3xl weight-bold font-alatsi ${colorClass}`
    console.log()

    return (
        <div className="relative flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={size}
                height={size}
            >
                <circle
                    className={BGcolorClass}
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={colorClass}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <span className={settingsText}   >{Math.round(value)}</span>
        </div>
    );
};

export default CircularGauge;