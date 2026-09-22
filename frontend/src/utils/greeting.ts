/**
 * Time-based and Session Assistant Greetings
 */
export function getTimeBasedGreeting(date: Date = new Date()): {
  greeting: string;
  emoji: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
} {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // 05:00 is 300 minutes, 11:59 is 719 minutes
  if (totalMinutes >= 300 && totalMinutes < 720) {
    return { greeting: 'Good Morning', emoji: '☀️', period: 'morning' };
  }
  // 12:00 is 720 minutes, 16:59 is 1019 minutes
  if (totalMinutes >= 720 && totalMinutes < 1020) {
    return { greeting: 'Good Afternoon', emoji: '🌤️', period: 'afternoon' };
  }
  // 17:00 is 1020 minutes, 20:59 is 1259 minutes
  if (totalMinutes >= 1020 && totalMinutes < 1260) {
    return { greeting: 'Good Evening', emoji: '🌆', period: 'evening' };
  }
  // 21:00 to 04:59
  return { greeting: 'Good Night', emoji: '🌙', period: 'night' };
}

/**
 * Assistant Automatic Onboarding Greeting configured by language:
 * Supports English, Hindi, and Hinglish.
 */
export function getAssistantGreeting(language: 'English' | 'Hindi' | 'Hinglish' = 'English'): string {
  switch (language) {
    case 'Hindi':
      return 'नमस्ते सर, मैं आपकी क्या सहायता कर सकता हूँ?';
    case 'Hinglish':
      return 'Hello Sir, main aapki kya help kar sakta hoon?';
    case 'English':
    default:
      return 'Hello Sir, how can I help you?';
  }
}

const SESSION_GREETING_KEY = 'nova_session_greeting_delivered';

export function hasSessionGreetingBeenDelivered(): boolean {
  try {
    return sessionStorage.getItem(SESSION_GREETING_KEY) === 'true';
  } catch {
    return false;
  }
}

export function markSessionGreetingDelivered(): void {
  try {
    sessionStorage.setItem(SESSION_GREETING_KEY, 'true');
  } catch {
    // sessionStorage not available or private mode
  }
}

export function resetSessionGreeting(): void {
  try {
    sessionStorage.removeItem(SESSION_GREETING_KEY);
  } catch {
    // ignore
  }
}
