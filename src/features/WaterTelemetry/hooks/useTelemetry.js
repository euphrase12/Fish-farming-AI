/**
 * useTelemetryData Hook
 * Manages real-time telemetry data fetching with error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchTelemetryData, generateMockTelemetryData } from '../services/telemetryService';
import { debugLog, validateTelemetryData } from '../utils/telemetryHelpers';
import { REFRESH_INTERVALS } from '../constants/telemetryMetrics';

export const useTelemetryData = (
  pondId = 'default',
  autoRefresh = true,
  refreshInterval = REFRESH_INTERVALS.SHORT
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch telemetry data
  const fetchData = useCallback(async () => {
    try {
      debugLog('Hook', 'Fetching telemetry data');
      setError(null);

      // Check if we should use mock data for development
      const useMock = process.env.VITE_USE_MOCK_DATA === 'true';

      let result;
      if (useMock) {
        debugLog('Hook', 'Using mock data (development mode)');
        result = {
          success: true,
          data: generateMockTelemetryData(),
        };
      } else {
        result = await fetchTelemetryData(pondId);
      }

      if (result.success) {
        // Validate data structure
        if (validateTelemetryData(result.data)) {
          setData(result.data);
          setLastUpdated(new Date());
          setIsConnected(true);
          debugLog('Hook', 'Data set successfully');
        } else {
          throw new Error('Invalid telemetry data structure');
        }
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      debugLog('Hook', `Error in fetchData: ${err.message}`);
      setError(err.message);
      setIsConnected(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [pondId]);

  // Set up auto-refresh
  useEffect(() => {
    // Initial fetch
    fetchData();

    if (!autoRefresh) return;

    // Set up interval for auto-refresh
    const intervalId = setInterval(() => {
      debugLog('Hook', `Auto-refreshing telemetry (interval: ${refreshInterval}ms)`);
      fetchData();
    }, refreshInterval);

    return () => {
      clearInterval(intervalId);
      debugLog('Hook', 'Cleaned up auto-refresh interval');
    };
  }, [fetchData, autoRefresh, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    isConnected,
    refetch: fetchData,
  };
};

/**
 * useHistoricalTelemetryData Hook
 * Manages historical data fetching for charting
 */
import { fetchHistoricalData, generateMockHistoricalData } from '../services/telemetryService';

export const useHistoricalTelemetryData = (pondId = 'default', hours = 24) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistoryData = useCallback(async () => {
    try {
      debugLog('Hook', `Fetching historical data for ${hours} hours`);
      setError(null);

      const useMock = process.env.VITE_USE_MOCK_DATA === 'true';
      let result;

      if (useMock) {
        debugLog('Hook', 'Using mock historical data');
        result = {
          success: true,
          data: generateMockHistoricalData(hours),
        };
      } else {
        result = await fetchHistoricalData(pondId, hours);
      }

      if (result.success) {
        setData(result.data);
        debugLog('Hook', `Historical data loaded: ${result.data.length} points`);
      } else {
        throw new Error(result.error || 'Failed to fetch historical data');
      }
    } catch (err) {
      debugLog('Hook', `Error fetching history: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pondId, hours]);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  return {
    data,
    loading,
    error,
    refetch: fetchHistoryData,
  };
};

/**
 * useAlerts Hook
 * Manages alert data fetching
 */
import { fetchAlerts } from '../services/telemetryService';

export const useAlerts = (pondId = 'default', autoRefresh = true, interval = REFRESH_INTERVALS.MEDIUM) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlertsData = useCallback(async () => {
    try {
      debugLog('Hook', 'Fetching alerts');
      setError(null);

      const result = await fetchAlerts(pondId);

      if (result.success) {
        setAlerts(result.data);
        debugLog('Hook', `Alerts loaded: ${result.data.length} active alerts`);
      } else {
        throw new Error(result.error || 'Failed to fetch alerts');
      }
    } catch (err) {
      debugLog('Hook', `Error fetching alerts: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pondId]);

  useEffect(() => {
    fetchAlertsData();

    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      debugLog('Hook', 'Auto-refreshing alerts');
      fetchAlertsData();
    }, interval);

    return () => clearInterval(intervalId);
  }, [fetchAlertsData, autoRefresh, interval]);

  return {
    alerts,
    loading,
    error,
    refetch: fetchAlertsData,
  };
};
