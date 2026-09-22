import { useState, useEffect } from 'react';
import { getTimeBasedGreeting } from '../utils/greeting';
import { formatDate, formatTime } from '../utils/formatTime';

export function useTime() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const greetingData = getTimeBasedGreeting(currentTime);

  return {
    currentTime,
    timeString: formatTime(currentTime),
    dateString: formatDate(currentTime),
    greeting: greetingData.greeting,
    greetingEmoji: greetingData.emoji,
    period: greetingData.period,
  };
}
