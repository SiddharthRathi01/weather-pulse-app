import { useState, useCallback } from 'react';
import { Loader2, AlertCircle, CloudSun } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CityChips } from './components/CityChips';
import { WeatherCard } from './components/WeatherCard';
import { WeatherDetails } from './components/WeatherDetails';
import { MoodSection } from './components/MoodSection';
import { JsonPanel } from './components/JsonPanel';
import { ApiContract } from './components/ApiContract';
import { ProjectStructure } from './components/ProjectStructure';
import { fetchWeather, isApiKeyConfigured } from './services/weatherApi';
import { calculateMood } from './utils/mood';
import type { WeatherApiResponse, WeatherMood } from './types/weather';
import './App.css';

const POPULAR_CITIES = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Dubai',
  'Sydney',
  'Mumbai',
  'Singapore',
  'Berlin',
  'Los Angeles',
];

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [mood, setMood] = useState<WeatherMood | null>(null);
  const [activeCity, setActiveCity] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (city?: string) => {
    const searchCity = city ?? query.trim();
    if (!searchCity || loading) return;

    if (!city) setQuery(searchCity);
    setActiveCity(city ?? searchCity);
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await fetchWeather(searchCity);
      setWeatherData(data);
      setMood(calculateMood(data.current.temp_c, data.current.humidity, data.current.wind_kph));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather data.';
      setError(message);
      setWeatherData(null);
      setMood(null);
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  const apiKeyReady = isApiKeyConfigured();

  return (
    <>
      <Header />

      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={() => handleSearch()}
        loading={loading}
      />

      <CityChips
        cities={POPULAR_CITIES}
        onSelect={(city) => {
          setQuery(city);
          handleSearch(city);
        }}
        activeCity={activeCity}
        loading={loading}
      />

      <div className="dashboard">
        <div className="dashboard-left">
          {loading && (
            <div className="state-card">
              <div className="state-card-icon loading">
                <Loader2 size={28} className="spin" />
              </div>
              <h3>Fetching weather data...</h3>
              <p>Querying WeatherAPI for real-time conditions</p>
            </div>
          )}

          {!loading && error && (
            <div className="state-card">
              <div className="state-card-icon error">
                <AlertCircle size={28} />
              </div>
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && !weatherData && !hasSearched && (
            <div className="state-card">
              <div className="state-card-icon idle">
                <CloudSun size={28} />
              </div>
              <h3>Ready to search</h3>
              <p>
                {apiKeyReady
                  ? 'Enter a city name or pick a popular city above to see live weather conditions.'
                  : 'Add your WeatherAPI key to the .env file to get started.'}
              </p>
              {!apiKeyReady && (
                <span className="state-card-hint">
                  VITE_WEATHER_API_KEY=your_key
                </span>
              )}
            </div>
          )}

          {!loading && !error && weatherData && mood && (
            <>
              <WeatherCard data={weatherData} mood={mood} />
              <WeatherDetails data={weatherData} />
            </>
          )}

          <MoodSection activeMood={mood} />
        </div>

        <div className="dashboard-right">
          <JsonPanel data={weatherData} />
          <ApiContract />
        </div>
      </div>

      <ProjectStructure />

      <footer className="app-footer">
        Weather Pulse — Built with React + Vite + TypeScript. Powered by WeatherAPI.
      </footer>
    </>
  );
}

export default App;
