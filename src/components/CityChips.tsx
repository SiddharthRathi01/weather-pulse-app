import { MapPin } from 'lucide-react';

interface CityChipsProps {
  cities: string[];
  onSelect: (city: string) => void;
  activeCity?: string;
  loading: boolean;
}

export function CityChips({ cities, onSelect, activeCity, loading }: CityChipsProps) {
  return (
    <div className="city-chips">
      <div className="city-chips-label">
        <MapPin size={14} />
        Popular cities
      </div>
      <div className="city-chips-list">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onSelect(city)}
            disabled={loading}
            className={`city-chip ${activeCity === city ? 'city-chip-active' : ''}`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
