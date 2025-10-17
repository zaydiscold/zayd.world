import * as THREE from 'three';

const WATER_COLOR = 0x101832;
const GRID_COLOR = 0x1f2a4f;

export class Globe {
  constructor({ radius = 2, locations = [] } = {}) {
    this.radius = radius;
    this.locations = locations;
    this.group = new THREE.Group();
    this.group.name = 'GlobeGroup';

    this.createPlanet();
    this.addGuides();
    this.addAtmosphere();
  }

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

  generateGlobeTexture(activeLocation = null) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f1734');
    gradient.addColorStop(0.5, '#101f45');
    gradient.addColorStop(1, '#0a1124');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.locations.forEach((location) => {
      const color = location.themeColor ?? '#3a78ff';
      this.paintSegment(ctx, location.startAngleDeg, location.endAngleDeg, {
        base: color,
        glow: location.accentColor ?? '#fff',
        emphasize: activeLocation?.id === location.id,
      });
    });

    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#9acbff';
    for (let lat = 1; lat < 6; lat += 1) {
      const y = (canvas.height / 6) * lat;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, canvas.height * 0.45, canvas.width, canvas.height * 0.1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

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
