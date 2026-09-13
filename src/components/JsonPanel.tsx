import { useState, useMemo } from 'react';
import { Copy, Check, Braces, FileText } from 'lucide-react';
import type { WeatherApiResponse } from '../types/weather';

interface JsonPanelProps {
  data: WeatherApiResponse | null;
}

type Tab = 'formatted' | 'raw';

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+\.?\d*([eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
}

export function JsonPanel({ data }: JsonPanelProps) {
  const [tab, setTab] = useState<Tab>('formatted');
  const [copied, setCopied] = useState(false);

  const formattedJson = useMemo(() => {
    if (!data) return '';
    return JSON.stringify(data, null, 2);
  }, [data]);

  const rawJson = useMemo(() => {
    if (!data) return '';
    return JSON.stringify(data);
  }, [data]);

  const displayJson = tab === 'formatted' ? formattedJson : rawJson;
  const highlighted = useMemo(
    () => (tab === 'formatted' ? syntaxHighlight(displayJson) : ''),
    [displayJson, tab],
  );

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(displayJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="json-panel">
      <div className="json-header">
        <div className="json-tabs">
          <button
            type="button"
            className={`json-tab ${tab === 'formatted' ? 'json-tab-active' : ''}`}
            onClick={() => setTab('formatted')}
          >
            <Braces size={14} />
            Formatted
          </button>
          <button
            type="button"
            className={`json-tab ${tab === 'raw' ? 'json-tab-active' : ''}`}
            onClick={() => setTab('raw')}
          >
            <FileText size={14} />
            Raw
          </button>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!data}
          className="json-copy-btn"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy JSON'}
        </button>
      </div>
      <div className="json-body">
        {data ? (
          tab === 'formatted' ? (
            <pre className="json-pre" dangerouslySetInnerHTML={{ __html: highlighted }} />
          ) : (
            <pre className="json-pre json-pre-raw">{displayJson}</pre>
          )
        ) : (
          <div className="json-empty">
            <Braces size={32} />
            <p>API response will appear here after a search</p>
          </div>
        )}
      </div>
    </div>
  );
}
