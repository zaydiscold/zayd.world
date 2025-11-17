/**
 * @typedef {import('../types').Location} Location
 */

/**
 * Creates the DOM-based UI overlay that displays location information.
 *
 * The overlay consists of:
 * - Title (location label)
 * - Tagline (short description)
 * - Body text (full description)
 * - Action buttons (links to projects/sections)
 * - Touch hint for mobile users
 *
 * All content updates dynamically when the active location changes.
 *
 * @returns {Object} UI controller with methods to update the overlay
 * @returns {Function} return.setZone - Updates overlay content for a new location
 * @returns {Function} return.showLoading - Shows/hides loading spinner
 * @returns {Function} return.showError - Displays an error message
 *
 * @example
 * ```javascript
 * const ui = createUIOverlay();
 * ui.setZone({ label: 'Projects', tagline: 'My work', ... });
 * ui.showLoading(true);
 * ui.showError('Failed to load data');
 * ```
 */
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

  // Loading spinner element (initially hidden)
  const loadingEl = document.createElement('div');
  loadingEl.className = 'ui-loading';
  loadingEl.style.display = 'none';
  loadingEl.innerHTML = '<div class="spinner"></div><p>Loading...</p>';

  // Error message element (initially hidden)
  const errorEl = document.createElement('div');
  errorEl.className = 'ui-error';
  errorEl.style.display = 'none';

  overlay.append(title, tagline, body, actions, loadingEl, errorEl);
  container.appendChild(overlay);

  const hint = document.createElement('div');
  hint.className = 'touch-hint';
  hint.textContent = 'Drag to explore';
  container.appendChild(hint);

  return {
    /**
     * Updates the overlay to display a new location's information.
     *
     * @param {Location | null} zone - The location data to display
     */
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

    /**
     * Shows or hides the loading spinner.
     *
     * @param {boolean} visible - Whether to show the loading state
     */
    showLoading(visible) {
      loadingEl.style.display = visible ? 'block' : 'none';
      title.style.display = visible ? 'none' : 'block';
      tagline.style.display = visible ? 'none' : 'block';
      body.style.display = visible ? 'none' : 'block';
      actions.style.display = visible ? 'none' : 'flex';
    },

    /**
     * Displays an error message to the user.
     *
     * @param {string | null} message - Error message to display, or null to hide
     */
    showError(message) {
      if (message) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        title.style.display = 'none';
        tagline.style.display = 'none';
        body.style.display = 'none';
        actions.style.display = 'none';
      } else {
        errorEl.style.display = 'none';
        title.style.display = 'block';
        tagline.style.display = 'block';
        body.style.display = 'block';
        actions.style.display = 'flex';
      }
    },
  };
}
