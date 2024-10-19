import React, { useState, useEffect } from 'react';

const Popup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const messages = [
        'OUT STORE - Up to 70% OFF',
        'FREE SHIPPING Over $299*'
    ];

    // Update the active message every 1 second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000); // Change every second

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, [messages.length]);

    // Handle pause on hover
    const handleMouseEnter = () => {
        clearInterval(window.slideInterval); // Pause the interval when hovered
    };

    const handleMouseLeave = () => {
        window.slideInterval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1000); // Resume the interval
    };

    return (
        <div
            className="bg-black text-white h-12 w-full flex justify-center items-center relative overflow-hidden"
            style={{ cursor: 'pointer' }} // Change the cursor on hover
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {messages.map((message, index) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                    key={index}
                    href="#"
                    className={`absolute transition-all  duration-500 ease-in-out ${activeIndex === index
                            ? 'translate-x-0 opacity-100'
                            : index % 2 === 0
                                ? '-translate-x-full opacity-0'
                                : 'translate-x-full opacity-0'
                        }`}
                    style={{ pointerEvents: activeIndex === index ? 'auto' : 'none' }} // Only allow clicking on the active message
                >
                    {message}
                </a>
            ))}
        </div>
    );
};

export default Popup;
