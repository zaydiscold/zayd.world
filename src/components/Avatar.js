import * as THREE from 'three';

/**
 * Procedurally generated 3D character avatar that stands on the globe.
 *
 * Features:
 * - Custom geometry (capsules, spheres, cylinders)
 * - PBR materials with theme-responsive colors
 * - Procedural face texture (canvas-based)
 * - Idle animation (bobbing + swaying)
 * - Dynamic color palette based on active location
 *
 * The avatar rotates counter to the globe so it always faces forward,
 * creating the illusion of walking around the planet.
 *
 * @example
 * ```javascript
 * const avatar = new Avatar();
 * scene.add(avatar.group);
 * avatar.update(deltaTime, globeGroup);
 * avatar.setPalette('#6ad7ff', '#12376a'); // Update colors
 * ```
 */
export class Avatar {
  /**
   * Creates a new procedural 3D character.
   * Builds geometry and materials, ready to be added to the scene.
   */
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'AvatarRoot';

    this.materials = this.createMaterials();
    this.buildAvatar();
    this.timeAccumulator = 0;
  }

  /**
   * Creates PBR material palette for the avatar's body parts.
   * Materials are stored as instance properties for dynamic color updates.
   *
   * @returns {Object} Material dictionary
   * @returns {THREE.MeshStandardMaterial} return.suit - Main body/arms (theme-responsive)
   * @returns {THREE.MeshStandardMaterial} return.trim - Belt/legs accent (theme-responsive)
   * @returns {THREE.MeshStandardMaterial} return.skin - Head/face (static)
   * @returns {THREE.MeshStandardMaterial} return.hair - Hair cap (theme-responsive)
   * @returns {THREE.MeshStandardMaterial} return.boots - Footwear (static)
   * @private
   */
  createMaterials() {
    return {
      suit: new THREE.MeshStandardMaterial({
        color: 0x3d68ff,
        metalness: 0.15,
        roughness: 0.42,
      }),
      trim: new THREE.MeshStandardMaterial({
        color: 0x13204c,
        roughness: 0.6,
        metalness: 0.05,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: 0xffddc8,
        roughness: 0.85,
        metalness: 0,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: 0x1f2745,
        roughness: 0.5,
        metalness: 0.1,
      }),
      boots: new THREE.MeshStandardMaterial({
        color: 0x0d1226,
        roughness: 0.7,
        metalness: 0.05,
      }),
    };
  }

  /**
   * Constructs the avatar's 3D geometry hierarchy.
   *
   * Geometry breakdown:
   * - Torso: Capsule (body mass)
   * - Belt: Torus (waist accent)
   * - Head: Sphere (skull)
   * - Hair: Hemisphere (hair cap)
   * - Face: Plane with procedural texture
   * - Legs: 2x Capsules
   * - Boots: 2x Cylinders
   * - Arms: 2x Capsules
   *
   * All meshes are parented to `this.core` for animation transforms.
   *
   * @private
   */
  buildAvatar() {
    this.core = new THREE.Group();
    this.core.name = 'AvatarCore';

    const torso = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.27, 0.78, 14, 28),
      this.materials.suit
    );
    torso.position.y = 1.55;
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.core.add(torso);

    const belt = new THREE.Mesh(
      new THREE.TorusGeometry(0.27, 0.06, 12, 24),
      this.materials.trim
    );
    belt.rotation.x = Math.PI / 2;
    belt.position.y = torso.position.y - 0.2;
    this.core.add(belt);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 24, 24),
      this.materials.skin
    );
    head.position.y = 2.3;
    head.castShadow = true;
    this.core.add(head);

    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      this.materials.hair
    );
    hair.position.y = 2.35;
    hair.scale.y = 0.85;
    hair.castShadow = true;
    this.core.add(hair);

    const facePlate = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.55),
      new THREE.MeshBasicMaterial({
        map: this.createFaceTexture(),
        transparent: true,
        depthWrite: false,
      })
    );
    facePlate.position.set(0, 2.28, 0.31);
    this.core.add(facePlate);

    const legGeometry = new THREE.CapsuleGeometry(0.16, 0.6, 12, 24);
    const leftLeg = new THREE.Mesh(legGeometry, this.materials.trim);
    leftLeg.position.set(-0.17, 0.85, 0);
    leftLeg.castShadow = true;
    this.core.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.x *= -1;
    this.core.add(rightLeg);

    const bootGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.25, 16);
    const leftBoot = new THREE.Mesh(bootGeometry, this.materials.boots);
    leftBoot.position.set(-0.17, 0.55, 0);
    leftBoot.castShadow = true;
    this.core.add(leftBoot);

    const rightBoot = leftBoot.clone();
    rightBoot.position.x *= -1;
    this.core.add(rightBoot);

    const armGeometry = new THREE.CapsuleGeometry(0.12, 0.5, 12, 18);
    const leftArm = new THREE.Mesh(armGeometry, this.materials.suit);
    leftArm.position.set(-0.42, 1.75, 0);
    leftArm.rotation.z = Math.PI / 8;
    leftArm.castShadow = true;
    this.core.add(leftArm);

    const rightArm = leftArm.clone();
    rightArm.position.x *= -1;
    rightArm.rotation.z *= -1;
    this.core.add(rightArm);

    this.group.add(this.core);
  }

  /**
   * Procedurally generates a simple face texture on a canvas.
   *
   * Features:
   * - Two eyes (filled circles with highlights)
   * - Smile (quadratic curve)
   *
   * The texture is applied to a plane mesh positioned in front of the head sphere.
   *
   * @returns {THREE.CanvasTexture} Face texture with transparency
   * @private
   */
  createFaceTexture() {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff7ec';
    ctx.fillRect(0, 0, size, size);

    const drawEye = (x, y) => {
      ctx.beginPath();
      ctx.fillStyle = '#2e2b3f';
      ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(x - size * 0.02, y - size * 0.02, size * 0.03, 0, Math.PI * 2);
      ctx.fill();
    };

    drawEye(size * 0.35, size * 0.45);
    drawEye(size * 0.65, size * 0.45);

    ctx.strokeStyle = '#2e2b3f';
    ctx.lineWidth = size * 0.02;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(size * 0.4, size * 0.62);
    ctx.quadraticCurveTo(size * 0.5, size * 0.72, size * 0.6, size * 0.62);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Updates the avatar's position and idle animation each frame.
   *
   * Animation effects:
   * - Vertical bobbing (sine wave, frequency 4 Hz)
   * - Sideways swaying/tilting (sine wave, frequency 2 Hz)
   * - Counter-rotation to parent (always faces camera)
   *
   * The avatar is positioned relative to the globe's Y position,
   * standing on top of it.
   *
   * @param {number} delta - Time elapsed since last frame (seconds)
   * @param {THREE.Object3D} parent - Parent object (globe group) for position reference
   * @public
   */
  update(delta, parent) {
    if (!parent) return;
    this.timeAccumulator += delta;

    const bobAmount = Math.sin(this.timeAccumulator * 4) * 0.05;
    const tiltAmount = Math.sin(this.timeAccumulator * 2) * 0.1;

    this.group.position.set(0, parent.position.y + 2.05 + bobAmount, 0);
    this.group.rotation.y = parent.rotation.y * -1;
    this.core.rotation.z = tiltAmount;
  }

  /**
   * Updates the avatar's color palette to match the active location theme.
   *
   * Color mapping:
   * - Primary color → Suit + Hair (darkened)
   * - Accent color → Belt/Trim + Legs
   *
   * Uses color lerping for smooth transitions (not instant jumps).
   *
   * @param {string} primaryHex - Primary theme color (hex format, e.g., "#6ad7ff")
   * @param {string} accentHex - Accent theme color (hex format, e.g., "#12376a")
   * @public
   */
  setPalette(primaryHex, accentHex) {
    if (primaryHex) {
      const color = new THREE.Color(primaryHex);
      this.materials.suit.color.lerp(color, 0.7);
      this.materials.hair.color.lerp(color.clone().multiplyScalar(0.5), 0.5);
    }

    if (accentHex) {
      const accent = new THREE.Color(accentHex);
      this.materials.trim.color.lerp(accent, 0.7);
    }
  }
}
