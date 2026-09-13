import { Search, Loader2 } from 'lucide-react';

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function Hero({ query, onQueryChange, onSearch, loading }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2 className="hero-heading">Search weather for any city</h2>
        <p className="hero-subtitle">
          Real-time conditions from WeatherAPI — temperature, wind, humidity, and mood analysis
        </p>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) onSearch();
            }}
            placeholder="Enter city name, e.g. London, Tokyo, New York..."
            className="search-input"
            aria-label="City search"
          />
          <button
            type="button"
            onClick={onSearch}
            disabled={loading || !query.trim()}
            className="search-button"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" />
                Searching
              </>
            ) : (
              <>
                <Search size={18} />
                Search
              </>
            )}
          </button>
        </div>
      </div>
      <div className="hero-glow" />
    </section>
  );
}
