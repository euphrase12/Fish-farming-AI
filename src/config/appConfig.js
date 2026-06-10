/**
 * Environment Configuration
 * Centralized configuration for the application
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: parseInt(process.env.VITE_API_TIMEOUT || '10000'),
    apiKey: process.env.VITE_API_KEY || '',
  },

  // Feature Flags
  features: {
    useMockData: process.env.VITE_USE_MOCK_DATA === 'true',
    debugMode: process.env.DEBUG_TELEMETRY === 'true',
  },

  // Telemetry Configuration
  telemetry: {
    defaultPondId: process.env.VITE_DEFAULT_POND_ID || 'default',
    refreshInterval: parseInt(process.env.VITE_REFRESH_INTERVAL || '30000'),
    historicalDataHours: parseInt(process.env.VITE_HISTORICAL_HOURS || '24'),
  },

  // UI Configuration
  ui: {
    theme: process.env.VITE_THEME || 'dark',
    language: process.env.VITE_LANGUAGE || 'en',
  },
};

/**
 * Validates required environment variables
 */
export const validateConfig = () => {
  const required = [];

  if (!config.api.apiKey && !config.features.useMockData) {
    required.push('VITE_API_KEY');
  }

  if (required.length > 0) {
    console.warn(
      '[Config] Missing required environment variables:',
      required.join(', ')
    );
    if (!config.features.useMockData) {
      console.warn('[Config] Consider setting VITE_USE_MOCK_DATA=true for development');
    }
  }

  return required.length === 0;
};

export default config;
