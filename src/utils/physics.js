const TWO_PI = Math.PI * 2;

const normalizeAngle = (angle) => {
  let result = angle % TWO_PI;
  if (result < -Math.PI) result += TWO_PI;
  if (result > Math.PI) result -= TWO_PI;
  return result;
};

export function dampAngle(current, target, smoothing, delta) {
  const difference = normalizeAngle(target - current);
  return current + difference * (1 - Math.exp(-smoothing * delta));
}
