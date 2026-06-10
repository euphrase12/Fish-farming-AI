# Water Telemetry Dashboard - Feature Documentation

## Overview

The **Water Telemetry Dashboard** is a production-ready monitoring system for aquaculture facilities. It provides real-time visualization of water quality parameters, historical trend analysis, and intelligent alert management for optimal fish farming operations.

## Architecture

### Feature-Based Structure
```
src/features/WaterTelemetry/
├── components/           # React UI components
│   ├── WaterTelemetryDashboard.jsx    # Main orchestrator
│   ├── MetricCard.jsx                  # Individual metric display
│   ├── TelemetryChart.jsx              # Historical data visualization
│   └── SystemAlert.jsx                 # Alert system
├── hooks/               # Custom React hooks
│   └── useTelemetry.js   # Data fetching & state management
├── services/            # API layer
│   └── telemetryService.js # Backend API calls
├── utils/               # Helper functions
│   └── telemetryHelpers.js # Business logic utilities
├── constants/           # Configuration & constants
│   └── telemetryMetrics.js # Metric definitions
└── index.js             # Public exports
```

## Key Features

### 1. **Real-Time Monitoring**
- Tracks 6 water quality metrics simultaneously
- pH Level, Temperature, Dissolved Oxygen, Salinity, Turbidity, Ammonia
- Configurable refresh intervals (5s - 5 minutes)
- Real-time connection status indicator

### 2. **Intelligent Alert System**
- Three-tier alert levels: Info, Warning, Critical
- Automatic anomaly detection
- Visual and status-based alerts
- Debug-friendly error messages

### 3. **Historical Visualization**
- 24-hour trend analysis with Recharts
- Multi-metric comparison charts
- Interactive metric selection
- Responsive chart design

### 4. **Error Handling & Debugging**
- Try/catch blocks on all API calls
- Timeout protection (configurable)
- Detailed console logging with debug mode
- Graceful fallback to mock data in development

## Technical Implementation

### State Management (useState + useEffect)

```javascript
// Real-time telemetry
const { data, loading, error, lastUpdated, isConnected } = useTelemetryData(pondId);

// Historical data
const { data: historicalData, loading: historyLoading } = useHistoricalTelemetryData(pondId, 24);

// Active alerts
const { alerts, loading: alertsLoading } = useAlerts(pondId);
```

### Error Handling Pattern

```javascript
try {
  debugLog('Service', 'Fetching data');
  const response = await fetch(url, { signal: controller.signal });
  
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  
  // Validate data
  if (!validateTelemetryData(data)) throw new Error('Invalid data');
  
  setData(data);
} catch (error) {
  debugLog('Error', error.message);
  setError(error.message);
}
```

### API Configuration

All sensitive data is referenced via environment variables:

```javascript
// Never hardcoded
const API_KEY = process.env.VITE_API_KEY;
const API_URL = process.env.VITE_API_URL;
const API_TIMEOUT = process.env.VITE_API_TIMEOUT;
```

## Environment Configuration

Create `.env.local` based on `.env.example`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_USE_MOCK_DATA=true        # Development mode
DEBUG_TELEMETRY=true           # Enable debug logs

# Telemetry Configuration
VITE_DEFAULT_POND_ID=default
VITE_REFRESH_INTERVAL=30000
VITE_HISTORICAL_HOURS=24
```

## Component API Reference

### WaterTelemetryDashboard

Main dashboard component that orchestrates all features.

**Props:**
- `pondId` (string): Identifier for the fish pond - default: `'default'`
- `autoRefresh` (boolean): Enable auto-refresh - default: `true`

**Usage:**
```jsx
import { WaterTelemetryDashboard } from './features/WaterTelemetry';

<WaterTelemetryDashboard pondId="pond-1" autoRefresh={true} />
```

### MetricCard

Displays a single metric with status and progress bar.

**Props:**
- `metricKey` (string): Metric identifier (pH, TEMPERATURE, etc.)
- `value` (number): Current metric value
- `isLoading` (boolean): Loading state - default: `false`

**Status Indicators:**
- 🟢 **Optimal**: Within safe operating range
- 🟡 **Warning**: Approaching critical threshold
- 🔴 **Critical**: Immediate action required

### TelemetryChart

Historical data visualization component.

**Props:**
- `data` (array): Historical telemetry data points
- `metricKeys` (array): Metrics to display - default: `['TEMPERATURE', 'DISSOLVED_OXYGEN', 'pH']`
- `isLoading` (boolean): Loading state - default: `false`

### SystemAlert

System-wide alert notification component.

**Props:**
- `alertLevel` (string): Alert level (INFO, WARNING, CRITICAL)
- `activeAlerts` (array): List of active alerts
- `onDismiss` (function): Callback when alert is dismissed

## Debugging Guide

### Enable Debug Mode

```bash
# Set environment variable
DEBUG_TELEMETRY=true
```

### Debug Output Format

```javascript
[HH:MM:SS] [Telemetry:Context] Data
// Example:
[14:32:15] [Telemetry:Service] Fetching telemetry data for pond: default
[14:32:15] [Telemetry:Service] Telemetry data fetched successfully
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| No data showing | Set `VITE_USE_MOCK_DATA=true` for development |
| API timeout | Increase `VITE_API_TIMEOUT` value |
| Connection lost | Check API endpoint in `VITE_API_URL` |
| Debug logs missing | Ensure `DEBUG_TELEMETRY=true` in `.env.local` |

## Performance Optimization

- **Auto-refresh intervals**: Configurable 5s to 5 minutes
- **Lazy loading**: Historical data loads on demand
- **Memoization**: Chart data calculations memoized
- **Error boundaries**: Graceful degradation on failures
- **Mock data**: Instant development feedback without backend

## Security Best Practices

✅ **Implemented:**
- All API keys via environment variables
- Request timeouts (10s default)
- Error messages without sensitive data
- Input validation for telemetry data
- Proper CORS handling

⚠️ **Future Enhancements:**
- Token-based authentication
- Rate limiting
- Encrypted data transmission
- Audit logging

## Testing

### Manual Testing Checklist

- [ ] Test with mock data enabled
- [ ] Test with real API endpoint
- [ ] Verify alert triggers at critical levels
- [ ] Test auto-refresh intervals
- [ ] Check responsive design on mobile
- [ ] Verify debug logs in console
- [ ] Test error scenarios (timeout, invalid data)
- [ ] Verify connection status indicator

### Development Workflow

```bash
# 1. Start with mock data
VITE_USE_MOCK_DATA=true npm run dev

# 2. Test with real API
VITE_API_KEY=your_key npm run dev

# 3. Enable debug logging
DEBUG_TELEMETRY=true npm run dev

# 4. Build for production
npm run build
```

## API Endpoints Expected

The dashboard expects the following API endpoints:

```
GET /api/telemetry/{pondId}
Response: {
  pH: number,
  TEMPERATURE: number,
  DISSOLVED_OXYGEN: number,
  SALINITY: number,
  TURBIDITY: number,
  AMMONIA: number
}

GET /api/telemetry/{pondId}/history?hours=24
Response: Array<{
  timestamp: string,
  pH: number,
  TEMPERATURE: number,
  ...
}>

GET /api/telemetry/{pondId}/alerts
Response: Array<{
  id: string,
  message: string,
  level: 'info' | 'warning' | 'critical'
}>
```

## Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Custom alert thresholds per pond
- [ ] Historical data export (CSV, PDF)
- [ ] Multi-pond comparison views
- [ ] Machine learning anomaly detection
- [ ] Mobile app integration
- [ ] Automated actions on critical alerts
- [ ] Predictive analytics

## Integration with App

The dashboard is now integrated into the main DashboardPage with a toggle to switch between legacy and new views:

```jsx
// In DashboardPage.jsx
{showLegacy ? <LegacyDashboard /> : <WaterTelemetryDashboard />}
```

## Contributing

When extending this feature:

1. Follow the modular structure
2. Add error handling with try/catch
3. Use helper functions for business logic
4. Document prop types and return values
5. Enable debug logging for complex operations
6. Write responsive, dark-themed components
7. Use Tailwind CSS for styling
8. Test with mock data first

## License

Part of Smart Fish Farming AI MVP
