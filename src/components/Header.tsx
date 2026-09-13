import { CloudSun, ExternalLink, BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          <CloudSun size={28} strokeWidth={2} />
        </div>
        <div className="header-titles">
          <h1 className="header-name">Weather Pulse</h1>
          <p className="header-tagline">Responsive • WeatherAPI • Vercel Ready</p>
        </div>
      </div>
      <nav className="header-nav">
        <a
          href="https://api.weatherapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          <ExternalLink size={15} />
          api.weatherapi.com
        </a>
        <a
          href="https://www.weatherapi.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          <BookOpen size={15} />
          Docs
        </a>
      </nav>
    </header>
  );
}
