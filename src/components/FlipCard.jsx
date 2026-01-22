import React, { useState, useEffect, useRef } from 'react';
import '../styles/FlipCard.css';

const FlipCard = ({ digit, className = '', animationDuration = 600 }) => {
    const [prevDigit, setPrevDigit] = useState(digit);
    const [isAnimating, setIsAnimating] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        if (digit !== prevDigit) {
            setIsAnimating(true);
            // After animation completes, update prevDigit and stop animating
            const timer = setTimeout(() => {
                setPrevDigit(digit);
                setIsAnimating(false);
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, [digit, prevDigit, animationDuration]);

    return (
        <div className={`flip-card ${className} ${isAnimating ? 'animating' : ''}`} ref={nodeRef}>
            {/* Top Half static */}
            <div className="top">
                <span className="top-text">{digit}</span>
            </div>

            {/* Bottom Half static */}
            <div className="bottom">
                <span className="bottom-text">{prevDigit}</span>
            </div>

            {/* Flapping Top Layer */}
            <div className="top-flip">
                <span className="top-flip-text">{prevDigit}</span>
            </div>

            {/* Flapping Bottom Layer */}
            <div className="bottom-flip">
                <span className="bottom-flip-text">{digit}</span>
            </div>
        </div>
    );
};

export default FlipCard;
