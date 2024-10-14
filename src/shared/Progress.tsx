import React from 'react';

interface CircularProgressBarProps {
    progress: number;
    color?: string;
}
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, color }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <svg
                className="transform -rotate-90"
                width={64}
                height={64}
            >
                <circle
                    className="text-[#CDCDCD]"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
                <circle
                    className={color || "text-[#1B8914]"}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
            </svg>
            <span className={`absolute text-base font-semibold ${color || "text-[#1B8914]"}`}>
                {progress}%
            </span>
        </div>
    );
};

export default CircularProgressBar;
