import React, { useEffect, useRef } from 'react';

const SnowEffect = ({ isLight = false }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const snowflakesRef = useRef([]);
    const isLightRef = useRef(isLight);

    // Update the ref when isLight changes
    useEffect(() => {
        isLightRef.current = isLight;
    }, [isLight]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize snowflakes
        const snowflakeCount = 150;
        snowflakesRef.current = [];
        
        for (let i = 0; i < snowflakeCount; i++) {
            snowflakesRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speed: Math.random() * 1 + 0.5,
                wind: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.3
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Use dark flakes for light mode, white for dark mode
            const flakeColor = isLightRef.current ? '80, 80, 80' : '255, 255, 255';
            
            snowflakesRef.current.forEach(flake => {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${flakeColor}, ${flake.opacity})`;
                ctx.fill();
                
                // Update position
                flake.y += flake.speed;
                flake.x += flake.wind + Math.sin(flake.y * 0.01) * 0.5;
                
                // Reset if out of bounds
                if (flake.y > canvas.height) {
                    flake.y = -10;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width) {
                    flake.x = 0;
                }
                if (flake.x < 0) {
                    flake.x = canvas.width;
                }
            });
            
            animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 999
            }}
        />
    );
};

export default SnowEffect;
