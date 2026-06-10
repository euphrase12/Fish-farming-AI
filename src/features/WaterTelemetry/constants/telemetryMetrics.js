/**
 * Water Telemetry Metrics Configuration
 * Defines all water quality parameters and their thresholds
 */

export const TELEMETRY_METRICS = {
  pH: {
    label: 'pH Level',
    unit: '',
    min: 0,
    max: 14,
    optimalMin: 6.5,
    optimalMax: 8.5,
    icon: '🧪',
    description: 'Acidity/Alkalinity indicator',
    criticalMin: 5,
    criticalMax: 9.5,
  },
  TEMPERATURE: {
    label: 'Temperature',
    unit: '°C',
    min: 0,
    max: 50,
    optimalMin: 20,
    optimalMax: 28,
    icon: '🌡️',
    description: 'Water temperature',
    criticalMin: 15,
    criticalMax: 35,
  },
  DISSOLVED_OXYGEN: {
    label: 'Dissolved Oxygen',
    unit: 'mg/L',
    min: 0,
    max: 20,
    optimalMin: 6,
    optimalMax: 10,
    icon: '🫁',
    description: 'Oxygen levels in water',
    criticalMin: 4,
    criticalMax: 15,
  },
  SALINITY: {
    label: 'Salinity',
    unit: 'PSU',
    min: 0,
    max: 40,
    optimalMin: 10,
    optimalMax: 25,
    icon: '🧂',
    description: 'Salt concentration',
    criticalMin: 5,
    criticalMax: 35,
  },
  TURBIDITY: {
    label: 'Turbidity',
    unit: 'NTU',
    min: 0,
    max: 100,
    optimalMin: 0,
    optimalMax: 10,
    icon: '👁️',
    description: 'Water clarity',
    criticalMin: 0,
    criticalMax: 50,
  },
  AMMONIA: {
    label: 'Ammonia',
    unit: 'mg/L',
    min: 0,
    max: 10,
    optimalMin: 0,
    optimalMax: 0.5,
    icon: '⚠️',
    description: 'Ammonia concentration',
    criticalMin: 0,
    criticalMax: 2,
  },
};

export const ALERT_LEVELS = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical',
};

export const ALERT_MESSAGES = {
  OPTIMAL: 'All parameters are within optimal range',
  WARNING: 'One or more parameters approaching critical range',
  CRITICAL: 'Critical alert: Immediate action required',
};

export const REFRESH_INTERVALS = {
  REAL_TIME: 5000, // 5 seconds
  SHORT: 30000, // 30 seconds
  MEDIUM: 60000, // 1 minute
  LONG: 300000, // 5 minutes
};
