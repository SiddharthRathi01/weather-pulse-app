import {
  Gauge,
  Eye,
  Sun,
  Compass,
  Navigation,
  Clock,
} from 'lucide-react';
import type { WeatherApiResponse } from '../types/weather';

interface WeatherDetailsProps {
  data: WeatherApiResponse;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { current, location } = data;

  const details = [
    { icon: Gauge, label: 'Pressure', value: `${current.pressure_mb} mb` },
    { icon: Eye, label: 'Visibility', value: `${current.vis_km} km` },
    { icon: Sun, label: 'UV Index', value: String(current.uv) },
    { icon: Compass, label: 'Wind Direction', value: current.wind_dir },
    { icon: Navigation, label: 'Coordinates', value: `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}` },
    { icon: Clock, label: 'Last Updated', value: current.last_updated },
  ];

  return (
    <div className="weather-details">
      <h4 className="details-title">Additional Details</h4>
      <div className="details-grid">
        {details.map((detail) => {
          const Icon = detail.icon;
          return (
            <div key={detail.label} className="detail-item">
              <Icon size={16} className="detail-icon" />
              <span className="detail-label">{detail.label}</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
