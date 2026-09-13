import type { WeatherApiResponse } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export function isApiKeyConfigured(): boolean {
  return Boolean(API_KEY && API_KEY !== 'your_weatherapi_key_here');
}

export async function fetchWeather(city: string): Promise<WeatherApiResponse> {
  if (!isApiKeyConfigured()) {
    throw new Error(
      'WeatherAPI key not configured. Add VITE_WEATHER_API_KEY to your .env file. Get a free key at weatherapi.com.',
    );
  }

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 400) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error?.message || 'City not found. Try a different search.');
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid API key. Check your VITE_WEATHER_API_KEY environment variable.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit reached. Please try again in a moment.');
    }
    throw new Error(`WeatherAPI request failed (HTTP ${response.status}).`);
  }

  return response.json() as Promise<WeatherApiResponse>;
}
