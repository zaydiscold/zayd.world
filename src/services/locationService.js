/**
 * @typedef {import('../types').Location} Location
 */

import locations from './__mocks__/index.js';

/**
 * Location data service providing async access to portfolio zones.
 *
 * ## Current Implementation
 * Returns static mock data from the `__mocks__` directory.
 *
 * ## Future Backend Integration
 * When ready to connect to a real API:
 * 1. Replace `getLocations()` body with `fetch('/api/locations')`
 * 2. Replace `getLocationById()` with `fetch('/api/locations/:id')`
 * 3. Keep mock data in `__mocks__` for testing/development
 *
 * @example
 * ```javascript
 * // Current usage (mock data)
 * const locations = await getLocations();
 *
 * // Future usage (same API, real backend)
 * const locations = await getLocations(); // Fetches from API
 * ```
 *
 * @module services/locationService
 */

/**
 * Fetches all location/zone data for the interactive globe.
 *
 * **Current:** Returns static mock data wrapped in a resolved Promise.
 * **Future:** Will fetch from `GET /api/locations` endpoint.
 *
 * @returns {Promise<Location[]>} Array of location objects with zone data
 * @throws {Error} If data fetching fails (future: network/API errors)
 *
 * @example
 * ```javascript
 * try {
 *   const locations = await getLocations();
 *   console.log(`Loaded ${locations.length} zones`);
 * } catch (error) {
 *   console.error('Failed to load locations:', error);
 * }
 * ```
 */
export async function getLocations() {
  // CURRENT IMPLEMENTATION: Mock data (instant)
  // Simulate async behavior for consistent API
  return Promise.resolve(locations);

  // FUTURE IMPLEMENTATION: Real API
  // Uncomment when backend is ready:
  /*
  const API_BASE = import.meta.env.VITE_API_URL || 'https://api.zayd.world';
  const response = await fetch(`${API_BASE}/locations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.statusText}`);
  }

  const data = await response.json();
  return data.locations || data; // Handle different response shapes
  */
}

/**
 * Fetches a single location by its unique ID.
 *
 * **Current:** Filters mock data array.
 * **Future:** Will fetch from `GET /api/locations/:id` endpoint.
 *
 * @param {string} id - Location identifier (e.g., "projects", "about")
 * @returns {Promise<Location | null>} Location object or null if not found
 * @throws {Error} If data fetching fails (future: network/API errors)
 *
 * @example
 * ```javascript
 * const projectsZone = await getLocationById('projects');
 * if (projectsZone) {
 *   console.log(projectsZone.label); // "Launch Deck"
 * }
 * ```
 */
export async function getLocationById(id) {
  // CURRENT IMPLEMENTATION: Mock data lookup
  const allLocations = await getLocations();
  return allLocations.find((loc) => loc.id === id) || null;

  // FUTURE IMPLEMENTATION: Real API
  /*
  const API_BASE = import.meta.env.VITE_API_URL || 'https://api.zayd.world';
  const response = await fetch(`${API_BASE}/locations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) {
    return null; // Not found
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch location: ${response.statusText}`);
  }

  return response.json();
  */
}

/**
 * Validates a location object against the expected schema.
 *
 * Useful for ensuring API responses match the frontend's expectations.
 *
 * @param {any} location - Object to validate
 * @returns {boolean} True if location has all required fields
 *
 * @example
 * ```javascript
 * const apiResponse = await fetch('/api/locations/1').then(r => r.json());
 * if (!validateLocation(apiResponse)) {
 *   console.error('Invalid location data from API');
 * }
 * ```
 */
export function validateLocation(location) {
  if (!location || typeof location !== 'object') return false;

  const requiredFields = [
    'id',
    'label',
    'tagline',
    'description',
    'startAngleDeg',
    'endAngleDeg',
    'themeColor',
    'accentColor',
    'actions',
  ];

  return requiredFields.every((field) => field in location);
}
