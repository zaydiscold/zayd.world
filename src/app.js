import * as THREE from 'three';
import { Globe } from './components/Globe.js';
import { Avatar } from './components/Avatar.js';
import { Zones } from './components/Zones.js';
import { Controls } from './components/Controls.js';
import { createUIOverlay } from './components/UI.js';
import locations from './locations/index.js';
import { dampAngle } from './utils/physics.js';
import { loadInitialAssets } from './utils/loader.js';

export class App {
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

    this.globe = new Globe({ locations });
    this.avatar = new Avatar();
    this.zones = new Zones(locations);
    this.controls = new Controls();
    this.ui = null;

    this.currentRotation = 0;
    this.targetRotation = 0;
    this.currentZone = null;

    this._boundResize = this.handleResize.bind(this);
    this._boundLoop = this.loop.bind(this);
  }

  async init() {
    this.container.appendChild(this.renderer.domElement);
    this.scene.add(this.globe.group);
    this.globe.group.add(this.avatar.group);

    this.addLights();
    this.handleResize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', this._boundResize);

    this.ui = createUIOverlay();

    this.controls.attach({
      onRotate: (delta) => {
        this.targetRotation += delta;
      },
    });

    await loadInitialAssets();

    const initialZone = this.zones.getActiveZone(this.currentRotation);
    if (initialZone) {
      this.currentZone = initialZone;
      this.globe.setActiveLocation(initialZone);
      this.avatar.setPalette(initialZone.themeColor, initialZone.accentColor);
      this.ui?.setZone(initialZone);
    }

    this.loop();
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

  loop() {
    const delta = this.clock.getDelta();
    this.controls.update(delta);

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
