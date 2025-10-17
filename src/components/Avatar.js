import * as THREE from 'three';

export class Avatar {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'AvatarRoot';

    this.materials = this.createMaterials();
    this.buildAvatar();
    this.timeAccumulator = 0;
  }

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

  update(delta, parent) {
    if (!parent) return;
    this.timeAccumulator += delta;

    const bobAmount = Math.sin(this.timeAccumulator * 4) * 0.05;
    const tiltAmount = Math.sin(this.timeAccumulator * 2) * 0.1;

    this.group.position.set(0, parent.position.y + 2.05 + bobAmount, 0);
    this.group.rotation.y = parent.rotation.y * -1;
    this.core.rotation.z = tiltAmount;
  }

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
