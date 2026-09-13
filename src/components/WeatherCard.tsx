import {
  Thermometer,
  Droplets,
  Wind,
  MapPin,
  CloudSun,
  Smile,
} from 'lucide-react';
import type { WeatherApiResponse, WeatherMood } from '../types/weather';
import { MOOD_COLORS } from '../utils/mood';

interface WeatherCardProps {
  data: WeatherApiResponse;
  mood: WeatherMood;
}

function getConditionIcon(code: number): string {
  const iconUrl = `https://cdn.weatherapi.com/weather/64x64/day/${code}.png`;
  return iconUrl;
}

export function WeatherCard({ data, mood }: WeatherCardProps) {
  const { location, current } = data;
  const moodColor = MOOD_COLORS[mood];

  return (
    <div className="weather-card">
      <div className="weather-card-top">
        <div className="weather-location-info">
          <div className="weather-icon-wrap">
            <img
              src={getConditionIcon(current.condition.code)}
              alt={current.condition.text}
              className="weather-condition-icon"
              width={56}
              height={56}
            />
          </div>
          <div>
            <h3 className="weather-city">{location.name}</h3>
            <p className="weather-region">
              {location.region}, {location.country}
            </p>
            <p className="weather-condition-text">{current.condition.text}</p>
          </div>
        </div>
        <div className="weather-temp-block">
          <div className="weather-temp-row">
            <Thermometer size={32} className="weather-temp-icon" />
            <span className="weather-temp-value">{Math.round(current.temp_c)}</span>
            <span className="weather-temp-unit">°C</span>
          </div>
          <p className="weather-feelslike">
            Feels like {Math.round(current.feelslike_c)}°C
          </p>
        </div>
      </div>

      <div className="weather-mood-badge" style={{ background: moodColor.bg, color: moodColor.text, borderColor: moodColor.border }}>
        <Smile size={16} />
        Weather Mood: <strong>{mood}</strong>
      </div>

      <div className="weather-stats-grid">
        <div className="weather-stat-card">
          <div className="weather-stat-icon droplet">
            <Droplets size={20} />
          </div>
          <div className="weather-stat-content">
            <span className="weather-stat-label">Humidity</span>
            <span className="weather-stat-value">{current.humidity}%</span>
          </div>
        </div>
        <div className="weather-stat-card">
          <div className="weather-stat-icon wind">
            <Wind size={20} />
          </div>
          <div className="weather-stat-content">
            <span className="weather-stat-label">Wind Speed</span>
            <span className="weather-stat-value">{current.wind_kph} km/h</span>
          </div>
        </div>
        <div className="weather-stat-card">
          <div className="weather-stat-icon location">
            <MapPin size={20} />
          </div>
          <div className="weather-stat-content">
            <span className="weather-stat-label">Coordinates</span>
            <span className="weather-stat-value">
              {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="weather-stat-card">
          <div className="weather-stat-icon condition">
            <CloudSun size={20} />
          </div>
          <div className="weather-stat-content">
            <span className="weather-stat-label">Condition</span>
            <span className="weather-stat-value">{current.condition.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
