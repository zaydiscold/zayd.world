const ROTATION_SPEED = 1.4; // radians per second
const DRAG_SENSITIVITY = 0.005;

export class Controls {
  constructor() {
    this.direction = 0;
    this.dragging = false;
    this.previousPointerX = 0;
    this.callbacks = {
      onRotate: () => {},
    };
  }

  attach(callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  }

  detach() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }

  handleKeyDown = (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.direction = -1;
    }
    if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.direction = 1;
    }
  };

  handleKeyUp = (event) => {
    if (
      (event.code === 'ArrowLeft' || event.code === 'KeyA') &&
      this.direction === -1
    ) {
      this.direction = 0;
    }
    if (
      (event.code === 'ArrowRight' || event.code === 'KeyD') &&
      this.direction === 1
    ) {
      this.direction = 0;
    }
  };

  handlePointerDown = (event) => {
    this.dragging = true;
    this.previousPointerX = event.clientX;
  };

  handlePointerMove = (event) => {
    if (!this.dragging) return;
    const deltaX = event.clientX - this.previousPointerX;
    this.previousPointerX = event.clientX;
    this.callbacks.onRotate(deltaX * DRAG_SENSITIVITY);
  };

  handlePointerUp = () => {
    this.dragging = false;
  };

  update(delta) {
    if (!this.direction) return;
    this.callbacks.onRotate(this.direction * ROTATION_SPEED * delta);
  }
}
