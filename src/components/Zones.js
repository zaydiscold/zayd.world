/**
 * @typedef {import('../types').Location} Location
 * @typedef {import('../types').Zone} Zone
 */

const TWO_PI = Math.PI * 2;

/**
 * Zone detection system that maps globe rotation angles to portfolio locations.
 *
 * Converts location degree ranges to radians and provides efficient lookups
 * to determine which location zone is currently active based on the globe's
 * Y-axis rotation.
 *
 * Handles edge cases like:
 * - Angle normalization (wrapping around 2π)
 * - Zones that cross the 0°/360° boundary
 * - Fallback to first zone if no match
 *
 * @example
 * ```javascript
 * const zones = new Zones([
 *   { id: 'projects', startAngleDeg: 45, endAngleDeg: 150, ... }
 * ]);
 * const active = zones.getActiveZone(globeRotationY); // Returns matching zone
 * ```
 */
export class Zones {
  /**
   * Creates a zone detection system from location data.
   * Converts degree angles to radians for efficient runtime comparisons.
   *
   * @param {Location[]} [zones=[]] - Array of location objects with angle ranges
   */
  constructor(zones = []) {
    this.zones = zones.map((zone) => ({
      ...zone,
      startRad: (zone.startAngleDeg * Math.PI) / 180,
      endRad: (zone.endAngleDeg * Math.PI) / 180,
    }));
  }

  /**
   * Determines which location zone is active for a given globe rotation.
   *
   * Algorithm:
   * 1. Normalize rotation angle to 0-2π range
   * 2. Find first zone containing this angle
   * 3. Fallback to first zone if no match (defensive)
   *
   * @param {number} rotationY - Current Y-axis rotation of the globe (radians)
   * @returns {Zone | null} The active zone object, or null if no zones exist
   * @public
   */
  getActiveZone(rotationY) {
    if (!this.zones.length) return null;

    const normalized = ((rotationY % TWO_PI) + TWO_PI) % TWO_PI;

    return (
      this.zones.find((zone) => this.isWithinZone(normalized, zone)) ??
      this.zones[0]
    );
  }

  /**
   * Checks if a given angle falls within a zone's angle range.
   *
   * Handles two cases:
   * - Normal zones: startRad < endRad (e.g., 45° to 150°)
   * - Wrapped zones: startRad > endRad (e.g., 300° to 60°, crosses 0°)
   *
   * @param {number} angle - Normalized angle in radians (0 to 2π)
   * @param {Zone} zone - Zone object with startRad and endRad properties
   * @returns {boolean} True if angle is within the zone's range
   * @private
   */
  isWithinZone(angle, zone) {
    if (zone.startRad <= zone.endRad) {
      // Normal case: zone doesn't cross 0°
      return angle >= zone.startRad && angle < zone.endRad;
    }

    // Wrapped zone: crosses 360°/0° boundary
    return angle >= zone.startRad || angle < zone.endRad;
  }
}
