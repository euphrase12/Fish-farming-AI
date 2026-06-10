/**
 * TelemetryChart Component
 * Visualizes historical telemetry data using Recharts
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { debugLog } from '../utils/telemetryHelpers';

const TelemetryChart = ({ data = [], metricKeys = ['TEMPERATURE', 'DISSOLVED_OXYGEN', 'pH'], isLoading = false }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-2">📊 No historical data available</p>
          <p className="text-gray-600 text-sm">Data will appear here once collected</p>
        </div>
      </div>
    );
  }

  // Color mapping for different metrics
  const colorMap = {
    TEMPERATURE: '#f97316',
    DISSOLVED_OXYGEN: '#06b6d4',
    pH: '#a855f7',
    SALINITY: '#ec4899',
    TURBIDITY: '#8b5cf6',
    AMMONIA: '#f43f5e',
  };

  // Process data for chart
  const chartData = data.map((point) => {
    const item = { timestamp: point.timestamp || new Date().toLocaleTimeString() };
    metricKeys.forEach((key) => {
      if (key in point) {
        item[key] = parseFloat(point[key]).toFixed(2);
      }
    });
    return item;
  });

  debugLog('Chart', `Rendering chart with ${chartData.length} data points`);

  const handleChartClick = (data) => {
    debugLog('Chart', 'Chart clicked at:', data);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📈 Historical Trends (24 Hours)
        </h2>
        <p className="text-gray-400 text-sm mt-1">Real-time telemetry data visualization</p>
      </div>

      {isLoading ? (
        <div className="h-96 bg-gray-700 rounded animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      ) : (
        <div className="w-full h-96" onClick={handleChartClick}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
              <XAxis
                dataKey="timestamp"
                stroke="#888"
                tick={{ fontSize: 12 }}
                interval={Math.floor(chartData.length / 6)}
              />
              <YAxis stroke="#888" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#fff' }}
                cursor={{ stroke: '#666' }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />

              {metricKeys.map((metricKey) => (
                <Line
                  key={metricKey}
                  type="monotone"
                  dataKey={metricKey}
                  stroke={colorMap[metricKey] || '#ccc'}
                  isAnimationActive={false}
                  dot={false}
                  strokeWidth={2}
                  name={metricKey.replace(/_/g, ' ')}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        {metricKeys.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorMap[key] || '#ccc' }}
            ></div>
            <span className="text-gray-400">{key.replace(/_/g, ' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TelemetryChart;
