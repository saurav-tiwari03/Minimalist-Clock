import React, { useState, useRef, useCallback } from 'react';
import FlipCard from './FlipCard';
import '../styles/Clock.css';
import '../styles/ModeControls.css';

const Stopwatch = ({ isLight = false }) => {
    const [time, setTime] = useState(0); // time in milliseconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            const startTime = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
    }, [isRunning, time]);

    const stop = useCallback(() => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setTime(0);
    }, []);

    // Format time
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((time % 1000) / 10);

    const m1 = Math.floor(minutes / 10).toString();
    const m2 = (minutes % 10).toString();
    const s1 = Math.floor(seconds / 10).toString();
    const s2 = (seconds % 10).toString();
    const cs1 = Math.floor(centiseconds / 10).toString();
    const cs2 = (centiseconds % 10).toString();

    return (
        <div className="mode-container">
            {/* Main Display */}
            <div className="stopwatch-wrapper">
                <div className="stopwatch-display">
                    {/* Minutes */}
                    <div className="digit-group">
                        <FlipCard digit={m1} />
                        <FlipCard digit={m2} />
                    </div>

                    {/* Colon */}
                    <div className={`colon ${isLight ? 'light' : ''}`}>:</div>

                    {/* Seconds */}
                    <div className="digit-group">
                        <FlipCard digit={s1} />
                        <FlipCard digit={s2} />
                    </div>
                </div>

                {/* Centiseconds - positioned below and right */}
                <div className={`stopwatch-centiseconds ${isLight ? 'light' : ''}`}>
                    <span className="centiseconds-value">.{cs1}{cs2}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="mode-controls">
                {!isRunning ? (
                    <button 
                        onClick={start} 
                        className={`mode-btn-control primary ${isLight ? 'light' : ''}`}
                    >
                        {time > 0 ? 'RESUME' : 'START'}
                    </button>
                ) : (
                    <button 
                        onClick={stop} 
                        className={`mode-btn-control danger ${isLight ? 'light' : ''}`}
                    >
                        STOP
                    </button>
                )}
                <button 
                    onClick={reset} 
                    className={`mode-btn-control ${isLight ? 'light' : ''}`}
                >
                    RESET
                </button>
            </div>
        </div>
    );
};

export default Stopwatch;
