import { Wind, Thermometer, Sun, Snowflake, Smile } from 'lucide-react';
import type { WeatherMood } from '../types/weather';
import { MOOD_THRESHOLDS } from '../utils/mood';

const ICON_MAP: Record<string, typeof Wind> = {
  wind: Wind,
  thermometer: Thermometer,
  sun: Sun,
  snowflake: Snowflake,
  smile: Smile,
};

interface MoodSectionProps {
  activeMood: WeatherMood | null;
}

export function MoodSection({ activeMood }: MoodSectionProps) {
  return (
    <div className="mood-section">
      <h4 className="mood-title">Weather Mood Rules</h4>
      <p className="mood-subtitle">
        Priority: Windy → Uncomfortable → Hot → Cold → Pleasant
      </p>
      <div className="mood-list">
        {MOOD_THRESHOLDS.map((rule) => {
          const Icon = ICON_MAP[rule.icon];
          const isActive = activeMood === rule.mood;
          return (
            <div
              key={rule.mood}
              className={`mood-row ${isActive ? 'mood-row-active' : ''}`}
            >
              <div className="mood-row-left">
                <Icon size={18} className="mood-row-icon" />
                <span className="mood-row-name">{rule.mood}</span>
                {isActive && <span className="mood-active-tag">Current</span>}
              </div>
              <span className="mood-row-threshold">{rule.threshold}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
