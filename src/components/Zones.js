const TWO_PI = Math.PI * 2;

export class Zones {
  constructor(zones = []) {
    this.zones = zones.map((zone) => ({
      ...zone,
      startRad: (zone.startAngleDeg * Math.PI) / 180,
      endRad: (zone.endAngleDeg * Math.PI) / 180,
    }));
  }

  getActiveZone(rotationY) {
    if (!this.zones.length) return null;

    const normalized = ((rotationY % TWO_PI) + TWO_PI) % TWO_PI;

    return (
      this.zones.find((zone) => this.isWithinZone(normalized, zone)) ??
      this.zones[0]
    );
  }

  isWithinZone(angle, zone) {
    if (zone.startRad <= zone.endRad) {
      return angle >= zone.startRad && angle < zone.endRad;
    }

    // Wrapped zone (crosses 360° boundary)
    return angle >= zone.startRad || angle < zone.endRad;
  }
}
