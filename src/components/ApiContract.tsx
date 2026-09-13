import { Code2 } from 'lucide-react';

export function ApiContract() {
  return (
    <div className="api-contract">
      <div className="api-contract-header">
        <Code2 size={16} />
        <h4>API Contract</h4>
      </div>
      <div className="api-contract-body">
        <div className="api-contract-row">
          <span className="api-label">Endpoint</span>
          <code className="api-value">GET /v1/current.json</code>
        </div>
        <div className="api-contract-row">
          <span className="api-label">Base URL</span>
          <code className="api-value">https://api.weatherapi.com/v1</code>
        </div>
        <div className="api-contract-row">
          <span className="api-label">Auth</span>
          <code className="api-value">?key=YOUR_API_KEY</code>
        </div>
        <div className="api-contract-row">
          <span className="api-label">Query</span>
          <code className="api-value">?q=cityName&amp;aqi=no</code>
        </div>
        <div className="api-contract-row">
          <span className="api-label">Returns</span>
          <code className="api-value">{`{ location, current }`}</code>
        </div>
      </div>
    </div>
  );
}
