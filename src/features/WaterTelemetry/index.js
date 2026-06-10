/**
 * Water Telemetry Feature - Main Export
 * Centralized access to all telemetry components and utilities
 */

// Components
export { default as WaterTelemetryDashboard } from './components/WaterTelemetryDashboard';
export { default as MetricCard } from './components/MetricCard';
export { default as TelemetryChart } from './components/TelemetryChart';
export { default as SystemAlert } from './components/SystemAlert';

// Hooks
export { useTelemetryData, useHistoricalTelemetryData, useAlerts } from './hooks/useTelemetry';

// Services
export * from './services/telemetryService';

// Utils
export * from './utils/telemetryHelpers';

// Constants
export * from './constants/telemetryMetrics';
