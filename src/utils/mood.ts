import type { WeatherMood } from '../types/weather';

export const MOOD_PRIORITY: WeatherMood[] = [
  'Windy',
  'Uncomfortable',
  'Hot',
  'Cold',
  'Pleasant',
];

export function calculateMood(
  tempC: number,
  humidity: number,
  windKph: number,
): WeatherMood {
  if (windKph >= 20) return 'Windy';
  if (humidity >= 80 || (humidity >= 70 && tempC >= 28)) return 'Uncomfortable';
  if (tempC >= 30) return 'Hot';
  if (tempC <= 15) return 'Cold';
  return 'Pleasant';
}

export const MOOD_THRESHOLDS = [
  { mood: 'Windy' as const, threshold: 'Wind speed >= 20 km/h', icon: 'wind' },
  {
    mood: 'Uncomfortable' as const,
    threshold: 'Humidity >= 80% OR (Humidity >= 70% AND Temp >= 28°C)',
    icon: 'thermometer',
  },
  { mood: 'Hot' as const, threshold: 'Temperature >= 30°C', icon: 'sun' },
  { mood: 'Cold' as const, threshold: 'Temperature <= 15°C', icon: 'snowflake' },
  {
    mood: 'Pleasant' as const,
    threshold: 'Otherwise — all conditions are mild',
    icon: 'smile',
  },
];

export const MOOD_COLORS: Record<WeatherMood, { bg: string; text: string; border: string }> = {
  Windy: { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb', border: 'rgba(59, 130, 246, 0.3)' },
  Uncomfortable: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706', border: 'rgba(245, 158, 11, 0.3)' },
  Hot: { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626', border: 'rgba(239, 68, 68, 0.3)' },
  Cold: { bg: 'rgba(14, 165, 233, 0.1)', text: '#0284c7', border: 'rgba(14, 165, 233, 0.3)' },
  Pleasant: { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a', border: 'rgba(34, 197, 94, 0.3)' },
};
