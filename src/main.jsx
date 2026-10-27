
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  CircleMarker,
  Tooltip
} from 'react-leaflet';

import {
  MapPin,
  LocateFixed,
  CloudSun,
  Droplets,
  CloudRain,
  Clock3
} from 'lucide-react';

import 'leaflet/dist/leaflet.css';
import './styles.css';

const VARANASI = [25.3176, 82.9739];

function SelectableMap({ point, setPoint }) {
  useMapEvents({
    click(event) {
      setPoint([
        event.latlng.lat,
        event.latlng.lng
      ]);
    }
  });

  return (
    <CircleMarker
      center={point}
      radius={7}
      pathOptions={{
        color: '#ffffff',
        weight: 3,
        fillColor: '#176b58',
        fillOpacity: 1
      }}
    >
      <Tooltip direction="top" offset={[0, -8]}>
        Selected location
      </Tooltip>
    </CircleMarker>
  );
}

function Metric({ icon: Icon, label, unit }) {
  return (
    <div className="metric">
      <div className="metric-label">
        <Icon size={16} strokeWidth={1.7} />
        <span>{label}</span>
      </div>

      <div className="metric-value">
        -- <span>{unit}</span>
      </div>
    </div>
  );
}

function WeatherPanel({ title, subtitle, forecast = false }) {
  return (
    <section className="weather-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">
            {forecast ? 'OUTLOOK' : 'OBSERVATIONS'}
          </p>

          <h2>{title}</h2>
          <p className="panel-subtitle">{subtitle}</p>
        </div>

        {forecast ? (
          <div className="time-tag">
            <Clock3 size={14} />
            +30 min
          </div>
        ) : (
          <div className="now-tag">
            <span />
            Current
          </div>
        )}
      </div>

      <div className="metrics">
        <Metric
          icon={CloudSun}
          label="Temperature"
          unit="°C"
        />

        <Metric
          icon={Droplets}
          label="Humidity"
          unit="%"
        />

        <Metric
          icon={CloudRain}
          label="Is raining?"
          unit=""
        />
      </div>
    </section>
  );
}

function App() {
  const [point, setPoint] = useState(VARANASI);

  function resetPoint() {
    setPoint(VARANASI);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-mark">
            <CloudSun size={21} strokeWidth={1.7} />
          </span>

          <span>FIELDNOTE <i>/</i> WEATHER</span>
        </a>

        <div className="topbar-right">
          <span className="status-dot" />
          LOCAL MODEL
          <span className="version">PREVIEW</span>
        </div>
      </header>

      <section className="intro">
        <div className="intro-copy">
          <p className="eyebrow">
            VARANASI, UTTAR PRADESH
          </p>

          <h1>
            Weather, down
            <br />
            to your street.
          </h1>

          <p className="intro-description">
            Choose a point on the map to explore local
            conditions and a 30-minute outlook.
          </p>
        </div>

        <div className="coordinates">
          <span className="coordinates-label">
            SELECTED COORDINATES
          </span>

          <span className="coordinates-value">
            {point[0].toFixed(4)}° N
            <span> / </span>
            {point[1].toFixed(4)}° E
          </span>
        </div>
      </section>

      <section className="map-section">
        <div className="map-heading">
          <div className="map-title">
            <MapPin size={17} strokeWidth={1.8} />
            <span>Explore the area</span>
          </div>

          <button
            className="text-button"
            onClick={resetPoint}
          >
            <LocateFixed size={15} />
            Reset to city centre
          </button>
        </div>

        <div className="map-frame">
          <MapContainer
            center={VARANASI}
            zoom={12}
            scrollWheelZoom={true}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <SelectableMap
              point={point}
              setPoint={setPoint}
            />
          </MapContainer>

          <div className="map-instruction">
            <span className="instruction-pin">
              <MapPin size={14} />
            </span>

            Click anywhere on the map to select a location
          </div>

          <div className="map-scale">
            VARANASI · INDIA
          </div>
        </div>

        <div className="map-footnote">
          <span>MAP DATA · OPENSTREETMAP</span>
          <span>POINT SELECTION ENABLED</span>
        </div>
      </section>

      <section className="results-section">
        <div className="section-intro">
          <div>
            <p className="eyebrow">LOCAL CONDITIONS</p>
            <h2>At your location</h2>
          </div>

          <p>
            Weather values will appear here
            <br />
            when the model is connected.
          </p>
        </div>

        <div className="weather-grid">
          <WeatherPanel
            title="Right now"
            subtitle="Current conditions"
          />

          <WeatherPanel
            title="In 30 minutes"
            subtitle="Model prediction"
            forecast={true}
          />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="footer-mark">F.</span>
          <span>Built for hyperlocal weather.</span>
        </div>

        <span className="footer-note">
          A MODEL INTERFACE · DATA NOT CONNECTED
        </span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
