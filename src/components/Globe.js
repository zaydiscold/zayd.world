import * as THREE from 'three';

/**
 * @typedef {import('../types').Location} Location
 */

const WATER_COLOR = 0x101832;
const GRID_COLOR = 0x1f2a4f;

/**
 * Interactive 3D globe component that visualizes portfolio sections as colored zones.
 *
 * The globe procedurally generates a textured sphere with:
 * - Dynamic location-based color segments
 * - Wireframe guide lines (latitude/longitude grid)
 * - Glowing atmosphere that adapts to the active zone
 *
 * As the globe rotates, different location zones become active, triggering
 * texture regeneration and atmosphere color transitions.
 *
 * @example
 * ```javascript
 * const globe = new Globe({
 *   radius: 2,
 *   locations: [
 *     { id: 'projects', themeColor: '#6ad7ff', startAngleDeg: 45, endAngleDeg: 150, ... }
 *   ]
 * });
 * scene.add(globe.group);
 * globe.setActiveLocation(locations[0]); // Updates visuals
 * ```
 */
export class Globe {
  /**
   * Creates a new interactive globe with location-based zones.
   *
   * @param {Object} options - Configuration options
   * @param {number} [options.radius=2] - Sphere radius in Three.js units
   * @param {Location[]} [options.locations=[]] - Array of location zones to visualize
   */
  constructor({ radius = 2, locations = [] } = {}) {
    this.radius = radius;
    this.locations = locations;
    this.group = new THREE.Group();
    this.group.name = 'GlobeGroup';

    this.createPlanet();
    this.addGuides();
    this.addAtmosphere();
  }

  /**
   * Creates the main planet sphere mesh with a procedurally generated texture.
   * Uses PBR material properties (metalness, roughness) for realistic rendering.
   *
   * @private
   */
  createPlanet() {
    const geometry = new THREE.SphereGeometry(this.radius, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: WATER_COLOR,
      metalness: 0.1,
      roughness: 0.65,
      emissive: 0x0a1024,
      emissiveIntensity: 0.25,
      map: this.generateGlobeTexture(),
    });

    this.planetMesh = new THREE.Mesh(geometry, material);
    this.planetMesh.castShadow = true;
    this.planetMesh.receiveShadow = true;
    this.planetMesh.name = 'GlobeMesh';
    this.group.add(this.planetMesh);
  }

  /**
   * Adds wireframe guide lines to the globe (latitude/longitude grid).
   * Creates a subtle visual structure with semi-transparent lines.
   *
   * @private
   */
  addGuides() {
    const guideMaterial = new THREE.LineBasicMaterial({
      color: GRID_COLOR,
      transparent: true,
      opacity: 0.25,
    });

    const meridianGeometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(this.radius * 1.01, 24, 12)
    );

    const guides = new THREE.LineSegments(meridianGeometry, guideMaterial);
    guides.name = 'GlobeGuides';
    this.group.add(guides);
  }

  /**
   * Adds a glowing atmosphere shell around the planet.
   * Uses additive blending and back-side rendering for a halo effect.
   * Color adapts to the active location's theme.
   *
   * @private
   */
  addAtmosphere() {
    const atmosphereGeometry = new THREE.SphereGeometry(
      this.radius * 1.05,
      48,
      48
    );
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4c6fff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.name = 'GlobeAtmosphere';
    this.group.add(atmosphere);
    this.atmosphere = atmosphere;
  }

  /**
   * Updates the globe's visuals when a new location becomes active.
   *
   * Triggers:
   * - Atmosphere color transition (lerp to new theme color)
   * - Texture regeneration with emphasized active zone
   *
   * @param {Location | null} location - The newly active location zone
   * @public
   */
  setActiveLocation(location) {
    if (!location) return;

    if (this.atmosphere) {
      this.atmosphere.material.color.lerp(
        new THREE.Color(location.themeColor),
        0.35
      );
    }

    if (this.planetMesh?.material?.map) {
      this.planetMesh.material.map.dispose();
      this.planetMesh.material.map = this.generateGlobeTexture(location);
      this.planetMesh.material.needsUpdate = true;
    }
  }

  /**
   * Procedurally generates a canvas-based texture for the globe surface.
   *
   * The texture features:
   * - Vertical gradient background (dark blue tones)
   * - Colored segments for each location zone
   * - Horizontal latitude lines for visual interest
   * - Equatorial band highlight
   * - Active location emphasis (brighter/more opaque)
   *
   * @param {Location | null} [activeLocation=null] - Currently active zone to emphasize
   * @returns {THREE.CanvasTexture} Generated texture ready for material.map
   * @private
   */
  generateGlobeTexture(activeLocation = null) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base gradient background (ocean/space tones)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f1734');
    gradient.addColorStop(0.5, '#101f45');
    gradient.addColorStop(1, '#0a1124');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Paint each location as a colored segment
    this.locations.forEach((location) => {
      const color = location.themeColor ?? '#3a78ff';
      this.paintSegment(ctx, location.startAngleDeg, location.endAngleDeg, {
        base: color,
        glow: location.accentColor ?? '#fff',
        emphasize: activeLocation?.id === location.id,
      });
    });

    // Add latitude grid lines
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#9acbff';
    for (let lat = 1; lat < 6; lat += 1) {
      const y = (canvas.height / 6) * lat;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Equatorial highlight band
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, canvas.height * 0.45, canvas.width, canvas.height * 0.1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Paints a colored vertical band on the canvas texture representing a location zone.
   *
   * Handles angle wrapping across 0° and applies layered gradients for visual depth.
   * The active zone is rendered brighter and more opaque.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D drawing context
   * @param {number} startDeg - Zone start angle in degrees
   * @param {number} endDeg - Zone end angle in degrees
   * @param {Object} colors - Color configuration
   * @param {string} colors.base - Primary zone color (hex)
   * @param {string} colors.glow - Accent/glow color (hex)
   * @param {boolean} colors.emphasize - Whether this is the active zone
   * @private
   */
  paintSegment(ctx, startDeg, endDeg, { base, glow, emphasize }) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const normalize = (deg) => ((deg % 360) + 360) % 360;

    let startX = (normalize(startDeg) / 360) * width;
    let endX = (normalize(endDeg) / 360) * width;

    const drawBand = (x1, x2) => {
      const bandWidth = ((x2 - x1 + width) % width) || width;
      ctx.save();
      ctx.fillStyle = base;
      ctx.globalAlpha = emphasize ? 0.9 : 0.65;
      ctx.fillRect(x1, height * 0.3, bandWidth, height * 0.4);

      const bandGradient = ctx.createLinearGradient(x1, 0, x1, height);
      bandGradient.addColorStop(0, `${glow}22`);
      bandGradient.addColorStop(0.5, `${glow}55`);
      bandGradient.addColorStop(1, `${glow}11`);
      ctx.fillStyle = bandGradient;
      ctx.globalAlpha = emphasize ? 0.8 : 0.4;
      ctx.fillRect(x1, height * 0.28, bandWidth, height * 0.44);

      ctx.restore();
    };

    if (startX <= endX) {
      drawBand(startX, endX);
    } else {
      drawBand(startX, width);
      drawBand(0, endX);
    }
  }
}
