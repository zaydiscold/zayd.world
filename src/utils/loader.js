import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const cache = new Map();

export async function loadInitialAssets() {
  // Placeholder for future asset preloading.
  return Promise.resolve();
}

export function loadTexture(path) {
  if (cache.has(path)) return cache.get(path);

  const promise = new Promise((resolve, reject) => {
    textureLoader.load(
      path,
      (texture) => {
        cache.set(path, texture);
        resolve(texture);
      },
      undefined,
      reject
    );
  });

  cache.set(path, promise);
  return promise;
}
