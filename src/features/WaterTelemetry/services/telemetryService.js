/**
 * Water Telemetry Service
 * Handles API calls for telemetry data with error handling
 */

import { debugLog } from '../utils/telemetryHelpers';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = parseInt(process.env.VITE_API_TIMEOUT || '10000');

/**
 * Fetches real-time telemetry data from the backend
 * @param {string} pondId - Pond identifier
 * @returns {Promise<Object>} - Telemetry metrics
 */
export const fetchTelemetryData = async (pondId = 'default') => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    debugLog('Service', `Fetching telemetry data for pond: ${pondId}`);

    const response = await fetch(`${API_BASE_URL}/telemetry/${pondId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_API_KEY || ''}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    debugLog('Service', 'Telemetry data fetched successfully', data);
    return {
      success: true,
      data: data,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      const errorMsg = 'Request timeout - API unreachable';
      debugLog('Service', errorMsg);
      return {
        success: false,
        error: errorMsg,
        code: 'TIMEOUT',
      };
    }

    debugLog('Service', `Error fetching telemetry: ${error.message}`);
    return {
      success: false,
      error: error.message || 'Failed to fetch telemetry data',
      code: 'FETCH_ERROR',
    };
  }
};

/**
 * Fetches historical telemetry data for visualization
 * @param {string} pondId - Pond identifier
 * @param {number} hours - Number of hours to retrieve
 * @returns {Promise<Object>} - Historical data array
 */
export const fetchHistoricalData = async (pondId = 'default', hours = 24) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    debugLog('Service', `Fetching historical data for ${hours} hours`);

    const response = await fetch(
      `${API_BASE_URL}/telemetry/${pondId}/history?hours=${hours}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VITE_API_KEY || ''}`,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    debugLog('Service', `Historical data retrieved: ${data.length} records`);

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timeoutId);

    debugLog('Service', `Error fetching history: ${error.message}`);
    return {
      success: false,
      error: error.message || 'Failed to fetch historical data',
      code: error.name === 'AbortError' ? 'TIMEOUT' : 'FETCH_ERROR',
      data: [],
    };
  }
};

/**
 * Fetches active alerts for a pond
 * @param {string} pondId - Pond identifier
 * @returns {Promise<Object>} - Active alerts array
 */
export const fetchAlerts = async (pondId = 'default') => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    debugLog('Service', `Fetching alerts for pond: ${pondId}`);

    const response = await fetch(`${API_BASE_URL}/telemetry/${pondId}/alerts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VITE_API_KEY || ''}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    debugLog('Service', `Alerts retrieved: ${data.length} active alerts`);

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timeoutId);

    debugLog('Service', `Error fetching alerts: ${error.message}`);
    return {
      success: false,
      error: error.message || 'Failed to fetch alerts',
      code: error.name === 'AbortError' ? 'TIMEOUT' : 'FETCH_ERROR',
      data: [],
    };
  }
};

/**
 * Generates mock telemetry data for development/testing
 * @returns {Object} - Mock telemetry data
 */
export const generateMockTelemetryData = () => {
  debugLog('Service', 'Generating mock telemetry data');
  return {
    pH: 7.2 + (Math.random() - 0.5) * 0.5,
    TEMPERATURE: 24 + (Math.random() - 0.5) * 3,
    DISSOLVED_OXYGEN: 8 + (Math.random() - 0.5) * 1.5,
    SALINITY: 18 + (Math.random() - 0.5) * 2,
    TURBIDITY: 5 + (Math.random() - 0.5) * 3,
    AMMONIA: 0.2 + (Math.random() - 0.5) * 0.1,
  };
};

/**
 * Generates mock historical data
 * @param {number} points - Number of data points
 * @returns {Array} - Array of mock historical data
 */
export const generateMockHistoricalData = (points = 24) => {
  debugLog('Service', `Generating ${points} mock historical data points`);
  const data = [];
  const now = Date.now();

  for (let i = points - 1; i >= 0; i--) {
    data.push({
      timestamp: new Date(now - i * 3600000).toISOString(),
      pH: 7.2 + (Math.random() - 0.5),
      TEMPERATURE: 24 + (Math.random() - 0.5) * 2,
      DISSOLVED_OXYGEN: 8 + (Math.random() - 0.5),
      SALINITY: 18 + (Math.random() - 0.5),
      TURBIDITY: 5 + (Math.random() - 0.5) * 2,
      AMMONIA: 0.2 + (Math.random() - 0.5) * 0.05,
    });
  }

  return data;
};
