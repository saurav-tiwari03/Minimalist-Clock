import React from 'react';
import { useTime } from '../hooks/useTime';
import FlipCard from './FlipCard';
import '../styles/Clock.css';

const Clock = ({ settings = {} }) => {
    const { use24Hour = false, showSeconds = true, animationSpeed = 600, animationDelay = 300 } = settings;
    const { hoursStr, minutesStr, secondsStr, ampm } = useTime(use24Hour);

    // Handle single digit hours by padding with null or empty if length is 1
    const h1 = hoursStr.length === 2 ? hoursStr[0] : null;
    const h2 = hoursStr.length === 2 ? hoursStr[1] : hoursStr[0];

    const m1 = minutesStr[0];
    const m2 = minutesStr[1];

    const s1 = secondsStr[0];
    const s2 = secondsStr[1];

    const totalAnimTime = animationSpeed + animationDelay;

    return (
        <>
            <div className="clock-wrapper">
                <div className="clock-main">
                    <div className="digit-group hours-group">
                        {/* AM/PM Indicator - only show in 12-hour mode */}
                        {!use24Hour && (
                            <div className="ampm-indicator">
                                {ampm}
                            </div>
                        )}

                        {h1 ? <FlipCard digit={h1} animationDuration={totalAnimTime} /> : <div className="flip-card-placeholder" />}
                        <FlipCard digit={h2} animationDuration={totalAnimTime} />
                    </div>

                    <div className="digit-group minutes-group">
                        <FlipCard digit={m1} animationDuration={totalAnimTime} />
                        <FlipCard digit={m2} animationDuration={totalAnimTime} />
                    </div>
                </div>
            </div>

            {/* Seconds fixed at bottom right of screen */}
            {showSeconds && (
                <div className="seconds-group">
                    <FlipCard digit={s1} className="small-card" animationDuration={totalAnimTime} />
                    <FlipCard digit={s2} className="small-card" animationDuration={totalAnimTime} />
                </div>
            )}
        </>
    );
};

export default Clock;
