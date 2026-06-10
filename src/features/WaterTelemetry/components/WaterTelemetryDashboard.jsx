/**
 * WaterTelemetryDashboard Component
 * Main dashboard orchestrating all telemetry features
 * Features: Real-time metrics, historical visualization, alerts, error handling
 */

import React, { useState, useMemo } from 'react';
import MetricCard from './MetricCard';
import TelemetryChart from './TelemetryChart';
import SystemAlert from './SystemAlert';
import { useTelemetryData, useHistoricalTelemetryData, useAlerts } from '../hooks/useTelemetry';
import { getSystemAlertLevel, debugLog } from '../utils/telemetryHelpers';
import { TELEMETRY_METRICS, ALERT_LEVELS, REFRESH_INTERVALS } from '../constants/telemetryMetrics';

const WaterTelemetryDashboard = ({ pondId = 'default', autoRefresh = true }) => {
  const [refreshInterval, setRefreshInterval] = useState(REFRESH_INTERVALS.SHORT);
  const [selectedMetrics, setSelectedMetrics] = useState(['TEMPERATURE', 'DISSOLVED_OXYGEN', 'pH']);

  // Fetch real-time telemetry data
  const { data: telemetryData, loading: telemetryLoading, error: telemetryError, lastUpdated, isConnected, refetch: refetchTelemetry } = useTelemetryData(
    pondId,
    autoRefresh,
    refreshInterval
  );

  // Fetch historical data for charts
  const { data: historicalData, loading: historyLoading, error: historyError, refetch: refetchHistory } = useHistoricalTelemetryData(
    pondId,
    24
  );

  // Fetch alerts
  const { alerts, loading: alertsLoading, error: alertsError, refetch: refetchAlerts } = useAlerts(pondId);

  // Calculate system alert level
  const systemAlertLevel = useMemo(() => {
    if (!telemetryData) return ALERT_LEVELS.INFO;
    return getSystemAlertLevel(telemetryData);
  }, [telemetryData]);

  // Debug log: Component render
  React.useEffect(() => {
    debugLog('Dashboard', {
      pondId,
      hasData: !!telemetryData,
      connected: isConnected,
      alertLevel: systemAlertLevel,
      activeAlerts: alerts.length,
    });
  }, [telemetryData, isConnected, systemAlertLevel, alerts, pondId]);

  // Manual refetch handler
  const handleRefresh = async () => {
    debugLog('Dashboard', 'Manual refresh triggered');
    await Promise.all([refetchTelemetry(), refetchHistory(), refetchAlerts()]);
  };

  // Interval change handler
  const handleIntervalChange = (interval) => {
    debugLog('Dashboard', `Refresh interval changed to ${interval}ms`);
    setRefreshInterval(interval);
  };

  // Metric selection toggle
  const handleMetricToggle = (metricKey) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricKey)
        ? prev.filter((m) => m !== metricKey)
        : [...prev, metricKey]
    );
    debugLog('Dashboard', `Metric toggled: ${metricKey}`);
  };

  const allMetricKeys = Object.keys(TELEMETRY_METRICS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              💧 Water Telemetry Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Real-time monitoring for aquaculture optimization</p>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-3">
            <div
              className={`
                w-3 h-3 rounded-full
                ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
              `}
              role="status"
              aria-label={isConnected ? 'Connected' : 'Disconnected'}
            ></div>
            <div>
              <p className="text-sm font-semibold text-gray-300">
                {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
              </p>
              {lastUpdated && (
                <p className="text-xs text-gray-500">
                  Last update: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Alert */}
      <SystemAlert
        alertLevel={systemAlertLevel}
        activeAlerts={alerts.map((alert) => alert.message || JSON.stringify(alert))}
      />

      {/* Error Display */}
      {telemetryError && (
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4 mb-4 text-red-300">
          <p className="font-semibold">❌ Data Fetch Error</p>
          <p className="text-sm mt-1">{telemetryError}</p>
          <p className="text-xs text-red-400 mt-2">
            💡 Debug: Check console logs for detailed information
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Refresh Controls */}
          <div>
            <p className="text-sm font-semibold text-gray-300 mb-3">🔄 Auto-Refresh</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: '5s', value: REFRESH_INTERVALS.REAL_TIME },
                { label: '30s', value: REFRESH_INTERVALS.SHORT },
                { label: '1m', value: REFRESH_INTERVALS.MEDIUM },
                { label: '5m', value: REFRESH_INTERVALS.LONG },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleIntervalChange(option.value)}
                  className={`
                    px-3 py-1 rounded text-sm font-medium transition-colors
                    ${
                      refreshInterval === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                  aria-pressed={refreshInterval === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleRefresh}
              disabled={telemetryLoading}
              className="
                px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white
                rounded font-medium text-sm transition-colors disabled:opacity-50
                flex items-center gap-2
              "
              aria-label="Refresh data"
            >
              {telemetryLoading ? '⏳ Refreshing...' : '🔄 Refresh Now'}
            </button>
            <button
              onClick={() => setSelectedMetrics(allMetricKeys)}
              className="
                px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300
                rounded font-medium text-sm transition-colors
              "
              aria-label="Select all metrics"
            >
              Select All
            </button>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm font-semibold text-gray-300 mb-2">📊 Chart Metrics</p>
          <div className="flex flex-wrap gap-2">
            {allMetricKeys.map((metricKey) => (
              <button
                key={metricKey}
                onClick={() => handleMetricToggle(metricKey)}
                className={`
                  px-3 py-1 rounded text-sm font-medium transition-colors
                  ${
                    selectedMetrics.includes(metricKey)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }
                `}
                aria-pressed={selectedMetrics.includes(metricKey)}
              >
                {TELEMETRY_METRICS[metricKey].icon} {metricKey.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          📈 Current Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMetricKeys.map((metricKey) => (
            <MetricCard
              key={metricKey}
              metricKey={metricKey}
              value={telemetryData?.[metricKey] || 0}
              isLoading={telemetryLoading}
            />
          ))}
        </div>
      </div>

      {/* Historical Chart */}
      <div className="mb-8">
        <TelemetryChart
          data={historicalData}
          metricKeys={selectedMetrics}
          isLoading={historyLoading}
        />
      </div>

      {/* Debug Info Footer */}
      {process.env.DEBUG_TELEMETRY === 'true' && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 text-xs text-gray-500">
          <p className="font-mono mb-2">🐛 Debug Information</p>
          <div className="space-y-1 font-mono text-gray-600">
            <p>Pond ID: {pondId}</p>
            <p>Data Points: {historicalData.length}</p>
            <p>Active Alerts: {alerts.length}</p>
            <p>Telemetry Loading: {telemetryLoading ? 'Yes' : 'No'}</p>
            <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterTelemetryDashboard;
