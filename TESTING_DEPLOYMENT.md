# Water Telemetry Dashboard - Testing & Deployment Guide

## Immediate Testing (No Backend Required)

### Step 1: Setup Environment

```bash
cd /workspaces/Fish-farming-AI

# Copy environment template
cp .env.example .env.local

# Verify content
cat .env.local
```

### Step 2: Verify .env.local Configuration

Ensure these settings for development:

```env
VITE_USE_MOCK_DATA=true
DEBUG_TELEMETRY=true
VITE_REFRESH_INTERVAL=30000
```

### Step 3: Install Dependencies (if needed)

```bash
npm install
```

Dependencies already in package.json:
- ✅ react@18.2.0
- ✅ react-router-dom@7.17.0
- ✅ recharts@3.8.1
- ✅ tailwindcss@3.4.0

### Step 4: Start Development Server

```bash
npm run dev
```

Output should show:
```
  ➜  Local:   http://localhost:5173/
  ➜  Press q to quit
```

### Step 5: Navigate to Dashboard

1. Open `http://localhost:5173` in browser
2. Complete flow: Landing → Login → Payment → Dashboard
3. On Dashboard page, click **"📈 Legacy View"** button (top right)
4. Should toggle to show **"Water Telemetry Dashboard"**

### Step 6: Interact with Dashboard

**Real-Time Metrics:**
- ✅ 6 metric cards should display
- ✅ Each card shows current value + status
- ✅ Status colors change (green=optimal, yellow=warning, red=critical)

**Auto-Refresh:**
- ✅ Click different time buttons (5s, 30s, 1m, 5m)
- ✅ Values update automatically
- ✅ "Last update:" timestamp changes

**Chart:**
- ✅ Historical data displayed as line chart
- ✅ 24 hours of data points
- ✅ Multiple metrics shown in different colors

**Controls:**
- ✅ Toggle metrics ON/OFF
- ✅ Click "Select All" to enable all
- ✅ Chart updates instantly
- ✅ Manual "Refresh Now" button works

### Step 7: Debug Information

Open browser Developer Tools (F12) → Console

Should see logs like:
```javascript
[14:32:15] [Telemetry:Hook] Fetching telemetry data
[14:32:15] [Telemetry:Hook] Data set successfully
[14:32:15] [Telemetry:Dashboard] {
  pondId: 'default',
  hasData: true,
  connected: true,
  alertLevel: 'info',
  activeAlerts: 0
}
```

---

## Testing Checklist

### Visual Components

- [ ] MetricCard displays value, unit, status
- [ ] Status colors correct (green/yellow/red)
- [ ] Progress bar fills correctly
- [ ] Icons display properly
- [ ] Hover effects work

### System Alert

- [ ] Shows appropriate alert level
- [ ] Alert message displayed
- [ ] Dismiss button visible (except critical)
- [ ] Animation works

### Chart

- [ ] Line chart renders
- [ ] Legend shows metrics
- [ ] Hover tooltip appears
- [ ] Multiple metrics colored differently
- [ ] Data updates smoothly

### Controls

- [ ] Refresh interval buttons highlight selected
- [ ] Auto-refresh works at selected interval
- [ ] Manual refresh button works
- [ ] Metric selection toggles
- [ ] Select All button enables all metrics

### Responsive Design

**Mobile (320px):**
- [ ] Metrics stack vertically
- [ ] Chart resizes
- [ ] Controls responsive

**Tablet (768px):**
- [ ] 2 columns for metrics
- [ ] Chart full width
- [ ] Controls wrap appropriately

**Desktop (1024px+):**
- [ ] 3 columns for metrics
- [ ] Chart full width
- [ ] Controls in organized layout

### Connection Status

- [ ] Green dot shows connected
- [ ] "Last update" timestamp updates
- [ ] Status indicator animates

---

## Troubleshooting During Testing

### Issue: "Disconnected" Status

**Check:**
```bash
# Verify VITE_USE_MOCK_DATA is true
grep VITE_USE_MOCK_DATA .env.local
# Should output: VITE_USE_MOCK_DATA=true
```

**If shows false:**
```bash
# Update it
echo "VITE_USE_MOCK_DATA=true" >> .env.local
```

**Restart dev server:**
```bash
# Stop current: Ctrl+C
# Restart:
npm run dev
```

### Issue: No Chart Data

**Check browser console for errors:**
- Look for red error messages
- Check if data loading shows "Loading chart data..."

**Solutions:**
1. Verify VITE_HISTORICAL_HOURS=24 in .env.local
2. Try shorter refresh interval
3. Check if historicalData array has items

### Issue: Mock Data Not Updating

**Check:**
```bash
# Verify debug mode is on
grep DEBUG_TELEMETRY .env.local
# Should be: DEBUG_TELEMETRY=true
```

**Manual refresh:**
- Click "🔄 Refresh Now" button
- Should update values immediately

### Issue: Styling Issues

**Clear cache and rebuild:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

---

## Switching to Real API

Once backend is ready:

### Step 1: Update Environment

```bash
# Edit .env.local
nano .env.local  # or use VS Code
```

Change:
```env
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:3000/api  # Your API endpoint
VITE_API_KEY=your_actual_api_key
DEBUG_TELEMETRY=false
```

### Step 2: Verify API Endpoints

Ensure backend provides:

```javascript
// GET /api/telemetry/default
{
  pH: 7.2,
  TEMPERATURE: 24.5,
  DISSOLVED_OXYGEN: 8.1,
  SALINITY: 18.3,
  TURBIDITY: 5.2,
  AMMONIA: 0.22
}

// GET /api/telemetry/default/history?hours=24
[
  { timestamp: "2024-01-10T10:00:00Z", pH: 7.1, TEMPERATURE: 24.0, ... },
  { timestamp: "2024-01-10T11:00:00Z", pH: 7.2, TEMPERATURE: 24.5, ... },
  // ... 24 more points
]

// GET /api/telemetry/default/alerts
[
  { id: "1", message: "pH too high", level: "warning" },
  // ... more alerts
]
```

### Step 3: Test Connection

```bash
# Restart dev server
npm run dev

# Open dashboard
# Should show data from API
# Check console for any errors
```

### Step 4: Monitor in Console

Real API logs look like:
```javascript
[14:32:15] [Telemetry:Service] Fetching telemetry data for pond: default
[14:32:16] [Telemetry:Service] Telemetry data fetched successfully
```

---

## Production Deployment

### Build for Production

```bash
npm run build
```

Creates optimized bundle in `dist/` directory

### Environment Setup

Create `.env.production`:
```env
VITE_API_URL=https://api.yourfarm.com
VITE_API_KEY=production_key_from_secrets
VITE_USE_MOCK_DATA=false
DEBUG_TELEMETRY=false
VITE_REFRESH_INTERVAL=60000
```

### Deployment Options

**Vercel (already configured):**
```bash
# Push to main branch, Vercel auto-deploys
git push origin main

# Or manual deploy:
vercel --prod
```

**Other Platforms:**
- Upload `dist/` folder to hosting
- Set environment variables in platform settings
- Ensure API endpoints are accessible

### Pre-Deployment Checklist

- [ ] API endpoints working correctly
- [ ] API key in environment secrets
- [ ] Mock data disabled
- [ ] Debug logging disabled
- [ ] Build completes without errors
- [ ] No console errors in production
- [ ] Responsive design tested on mobile
- [ ] All metrics loading correctly
- [ ] Alerts functioning
- [ ] Error handling tested

### Monitor After Deployment

1. **Error Tracking**: Set up error monitoring service
2. **Performance**: Monitor API response times
3. **Usage**: Track user engagement
4. **Alerts**: Configure critical alert notifications

---

## Performance Optimization

### For Development

Keep mock data enabled for faster iteration:
```env
VITE_USE_MOCK_DATA=true
DEBUG_TELEMETRY=true
VITE_REFRESH_INTERVAL=30000  # Every 30 seconds
```

### For Production

Optimize refresh rates based on needs:
```env
# Stable environments: Longer intervals
VITE_REFRESH_INTERVAL=300000  # 5 minutes

# Critical monitoring: Shorter intervals  
VITE_REFRESH_INTERVAL=5000    # 5 seconds

# Balanced approach:
VITE_REFRESH_INTERVAL=60000   # 1 minute
```

### API Performance

**Response Time Targets:**
- Real-time data: < 500ms
- Historical data: < 1s
- Alerts: < 500ms

**If slower:**
1. Check backend performance
2. Add caching layer
3. Reduce historical data scope
4. Increase refresh intervals

---

## API Response Format Validation

Test your API returns correct format:

```javascript
// Should match this structure
{
  pH: 7.2,                    // number
  TEMPERATURE: 24.5,          // number
  DISSOLVED_OXYGEN: 8.1,      // number
  SALINITY: 18.3,             // number
  TURBIDITY: 5.2,             // number
  AMMONIA: 0.22               // number
}
```

If API returns different format, update response handler in:
`src/features/WaterTelemetry/services/telemetryService.js`

---

## Support & Debugging

### Enable All Debug Features

```bash
# Create debug configuration
echo "DEBUG_TELEMETRY=true" >> .env.local
```

Then check console for detailed logs showing:
- API calls
- Data validation
- State changes
- Component renders

### Common Error Messages

**"HTTP Error: 404"**
- API endpoint doesn't exist
- Check VITE_API_URL in .env.local

**"Request timeout"**
- API taking too long
- Increase VITE_API_TIMEOUT in .env.local

**"Invalid telemetry data structure"**
- API response format incorrect
- Verify response matches expected format above

**"Cannot read property of undefined"**
- Missing metric data
- Check if all 6 metrics present in response

---

## Next Steps

1. ✅ Test with mock data (completed above)
2. ⏳ Build backend API endpoints
3. ⏳ Test API integration
4. ⏳ Optimize performance
5. ⏳ Deploy to production
6. ⏳ Set up monitoring
7. ⏳ Gather user feedback
8. ⏳ Iterate and improve

You're ready to test! 🚀
