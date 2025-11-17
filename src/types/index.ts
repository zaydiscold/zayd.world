/**
 * Type definitions for the Zayd.world interactive portfolio.
 *
 * This module provides TypeScript interfaces for all data entities used throughout
 * the application, ensuring type safety and clear contracts between components.
 *
 * ## Usage in JavaScript files
 *
 * Even though this project uses JavaScript, you can leverage these types using JSDoc:
 *
 * ```javascript
 * // Import types in JSDoc comments
 * /**
 *  * @param {import('./types').Location} location
 *  *\/
 * function handleLocation(location) {
 *   // TypeScript will validate location.themeColor exists
 * }
 * ```
 *
 * ## Main Exports
 *
 * - `Location`: Portfolio section data (about, projects, labs, contact)
 * - `Zone`: Internal location with radian conversions
 * - `UIAction`: Clickable button configuration
 *
 * @module types
 */

export type { Location, Zone } from './Location.js';
export type { UIAction } from './UIAction.js';
