export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  vis_km: number;
  uv: number;
}

export interface WeatherApiResponse {
  location: WeatherLocation;
  current: CurrentWeather;
}

export type WeatherMood =
  | 'Windy'
  | 'Uncomfortable'
  | 'Hot'
  | 'Cold'
  | 'Pleasant';

export interface MoodRule {
  mood: WeatherMood;
  threshold: string;
  icon: string;
}
