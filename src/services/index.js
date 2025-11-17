/**
 * Service layer for data fetching and business logic.
 *
 * This module provides a clean abstraction between UI components
 * and data sources (currently mock data, future: real APIs).
 *
 * ## Benefits
 * - Single point of change when adding backend
 * - Consistent async API across the app
 * - Easy to mock for testing
 * - Separation of concerns (UI vs data)
 *
 * @module services
 */

export { getLocations, getLocationById, validateLocation } from './locationService.js';
