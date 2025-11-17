/**
 * Represents a clickable action button in the UI overlay.
 * These are the interactive elements displayed when a location zone is active.
 *
 * @example
 * ```typescript
 * const action: UIAction = {
 *   label: 'View Projects',
 *   href: '#projects',
 *   target: '_self'
 * };
 * ```
 */
export interface UIAction {
  /**
   * The text displayed on the button
   * @example "View featured work"
   */
  label: string;

  /**
   * The URL or anchor link the button navigates to
   * @example "#projects" | "https://example.com"
   */
  href: string;

  /**
   * Where to open the link (optional)
   * - '_self': Opens in same tab (default for # anchors)
   * - '_blank': Opens in new tab (default for external URLs)
   */
  target?: '_self' | '_blank';
}
