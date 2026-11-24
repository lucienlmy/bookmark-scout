/**
 * What quick save passes between the background, the notification it injects into a tab, the
 * popup, and the AI host page. No dependencies, so the notification script injected into pages
 * stays small; the schemas that check incoming messages are in `quick-save-validation.ts`.
 */

/** Message `type`s, namespaced so they never match another feature's messages. */
export const QUICK_SAVE_MESSAGE = {
  /** The notification or the popup asks the background to act on the last quick save. */
  action: 'quick-save/action',
  /**
   * The background asks the AI host page for folder suggestions, page text, a page head, or the
   * readable text of a page it downloaded.
   */
  hostGenerate: 'quick-save/ai-host-generate',
  hostReadPage: 'quick-save/ai-host-read-page',
  hostReadHead: 'quick-save/ai-host-read-head',
  hostReadText: 'quick-save/ai-host-read-text',
  /** The AI host page asks the background to send one provider request for it. */
  hostFetch: 'quick-save/ai-host-fetch',
  /** The AI host page reports a call to the built-in model for the AI activity log. */
  hostActivity: 'quick-save/ai-host-activity',
  /** The AI host page's warm built-in session went idle, so the page can close. */
  hostIdle: 'quick-save/ai-host-idle',
} as const;

/**
 * What the notification says. `expired` is only ever shown, never stored: a newer quick save
 * replaced the one an older notification belongs to, so its buttons no longer act.
 */
export type QuickSaveStatus = 'saving' | 'saved' | 'duplicate' | 'failed' | 'removed' | 'expired';

export type QuickSaveTheme = 'light' | 'dark' | 'system';

/** Why the AI host page could not complete a call, when the reason changes what comes next. */
export type AIHostErrorKind = 'answer' | 'keyRequired';

/** Buttons the notification can show; each is also an action message the background answers. */
export const QUICK_SAVE_TOAST_ACTIONS = [
  'undo',
  // Opens the bookmark manager with the edit dialog for the just-saved bookmark.
  'edit',
  // Removes the cover Save a Cover With Quick Save stored, keeping the bookmark.
  'removeCover',
  'openAISettings',
  'retry',
  'saveWithoutAI',
] as const;

export type QuickSaveToastActionId = (typeof QUICK_SAVE_TOAST_ACTIONS)[number];
