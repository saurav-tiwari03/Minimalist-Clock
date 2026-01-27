import React, { useState } from 'react';
import '../styles/Settings.css';
import { FaGithub } from 'react-icons/fa';

const THEMES = [
    { id: 'dark', name: 'Dark', bg: '#000000', card: '#1a1a1a', text: '#d4d4d4' },
    { id: 'light', name: 'Light', bg: '#f0f0f0', card: '#ffffff', text: '#1a1a1a', isLight: true },
    { id: 'midnight', name: 'Midnight', bg: '#0a0a1a', card: '#1a1a2e', text: '#e0e0ff' },
    { id: 'forest', name: 'Forest', bg: '#0a1a0a', card: '#1a2e1a', text: '#c0e0c0' },
    { id: 'ocean', name: 'Ocean', bg: '#0a1a1a', card: '#1a2e2e', text: '#c0e0e0' },
    { id: 'warm', name: 'Warm', bg: '#1a1410', card: '#2e2420', text: '#e0d0c0' },
    { id: 'saffron', name: 'Saffron', bg: '#1a0f05', card: '#3d2010', text: '#ff9933' },
];

const MODES = [
    { id: 'clock', name: 'Clock', icon: '🕐' },
    { id: 'stopwatch', name: 'Stopwatch', icon: '⏱' },
    { id: 'timer', name: 'Timer', icon: '⏲' },
];

const Settings = ({ settings, onSettingsChange, isLight = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (key, value) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <div className="settings-container">
            {/* Settings Icon Button */}
            <button
                className={`settings-btn ${isLight ? 'light' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Settings"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`settings-icon ${isOpen ? 'rotate' : ''}`}
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            </button>

            {/* Settings Panel */}
            <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
                <div className="settings-header">
                    <h3>Settings</h3>
                </div>

                <div className="settings-content">
                    {/* Mode Selector */}
                    <div className="setting-item mode-setting">
                        <label>Mode</label>
                        <div className="mode-selector">
                            {MODES.map((mode) => (
                                <button
                                    key={mode.id}
                                    className={`mode-btn ${settings.mode === mode.id ? 'active' : ''}`}
                                    onClick={() => handleChange('mode', mode.id)}
                                    title={mode.name}
                                >
                                    <span className="mode-icon">{mode.icon}</span>
                                    <span className="mode-name">{mode.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Selector Dropdown */}
                    <div className="setting-item">
                        <label>Theme</label>
                        <div className="theme-dropdown-wrapper">
                            <select
                                className="theme-dropdown"
                                value={settings.theme}
                                onChange={(e) => handleChange('theme', e.target.value)}
                            >
                                {THEMES.map((theme) => (
                                    <option key={theme.id} value={theme.id} style={{ cursor: 'pointer' }}>
                                        {theme.name}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="theme-dropdown-preview"
                                style={{
                                    background: THEMES.find(t => t.id === settings.theme)?.bg,
                                    border: `2px solid ${THEMES.find(t => t.id === settings.theme)?.card}`
                                }}
                            />
                        </div>
                    </div>

                    {/* Time Format - only show for clock mode */}
                    {settings.mode === 'clock' && (
                        <div className="setting-item">
                            <label>Time Format</label>
                            <div className="toggle-group">
                                <button
                                    className={`toggle-btn ${!settings.use24Hour ? 'active' : ''}`}
                                    onClick={() => handleChange('use24Hour', false)}
                                >
                                    12H
                                </button>
                                <button
                                    className={`toggle-btn ${settings.use24Hour ? 'active' : ''}`}
                                    onClick={() => handleChange('use24Hour', true)}
                                >
                                    24H
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Show Seconds - only show for clock mode */}
                    {settings.mode === 'clock' && (
                        <div className="setting-item">
                            <label>Show Seconds</label>
                            <button
                                className={`switch ${settings.showSeconds ? 'on' : ''}`}
                                onClick={() => handleChange('showSeconds', !settings.showSeconds)}
                            >
                                <span className="switch-knob" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="settings-footer">
                    {(() => {
                        const currentTheme = THEMES.find(t => t.id === settings.theme);
                        const linkStyle = { color: currentTheme?.text || '#d4d4d4' };
                        return (
                            <>
                                <a href="https://github.com/saurav-tiwari03" target="_blank" style={linkStyle} className="settings-footer-link">
                                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', margin: '0 3px' }}>
                                        <FaGithub />
                                    </span>
                                </a>
                                <div className="settings-footer-divider"></div>
                                <a href="https://sauravdev.in?utm_source=minimalist-clock" target="_blank" style={linkStyle} className="settings-footer-link">
                                    Saurav Tiwari
                                </a>
                            </>
                        );
                    })()}
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && <div className="settings-backdrop" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export default Settings;
