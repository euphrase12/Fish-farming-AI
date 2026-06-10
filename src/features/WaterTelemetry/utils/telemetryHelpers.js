/**
 * Water Telemetry Helper Functions
 * Utility functions for data processing and status determination
 */

import { TELEMETRY_METRICS, ALERT_LEVELS } from '../constants/telemetryMetrics';

/**
 * Determines health status based on value and metric thresholds
 * @param {string} metricKey - The metric identifier
 * @param {number} value - The current value
 * @returns {string} - Status: 'optimal', 'warning', or 'critical'
 */
export const getMetricStatus = (metricKey, value) => {
  const metric = TELEMETRY_METRICS[metricKey];

  if (!metric) {
    console.warn(`[Telemetry] Unknown metric: ${metricKey}`);
    return 'unknown';
  }

  // Check critical levels first
  if (value < metric.criticalMin || value > metric.criticalMax) {
    return 'critical';
  }

  // Check optimal range
  if (value >= metric.optimalMin && value <= metric.optimalMax) {
    return 'optimal';
  }

  // Everything else is warning
  return 'warning';
};

/**
 * Gets the appropriate Tailwind CSS color class based on status
 * @param {string} status - The status level
 * @returns {string} - Tailwind color classes
 */
export const getStatusColor = (status) => {
  const colorMap = {
    optimal: 'text-green-400 bg-green-900 bg-opacity-20',
    warning: 'text-yellow-400 bg-yellow-900 bg-opacity-20',
    critical: 'text-red-400 bg-red-900 bg-opacity-20',
    unknown: 'text-gray-400 bg-gray-900 bg-opacity-20',
  };

  return colorMap[status] || colorMap.unknown;
};

/**
 * Gets the alert level based on overall system status
 * @param {Object} metricsData - Object with metric values
 * @returns {string} - Alert level
 */
export const getSystemAlertLevel = (metricsData) => {
  if (!metricsData || Object.keys(metricsData).length === 0) {
    return ALERT_LEVELS.INFO;
  }

  let hasCritical = false;
  let hasWarning = false;

  Object.entries(metricsData).forEach(([key, value]) => {
    const status = getMetricStatus(key, value);
    if (status === 'critical') hasCritical = true;
    if (status === 'warning') hasWarning = true;
  });

  if (hasCritical) return ALERT_LEVELS.CRITICAL;
  if (hasWarning) return ALERT_LEVELS.WARNING;
  return ALERT_LEVELS.INFO;
};

/**
 * Formats a value with appropriate decimal places
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted value
 */
export const formatValue = (value, decimals = 2) => {
  if (typeof value !== 'number') {
    console.warn('[Telemetry] Invalid value type:', typeof value);
    return 'N/A';
  }
  return parseFloat(value).toFixed(decimals);
};

/**
 * Calculates the percentage of a value within its range
 * @param {number} value - The current value
 * @param {number} min - Minimum range
 * @param {number} max - Maximum range
 * @returns {number} - Percentage 0-100
 */
export const calculatePercentage = (value, min, max) => {
  if (max === min) return 0;
  const percentage = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, percentage));
};

/**
 * Generates a timestamp for logging
 * @returns {string} - Formatted timestamp
 */
export const getTimestamp = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Logs telemetry debug information
 * @param {string} context - Debug context
 * @param {any} data - Data to log
 */
export const debugLog = (context, data) => {
  if (process.env.DEBUG_TELEMETRY === 'true') {
    console.log(`[${getTimestamp()}] [Telemetry:${context}]`, data);
  }
};

/**
 * Validates telemetry data structure
 * @param {Object} data - Data to validate
 * @returns {boolean} - True if valid
 */
export const validateTelemetryData = (data) => {
  if (!data || typeof data !== 'object') {
    debugLog('Validation', 'Invalid data structure');
    return false;
  }

  const requiredMetrics = Object.keys(TELEMETRY_METRICS);
  const hasAllMetrics = requiredMetrics.every((metric) => metric in data);

  if (!hasAllMetrics) {
    debugLog('Validation', 'Missing required metrics');
    return false;
  }

  return true;
};
