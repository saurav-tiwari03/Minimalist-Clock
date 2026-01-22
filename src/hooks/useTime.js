import { useState, useEffect } from 'react';

export const useTime = (use24Hour = false) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let animationFrameId;

    const updateTime = () => {
      const now = new Date();
      setTime(prevTime => {
        if (prevTime.getSeconds() !== now.getSeconds()) {
          return now;
        }
        return prevTime;
      });
      animationFrameId = requestAnimationFrame(updateTime);
    };

    updateTime();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const hours24 = time.getHours();
  const minutes = time.getMinutes();

  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12; // Convert 0 to 12

  // Use 24-hour or 12-hour format based on setting
  const hoursStr = use24Hour 
    ? hours24.toString().padStart(2, '0') 
    : hours12.toString();
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = time.getSeconds().toString().padStart(2, '0');

  return {
    hoursStr,
    minutesStr,
    secondsStr,
    ampm
  };
};
