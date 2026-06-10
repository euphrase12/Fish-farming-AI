# Water Telemetry Dashboard - Quick Start Guide

## Getting Started in 5 Minutes

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env.local
```

For **development mode** (with mock data), set:
```env
VITE_USE_MOCK_DATA=true
DEBUG_TELEMETRY=true
```

### 2. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or similar)

### 3. Access the Dashboard

1. Go through the landing page flow (Login → Payment)
2. On the Dashboard page, click **📈 Legacy View** button to toggle to the new dashboard
3. You should see the Water Telemetry Dashboard with real-time mock data

### 4. Features to Try

**🔄 Auto-Refresh Controls**
- Click different time intervals (5s, 30s, 1m, 5m)
- Watch metrics update automatically

**📊 Metric Cards**
- View individual metrics with status indicators
- See optimal vs critical ranges
- Progress bars show value position in range

**📈 Historical Chart**
- Select/deselect metrics to display
- Hover over points to see values
- 24-hour trend visualization

**⚠️ Alert System**
- System alerts show based on metric status
- Color-coded (green=optimal, yellow=warning, red=critical)

**🐛 Debug Information**
- Enable `DEBUG_TELEMETRY=true` in `.env.local`
- Check browser console for detailed logs

## Project Structure

```
src/
├── features/WaterTelemetry/
│   ├── components/
│   │   ├── MetricCard.jsx              # Individual metric display
│   │   ├── SystemAlert.jsx             # Alert notifications
│   │   ├── TelemetryChart.jsx          # Historical visualization
│   │   └── WaterTelemetryDashboard.jsx # Main component
│   ├── constants/
│   │   └── telemetryMetrics.js         # Metric definitions & thresholds
│   ├── hooks/
│   │   └── useTelemetry.js             # Data fetching hooks
│   ├── services/
│   │   └── telemetryService.js         # API layer
│   ├── utils/
│   │   └── telemetryHelpers.js         # Helper functions
│   └── index.js                        # Public exports
├── config/
│   └── appConfig.js                    # Configuration management
└── pages/
    └── DashboardPage.jsx               # Integration point
```

## Configuration Reference

### Metrics Tracked

| Metric | Unit | Optimal Range | Critical Range |
|--------|------|--------------|-----------------|
| pH | - | 6.5 - 8.5 | 5 - 9.5 |
| Temperature | °C | 20 - 28 | 15 - 35 |
| Dissolved Oxygen | mg/L | 6 - 10 | 4 - 15 |
| Salinity | PSU | 10 - 25 | 5 - 35 |
| Turbidity | NTU | 0 - 10 | 0 - 50 |
| Ammonia | mg/L | 0 - 0.5 | 0 - 2 |

### Environment Variables

```env
# API Settings
VITE_API_URL=http://localhost:3000/api        # API endpoint
VITE_API_KEY=your_api_key_here                # API authentication
VITE_API_TIMEOUT=10000                        # Request timeout (ms)

# Feature Flags
VITE_USE_MOCK_DATA=true                       # Use mock data (dev)
DEBUG_TELEMETRY=true                          # Enable debug logs

# Telemetry Settings
VITE_DEFAULT_POND_ID=default                  # Default pond ID
VITE_REFRESH_INTERVAL=30000                   # Refresh interval (ms)
VITE_HISTORICAL_HOURS=24                      # Historical data span
```

## Common Tasks

### Using Real API

Replace mock data with real API calls:

```env
VITE_USE_MOCK_DATA=false
VITE_API_URL=https://your-api-endpoint.com/api
VITE_API_KEY=your_actual_api_key
```

### Enabling Debug Mode

For detailed console logging:

```env
DEBUG_TELEMETRY=true
```

This logs every API call, data validation, and state change.

### Changing Refresh Interval

Update in `.env.local`:
```env
VITE_REFRESH_INTERVAL=60000  # 1 minute instead of 30s
```

Or change dynamically in the UI using the control buttons.

### Adding Custom Metrics

1. Add metric definition in `src/features/WaterTelemetry/constants/telemetryMetrics.js`
2. Update API service to include it
3. Add to MetricCard grid in dashboard
4. Configure thresholds and ranges

## Troubleshooting

### Dashboard Shows "Disconnected"

**Cause**: API endpoint unreachable or invalid

**Solution**:
```bash
# Check if running in mock mode
cat .env.local | grep VITE_USE_MOCK_DATA

# Should be true for development
VITE_USE_MOCK_DATA=true
```

### No Data Displayed

**Cause**: Mock data disabled but API endpoint invalid

**Solution**:
```env
# For development, enable mock data
VITE_USE_MOCK_DATA=true
```

### Metrics Show "NaN"

**Cause**: Invalid or missing data from API

**Solution**:
```bash
# Enable debug logging
DEBUG_TELEMETRY=true

# Check console for error details
# Then verify API response format
```

### Chart Not Updating

**Cause**: Refresh interval too long or historical data not loading

**Solution**:
1. Try shorter refresh interval (5s or 30s)
2. Check browser console for API errors
3. Verify historical data endpoint responds correctly

## Next Steps

1. **Development Mode**: Start with `VITE_USE_MOCK_DATA=true`
2. **API Integration**: Connect to your backend service
3. **Customization**: Adjust metrics and thresholds for your farm
4. **Monitoring**: Enable production logging and error tracking
5. **Optimization**: Fine-tune refresh intervals based on needs

## Support Resources

- 📖 Full documentation: `TELEMETRY_DOCUMENTATION.md`
- 🔍 Debug logs: Enable `DEBUG_TELEMETRY=true` in `.env.local`
- 💻 Check browser console (F12) for errors
- 🐛 Component-specific debug info in dashboard footer

## Production Deployment

### Build for Production

```bash
npm run build
```

### Environment Setup for Production

```env
# Production API endpoint
VITE_API_URL=https://api.yourfarm.com/api
VITE_API_KEY=production_api_key_from_secrets

# Disable mock data
VITE_USE_MOCK_DATA=false

# Disable debug logging
DEBUG_TELEMETRY=false

# Optimize refresh rate
VITE_REFRESH_INTERVAL=60000
```

### Deployment Checklist

- [ ] API endpoints configured correctly
- [ ] API key stored in environment secrets
- [ ] Mock data disabled
- [ ] Debug logging disabled
- [ ] Production build tested
- [ ] Error handling verified
- [ ] Responsive design tested on mobile

Good luck with your Smart Fish Farming AI! 🐟💧
