/**
 * MetricCard Component
 * Displays a single water quality metric with status indicator
 */

import React from 'react';
import { TELEMETRY_METRICS } from '../constants/telemetryMetrics';
import { getMetricStatus, getStatusColor, formatValue, calculatePercentage } from '../utils/telemetryHelpers';

const MetricCard = ({ metricKey, value, isLoading = false }) => {
  const metric = TELEMETRY_METRICS[metricKey];

  if (!metric) {
    console.error(`[MetricCard] Unknown metric: ${metricKey}`);
    return null;
  }

  const status = getMetricStatus(metricKey, value);
  const statusColor = getStatusColor(status);
  const percentage = calculatePercentage(value, metric.min, metric.max);
  const formattedValue = formatValue(value);

  const statusLabels = {
    optimal: '✓ Optimal',
    warning: '⚠ Warning',
    critical: '✕ Critical',
  };

  return (
    <div
      className="
        bg-gray-800 rounded-lg p-4 border border-gray-700
        hover:border-gray-600 transition-colors duration-200
        shadow-lg hover:shadow-xl
      "
      role="article"
      aria-label={`${metric.label} metric card`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
          <p className="text-gray-600 text-xs">{metric.description}</p>
        </div>
        <span className="text-2xl">{metric.icon}</span>
      </div>

      {/* Value Display */}
      {isLoading ? (
        <div className="animate-pulse h-8 bg-gray-700 rounded mb-3 w-2/3"></div>
      ) : (
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">{formattedValue}</span>
            <span className="text-gray-400 text-sm">{metric.unit}</span>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold mb-3 ${statusColor}`}>
        {statusLabels[status]}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Range: {metric.optimalMin} - {metric.optimalMax} {metric.unit}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              status === 'optimal'
                ? 'bg-green-500'
                : status === 'warning'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      {/* Critical Range Info */}
      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-500">
        <p>⚡ Critical: {metric.criticalMin} - {metric.criticalMax} {metric.unit}</p>
      </div>
    </div>
  );
};

export default MetricCard;
