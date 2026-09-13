import { Layers, GitBranch, Boxes, ShieldCheck } from 'lucide-react';

export function ProjectStructure() {
  return (
    <div className="project-structure">
      <h4 className="ps-title">Project Structure</h4>
      <div className="ps-grid">
        <div className="ps-card">
          <Layers size={18} className="ps-icon" />
          <span className="ps-label">Framework</span>
          <span className="ps-value">React + Vite + TypeScript</span>
        </div>
        <div className="ps-card">
          <GitBranch size={18} className="ps-icon" />
          <span className="ps-label">Flow</span>
          <span className="ps-value">
            Search/chip → fetchWeather → WeatherAPI → loading/error → weather card + mood + JSON
          </span>
        </div>
        <div className="ps-card">
          <Boxes size={18} className="ps-icon" />
          <span className="ps-label">Components</span>
          <span className="ps-value">
            Header, Hero, SearchBar, CityChips, WeatherCard, MoodSection, JsonPanel
          </span>
        </div>
        <div className="ps-card">
          <ShieldCheck size={18} className="ps-icon" />
          <span className="ps-label">Security</span>
          <span className="ps-value">
            API key handled through environment configuration
          </span>
        </div>
      </div>
    </div>
  );
}
