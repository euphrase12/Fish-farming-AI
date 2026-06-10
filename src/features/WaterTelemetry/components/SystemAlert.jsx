/**
 * SystemAlert Component
 * Displays system-wide alert messages and statuses
 */

import React, { useState, useEffect } from 'react';
import { ALERT_LEVELS, ALERT_MESSAGES } from '../constants/telemetryMetrics';
import { debugLog } from '../utils/telemetryHelpers';

const SystemAlert = ({ alertLevel = ALERT_LEVELS.INFO, activeAlerts = [], onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (alertLevel === ALERT_LEVELS.CRITICAL) {
      debugLog('Alert', 'Critical alert triggered');
      // Keep critical alerts visible
      setIsVisible(true);
    }
  }, [alertLevel]);

  if (!isVisible) return null;

  const alertConfig = {
    [ALERT_LEVELS.INFO]: {
      bg: 'bg-blue-900 bg-opacity-30',
      border: 'border-blue-500',
      icon: 'ℹ️',
      textColor: 'text-blue-300',
      message: ALERT_MESSAGES.OPTIMAL,
    },
    [ALERT_LEVELS.WARNING]: {
      bg: 'bg-yellow-900 bg-opacity-30',
      border: 'border-yellow-500',
      icon: '⚠️',
      textColor: 'text-yellow-300',
      message: ALERT_MESSAGES.WARNING,
    },
    [ALERT_LEVELS.CRITICAL]: {
      bg: 'bg-red-900 bg-opacity-30',
      border: 'border-red-500',
      icon: '🚨',
      textColor: 'text-red-300',
      message: ALERT_MESSAGES.CRITICAL,
    },
  };

  const config = alertConfig[alertLevel] || alertConfig[ALERT_LEVELS.INFO];

  const handleDismiss = () => {
    debugLog('Alert', `Dismissed alert: ${alertLevel}`);
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className={`
        ${config.bg} ${config.border}
        border rounded-lg p-4 mb-4 flex items-start gap-4
        transition-all duration-300 animate-pulse
      `}
      role="alert"
      aria-live={alertLevel === ALERT_LEVELS.CRITICAL ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      <span className="text-2xl flex-shrink-0 mt-1">{config.icon}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`${config.textColor} font-semibold mb-1`}>{config.message}</p>

        {/* Active Alerts List */}
        {activeAlerts.length > 0 && (
          <ul className="text-sm text-gray-300 space-y-1 mt-2">
            {activeAlerts.slice(0, 3).map((alert, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-1">•</span>
                <span className="line-clamp-1">{alert.message || alert}</span>
              </li>
            ))}
            {activeAlerts.length > 3 && (
              <li className="text-gray-500 text-xs italic">
                +{activeAlerts.length - 3} more alerts...
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Dismiss Button */}
      {alertLevel !== ALERT_LEVELS.CRITICAL && (
        <button
          onClick={handleDismiss}
          className="
            flex-shrink-0 text-gray-400 hover:text-white
            transition-colors duration-200 p-1
          "
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SystemAlert;
