/**
 * @fileoverview A simple logger service for the application.
 * This is the foundational implementation of the "Monitoring Body" core dimension.
 * It provides a centralized logging interface that can be expanded in the future.
 */

const logger = {
  /**
   * Logs informational messages.
   * @param message The main message to log.
   * @param context Optional additional data to log.
   */
  info: (message: string, ...context: unknown[]) => {
    console.log(`[INFO] ${message}`, ...context);
  },

  /**
   * Logs warning messages.
   * @param message The warning message to log.
   * @param context Optional additional data to log.
   */
  warn: (message: string, ...context: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...context);
  },

  /**
   * Logs error messages.
   * @param message The error message to log.
   * @param context Optional additional data, including an Error object.
   */
  error: (message: string, ...context: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...context);
  },
};

export default logger;
