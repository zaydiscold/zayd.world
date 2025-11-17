import type { UIAction } from './UIAction.js';

/**
 * Represents a geographic zone on the interactive globe.
 * Each location corresponds to a section of the portfolio (About, Projects, Labs, Contact).
 *
 * When the globe rotates into a location's angle range, it becomes the active zone,
 * triggering visual updates to the globe texture, atmosphere color, avatar palette,
 * and UI overlay content.
 *
 * @example
 * ```typescript
 * const projectsLocation: Location = {
 *   id: 'projects',
 *   label: 'Launch Deck',
 *   tagline: 'Interactive builds and installations',
 *   description: 'From immersive web experiments to production features...',
 *   startAngleDeg: 45,
 *   endAngleDeg: 150,
 *   themeColor: '#6ad7ff',
 *   accentColor: '#12376a',
 *   actions: [
 *     { label: 'View featured work', href: '#projects' }
 *   ]
 * };
 * ```
 */
export interface Location {
  /**
   * Unique identifier for this location
   * Used for zone detection and comparison
   * @example "projects" | "about" | "labs" | "contact"
   */
  id: string;

  /**
   * Display name shown in the UI overlay header
   * @example "Launch Deck" | "Mission Brief"
   */
  label: string;

  /**
   * Short one-liner description
   * Displayed as a subtitle in the UI overlay
   * @example "Interactive builds, installations, and client work ready for lift-off."
   */
  tagline: string;

  /**
   * Full description paragraph
   * Provides context about this section of the portfolio
   * @example "From immersive web experiments to production-grade product features..."
   */
  description: string;

  /**
   * Starting angle of this zone in degrees (0-360)
   * The globe's Y-axis rotation is compared against this range
   * @example 45 (zone starts at 45° rotation)
   */
  startAngleDeg: number;

  /**
   * Ending angle of this zone in degrees (0-360)
   * Must be greater than startAngleDeg (no wrapping across 0°)
   * @example 150 (zone ends at 150° rotation)
   */
  endAngleDeg: number;

  /**
   * Primary theme color for this location (hex format)
   * Applied to:
   * - Globe texture segment
   * - Atmosphere glow
   * - Avatar color palette
   * - UI border accent
   * @example "#6ad7ff" (cyan blue)
   */
  themeColor: string;

  /**
   * Secondary accent color (hex format)
   * Used for:
   * - Globe segment glow effects
   * - Avatar secondary colors
   * @example "#12376a" (dark blue)
   */
  accentColor: string;

  /**
   * Array of clickable action buttons
   * Displayed in the UI overlay when this location is active
   * Can be empty if no actions are needed
   */
  actions: UIAction[];
}

/**
 * Extended location data with computed radian values.
 * Used internally by the Zones detection system for angle comparisons.
 *
 * @internal
 */
export interface Zone extends Location {
  /**
   * Starting angle in radians (converted from startAngleDeg)
   */
  startRad: number;

  /**
   * Ending angle in radians (converted from endAngleDeg)
   */
  endRad: number;
}
