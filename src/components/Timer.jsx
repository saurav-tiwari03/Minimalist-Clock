import React, { useState, useRef, useCallback, useEffect } from 'react';
import FlipCard from './FlipCard';
import '../styles/Clock.css';
import '../styles/ModeControls.css';
import alarmSound from '../assets/alarm-sound.mp3';

const Timer = ({ isLight = false }) => {
    const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes default
    const [remainingTime, setRemainingTime] = useState(300);
    const [isRunning, setIsRunning] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customTime, setCustomTime] = useState({ hours: '00', minutes: '05', seconds: '00' });
    const intervalRef = useRef(null);
    const audioRef = useRef(null);
    const inputRefs = useRef({ hours: null, minutes: null, seconds: null });

    // Initialize audio on mount
    useEffect(() => {
        audioRef.current = new Audio(alarmSound);
        audioRef.current.loop = true; // Loop continuously
        
        // Handle when audio ends (in case loop doesn't work)
        const handleEnded = () => {
            if (audioRef.current && isAlarmPlaying) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            }
        };
        
        audioRef.current.addEventListener('ended', handleEnded);
        
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isAlarmPlaying]);

    // Play sound when timer ends
    useEffect(() => {
        if (remainingTime === 0 && !isEditing && !isAlarmPlaying) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
            try {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play()
                        .then(() => setIsAlarmPlaying(true))
                        .catch(e => console.log('Audio playback failed:', e));
                }
            } catch (e) {
                console.log('Audio not supported:', e);
            }
        }
    }, [remainingTime, isEditing, isAlarmPlaying]);

    const start = useCallback(() => {
        if (!isRunning && remainingTime > 0) {
            setIsEditing(false);
            setIsRunning(true);
            const endTime = Date.now() + remainingTime * 1000;
            intervalRef.current = setInterval(() => {
                const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
                setRemainingTime(remaining);
                if (remaining === 0) {
                    clearInterval(intervalRef.current);
                }
            }, 100);
        }
    }, [isRunning, remainingTime]);

    const pause = useCallback(() => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);

    const stopAlarm = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsAlarmPlaying(false);
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setRemainingTime(totalSeconds);
        setIsEditing(true);
        // Stop alarm sound if playing
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsAlarmPlaying(false);
    }, [totalSeconds]);

    const openCustomInput = useCallback(() => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setCustomTime({
            hours: h.toString().padStart(2, '0'),
            minutes: m.toString().padStart(2, '0'),
            seconds: s.toString().padStart(2, '0')
        });
        setShowCustomInput(true);
        setTimeout(() => inputRefs.current.hours?.focus(), 100);
    }, [totalSeconds]);

    const handleCustomTimeChange = (field, value) => {
        const numValue = value.replace(/\D/g, '').slice(0, 2);
        setCustomTime(prev => ({ ...prev, [field]: numValue }));
    };

    const handleInputBlur = (field) => {
        setCustomTime(prev => ({
            ...prev,
            [field]: prev[field].padStart(2, '0')
        }));
    };

    const handleInputKeyDown = (e, field) => {
        if (e.key === 'Enter') {
            applyCustomTime();
        } else if (e.key === 'Escape') {
            setShowCustomInput(false);
        } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (field === 'hours') inputRefs.current.minutes?.focus();
            else if (field === 'minutes') inputRefs.current.seconds?.focus();
            else if (field === 'seconds') inputRefs.current.hours?.focus();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (field === 'hours') inputRefs.current.seconds?.focus();
            else if (field === 'minutes') inputRefs.current.hours?.focus();
            else if (field === 'seconds') inputRefs.current.minutes?.focus();
        }
    };

    const applyCustomTime = () => {
        const h = parseInt(customTime.hours) || 0;
        const m = parseInt(customTime.minutes) || 0;
        const s = parseInt(customTime.seconds) || 0;
        const newTotal = Math.min(359999, h * 3600 + m * 60 + s);
        setTotalSeconds(newTotal);
        setRemainingTime(newTotal);
        setShowCustomInput(false);
    };

    // Format time for display
    const displayTime = isEditing ? totalSeconds : remainingTime;
    const hours = Math.floor(displayTime / 3600);
    const minutes = Math.floor((displayTime % 3600) / 60);
    const seconds = displayTime % 60;

    const h1 = Math.floor(hours / 10).toString();
    const h2 = (hours % 10).toString();
    const m1 = Math.floor(minutes / 10).toString();
    const m2 = (minutes % 10).toString();
    const s1 = Math.floor(seconds / 10).toString();
    const s2 = (seconds % 10).toString();

    return (
        <div className="mode-container">
            {/* Main Display */}
            <div className="clock-wrapper">
                <div className="clock-main">
                    {/* Hours - only show if > 0 or editing */}
                    {(hours > 0 || isEditing) && (
                        <>
                            <div className="digit-group">
                                <FlipCard digit={h1} />
                                <FlipCard digit={h2} />
                            </div>
                            <div className={`colon ${isLight ? 'light' : ''}`}>:</div>
                        </>
                    )}

                    {/* Minutes */}
                    <div className="digit-group">
                        <FlipCard digit={m1} />
                        <FlipCard digit={m2} />
                    </div>

                    {/* Colon */}
                    <div className={`colon ${isLight ? 'light' : ''} ${remainingTime === 0 && !isEditing ? 'blink' : ''}`}>:</div>

                    {/* Seconds */}
                    <div className="digit-group">
                        <FlipCard digit={s1} />
                        <FlipCard digit={s2} />
                    </div>
                </div>
            </div>

            {/* Status indicator */}
            {remainingTime === 0 && !isEditing && (
                <div className="timer-status">TIME'S UP!</div>
            )}

            {/* Controls */}
            <div className="mode-controls">
                {/* STOP ALARM button - only show when alarm is playing */}
                {isAlarmPlaying && (
                    <button 
                        onClick={stopAlarm}
                        className={`mode-btn-control danger ${isLight ? 'light' : ''}`}
                        style={{ animation: 'pulse 0.5s infinite' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                        STOP ALARM
                    </button>
                )}

                {isEditing && (
                    <button 
                        onClick={openCustomInput}
                        className={`mode-btn-control ${isLight ? 'light' : ''}`}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        SET TIME
                    </button>
                )}

                {!isAlarmPlaying && (
                    <>
                        {!isRunning ? (
                            <button 
                                onClick={start} 
                                className={`mode-btn-control primary ${isLight ? 'light' : ''}`}
                                disabled={remainingTime === 0}
                            >
                                {isEditing ? 'START' : 'RESUME'}
                            </button>
                        ) : (
                            <button 
                                onClick={pause} 
                                className={`mode-btn-control warning ${isLight ? 'light' : ''}`}
                            >
                                PAUSE
                            </button>
                        )}
                    </>
                )}
                
                <button 
                    onClick={reset} 
                    className={`mode-btn-control ${isLight ? 'light' : ''}`}
                >
                    RESET
                </button>
            </div>

            {/* Custom Time Input Modal */}
            <div className={`timer-modal-overlay ${showCustomInput ? 'open' : ''}`}>
                <div className={`timer-modal ${isLight ? 'light' : ''}`}>
                    <div className="timer-modal-header">
                        <h3>Set Timer</h3>
                    </div>

                    <div className="timer-inputs">
                        <div className="timer-input-group">
                            <input
                                ref={el => inputRefs.current.hours = el}
                                type="text"
                                value={customTime.hours}
                                onChange={e => handleCustomTimeChange('hours', e.target.value)}
                                onBlur={() => handleInputBlur('hours')}
                                onKeyDown={e => handleInputKeyDown(e, 'hours')}
                                onFocus={e => e.target.select()}
                                className="timer-input"
                                maxLength={2}
                            />
                            <div className="timer-input-label">Hours</div>
                        </div>
                        
                        <span className="timer-input-separator">:</span>
                        
                        <div className="timer-input-group">
                            <input
                                ref={el => inputRefs.current.minutes = el}
                                type="text"
                                value={customTime.minutes}
                                onChange={e => handleCustomTimeChange('minutes', e.target.value)}
                                onBlur={() => handleInputBlur('minutes')}
                                onKeyDown={e => handleInputKeyDown(e, 'minutes')}
                                onFocus={e => e.target.select()}
                                className="timer-input"
                                maxLength={2}
                            />
                            <div className="timer-input-label">Minutes</div>
                        </div>
                        
                        <span className="timer-input-separator">:</span>
                        
                        <div className="timer-input-group">
                            <input
                                ref={el => inputRefs.current.seconds = el}
                                type="text"
                                value={customTime.seconds}
                                onChange={e => handleCustomTimeChange('seconds', e.target.value)}
                                onBlur={() => handleInputBlur('seconds')}
                                onKeyDown={e => handleInputKeyDown(e, 'seconds')}
                                onFocus={e => e.target.select()}
                                className="timer-input"
                                maxLength={2}
                            />
                            <div className="timer-input-label">Seconds</div>
                        </div>
                    </div>

                    <div className="timer-modal-actions">
                        <button
                            onClick={() => setShowCustomInput(false)}
                            className={`mode-btn-control ${isLight ? 'light' : ''}`}
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={applyCustomTime}
                            className={`mode-btn-control info ${isLight ? 'light' : ''}`}
                        >
                            APPLY
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default Timer;
