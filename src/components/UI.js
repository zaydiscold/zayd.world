export function createUIOverlay() {
  const container = document.getElementById('app');

  const overlay = document.createElement('aside');
  overlay.className = 'ui-overlay';

  const title = document.createElement('h2');
  title.textContent = 'Zayd.world';

  const tagline = document.createElement('p');
  tagline.className = 'ui-tagline';
  tagline.textContent = 'Spin the globe to explore each chapter.';

  const body = document.createElement('p');
  body.className = 'ui-description';
  body.textContent =
    'Use arrow keys or drag to spin the globe. Each region unlocks a different part of the story.';

  const actions = document.createElement('div');
  actions.className = 'ui-actions';

  overlay.append(title, tagline, body, actions);
  container.appendChild(overlay);

  const hint = document.createElement('div');
  hint.className = 'touch-hint';
  hint.textContent = 'Drag to explore';
  container.appendChild(hint);

  return {
    setZone(zone) {
      if (!zone) return;

      title.textContent = zone.label ?? 'Zayd.world';
      tagline.textContent = zone.tagline ?? '';
      body.textContent = zone.description ?? '';

      actions.innerHTML = '';
      if (Array.isArray(zone.actions) && zone.actions.length) {
        zone.actions.forEach((action) => {
          const button = document.createElement('a');
          button.className = 'ui-action';
          button.textContent = action.label;
          button.href = action.href;
          button.target = action.href.startsWith('#') ? '_self' : '_blank';
          actions.appendChild(button);
        });
      }

      overlay.style.borderColor = zone.themeColor ?? 'transparent';
    },
  };
}
