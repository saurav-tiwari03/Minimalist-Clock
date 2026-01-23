import React, { useState, useEffect, useCallback } from 'react';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import Settings from './components/Settings';
import SnowEffect from './components/SnowEffect';
import './App.css';

const THEMES = {
  dark: { bg: '#000000', card: '#1a1a1a', text: '#d4d4d4', isLight: false },
  light: { bg: '#f0f0f0', card: '#ffffff', text: '#1a1a1a', isLight: true },
  midnight: { bg: '#0a0a1a', card: '#1a1a2e', text: '#e0e0ff', isLight: false },
  forest: { bg: '#0a1a0a', card: '#1a2e1a', text: '#c0e0c0', isLight: false },
  ocean: { bg: '#0a1a1a', card: '#1a2e2e', text: '#c0e0e0', isLight: false },
  warm: { bg: '#1a1410', card: '#2e2420', text: '#e0d0c0', isLight: false },
  saffron: { bg: '#1a0f05', card: '#3d2010', text: '#ff9933', isLight: false },
};

const MODES = ['clock', 'stopwatch', 'timer'];
const MODE_LABELS = {
  clock: 'Clock',
  stopwatch: 'Stopwatch',
  timer: 'Timer'
};

const DEFAULT_SETTINGS = {
  mode: 'clock',
  use24Hour: false,
  showSeconds: true,
  animationSpeed: 600,
  animationDelay: 300,
  theme: 'dark',
  snowEnabled: false
};

// Load settings from localStorage
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('fliqlo-settings');
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
};

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settings, setSettings] = useState(loadSettings);

  const currentTheme = THEMES[settings.theme] || THEMES.dark;

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('fliqlo-settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  const toggleSnow = useCallback(() => {
    setSettings(prev => ({ ...prev, snowEnabled: !prev.snowEnabled }));
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e) => {
      // Toggle fullscreen on 'F' key press (ignore if typing in an input)
      if (e.key === 'f' || e.key === 'F') {
        const tagName = e.target.tagName.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea') {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Apply animation and theme settings as CSS custom properties
  useEffect(() => {
    document.documentElement.style.setProperty('--flip-duration', `${settings.animationSpeed}ms`);
    document.documentElement.style.setProperty('--flip-delay', `${settings.animationDelay}ms`);
    document.documentElement.style.setProperty('--card-bg', currentTheme.card);
    document.documentElement.style.setProperty('--card-text', currentTheme.text);
    document.documentElement.style.setProperty(
      '--card-shadow', 
      currentTheme.isLight 
        ? '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
        : '0 10px 30px rgba(0, 0, 0, 0.8)'
    );
  }, [settings.animationSpeed, settings.animationDelay, currentTheme]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Mode navigation
  const currentModeIndex = MODES.indexOf(settings.mode);
  const prevModeIndex = (currentModeIndex - 1 + MODES.length) % MODES.length;
  const nextModeIndex = (currentModeIndex + 1) % MODES.length;
  const prevMode = MODES[prevModeIndex];
  const nextMode = MODES[nextModeIndex];

  const goToPrevMode = useCallback(() => {
    setSettings(prev => ({ ...prev, mode: prevMode }));
  }, [prevMode]);

  const goToNextMode = useCallback(() => {
    setSettings(prev => ({ ...prev, mode: nextMode }));
  }, [nextMode]);

  const themeClass = currentTheme.isLight ? 'light' : 'dark';

  return (
    <div 
      className="app-container" 
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Snow Effect */}
      {settings.snowEnabled && <SnowEffect isLight={currentTheme.isLight} />}

      {/* Left side buttons - hidden in fullscreen */}
      {!isFullscreen && (
        <div className="app-controls">
          <button
            onClick={toggleFullscreen}
            className={`app-control-btn ${themeClass}`}
          >
            <span className="fullscreen-text">FULLSCREEN</span>
            <span className="fullscreen-icon">⛶</span>
          </button>

          {/* Let it snow button */}
          <button
            onClick={toggleSnow}
            className={`app-control-btn ${themeClass} ${settings.snowEnabled ? 'snow-active' : ''}`}
          >
            <span className="snow-icon">❄</span>
            <span>Let it snow</span>
          </button>
        </div>
      )}

      {/* Settings - hidden in fullscreen */}
      {!isFullscreen && (
        <Settings settings={settings} onSettingsChange={setSettings} isLight={currentTheme.isLight} />
      )}

      {/* Mode navigation arrows - hidden in fullscreen */}
      {!isFullscreen && (
        <>
          <button
            onClick={goToPrevMode}
            className={`mode-arrow mode-arrow-left ${themeClass}`}
            aria-label={`Switch to ${MODE_LABELS[prevMode]}`}
            title={MODE_LABELS[prevMode]}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="mode-arrow-tooltip">{MODE_LABELS[prevMode]}</span>
          </button>
          
          <button
            onClick={goToNextMode}
            className={`mode-arrow mode-arrow-right ${themeClass}`}
            aria-label={`Switch to ${MODE_LABELS[nextMode]}`}
            title={MODE_LABELS[nextMode]}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="mode-arrow-tooltip">{MODE_LABELS[nextMode]}</span>
          </button>
        </>
      )}
      
      {/* Render based on mode */}
      {settings.mode === 'clock' && <Clock settings={settings} />}
      {settings.mode === 'stopwatch' && <Stopwatch isLight={currentTheme.isLight} />}
      {settings.mode === 'timer' && <Timer isLight={currentTheme.isLight} />}
    </div>
  );
}

export default App;
