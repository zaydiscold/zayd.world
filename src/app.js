import * as THREE from 'three';
import { Globe } from './components/Globe.js';
import { Avatar } from './components/Avatar.js';
import { Zones } from './components/Zones.js';
import { Controls } from './components/Controls.js';
import { createUIOverlay } from './components/UI.js';
import { getLocations } from './services/locationService.js';
import { dampAngle } from './utils/physics.js';
import { loadInitialAssets } from './utils/loader.js';

/**
 * Main application class managing the 3D globe experience.
 *
 * Orchestrates:
 * - Three.js scene setup (renderer, camera, lights)
 * - Component lifecycle (Globe, Avatar, Zones, Controls, UI)
 * - Data loading from location service
 * - Animation loop and zone detection
 * - Error handling and loading states
 *
 * @example
 * ```javascript
 * const app = new App();
 * await app.init(); // Loads data and starts rendering
 * ```
 */
export class App {
  /**
   * Creates a new App instance.
   * Initializes Three.js scene and components (without data).
   * Call init() to load data and start rendering.
   *
   * @param {HTMLElement} [container=document.getElementById('app')] - Container element
   * @throws {Error} If container element is not found
   */
  constructor(container = document.getElementById('app')) {
    if (!container) {
      throw new Error('App container #app not found');
    }
    this.container = container;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 1, 6);

    // Components (will be initialized with data in init())
    this.globe = null;
    this.avatar = new Avatar();
    this.zones = null;
    this.controls = new Controls();
    this.ui = null;

    this.currentRotation = 0;
    this.targetRotation = 0;
    this.currentZone = null;

    this._boundResize = this.handleResize.bind(this);
    this._boundLoop = this.loop.bind(this);
  }

  /**
   * Initializes the application with async data loading.
   *
   * Steps:
   * 1. Create UI overlay
   * 2. Show loading state
   * 3. Fetch location data from service
   * 4. Initialize Globe and Zones with data
   * 5. Setup scene graph and controls
   * 6. Set initial active zone
   * 7. Start animation loop
   *
   * @throws {Error} If location data fails to load
   * @public
   */
  async init() {
    // Setup UI first (for loading/error display)
    this.ui = createUIOverlay();

    try {
      // Show loading state
      this.ui.showLoading(true);

      // Fetch location data from service (future: real API call)
      const locations = await getLocations();

      // Validate data
      if (!locations || locations.length === 0) {
        throw new Error('No locations data available');
      }

      // Initialize data-dependent components
      this.globe = new Globe({ locations });
      this.zones = new Zones(locations);

      // Build scene graph
      this.container.appendChild(this.renderer.domElement);
      this.scene.add(this.globe.group);
      this.globe.group.add(this.avatar.group);

      this.addLights();
      this.handleResize(window.innerWidth, window.innerHeight);
      window.addEventListener('resize', this._boundResize);

      // Attach input controls
      this.controls.attach({
        onRotate: (delta) => {
          this.targetRotation += delta;
        },
      });

      // Load any additional assets (textures, models, etc.)
      await loadInitialAssets();

      // Set initial active zone
      const initialZone = this.zones.getActiveZone(this.currentRotation);
      if (initialZone) {
        this.currentZone = initialZone;
        this.globe.setActiveLocation(initialZone);
        this.avatar.setPalette(initialZone.themeColor, initialZone.accentColor);
        this.ui?.setZone(initialZone);
      }

      // Hide loading, start rendering
      this.ui.showLoading(false);
      this.loop();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.ui.showLoading(false);
      this.ui.showError(
        'Failed to load content. Please refresh the page or try again later.'
      );
      throw error; // Re-throw for debugging
    }
  }

  addLights() {
    const hemi = new THREE.HemisphereLight(0xaecbff, 0x1e2431, 1.1);
    hemi.position.set(0, 1, 0);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xf0f4ff, 1.2);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6287ff, 0.4);
    rimLight.position.set(-4, 2, -3);
    this.scene.add(rimLight);
  }

  /**
   * Main animation loop (called every frame via requestAnimationFrame).
   *
   * Updates:
   * - Control inputs
   * - Globe rotation (with damping)
   * - Avatar animation
   * - Active zone detection
   * - Scene rendering
   *
   * @private
   */
  loop() {
    const delta = this.clock.getDelta();
    this.controls.update(delta);

    // Skip rendering if components aren't initialized yet
    if (!this.globe || !this.zones) {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this._boundLoop);
      return;
    }

    this.currentRotation = dampAngle(
      this.currentRotation,
      this.targetRotation,
      8,
      delta
    );

    this.globe.group.rotation.y = this.currentRotation;
    this.avatar.update(delta, this.globe.group);

    const activeZone = this.zones.getActiveZone(this.currentRotation);
    if (activeZone?.id !== this.currentZone?.id) {
      this.currentZone = activeZone;
      this.globe.setActiveLocation(activeZone);
      this.avatar.setPalette(activeZone.themeColor, activeZone.accentColor);
      this.ui?.setZone(activeZone);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._boundLoop);
  }

  handleResize(width = window.innerWidth, height = window.innerHeight) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
