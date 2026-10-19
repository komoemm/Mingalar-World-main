import { getLanguage, onLanguageChange } from './i18n.js';

const stacks = {
  en: 'Fredoka, "Trebuchet MS", Arial, sans-serif',
  my: '"VW Myanmar", "Myanmar Text", "Noto Sans Myanmar", sans-serif',
  ja: '"VW Japanese", "Yu Gothic", Meiryo, sans-serif',
};
export const fontStack = () => stacks[getLanguage()];
const listeners = new Set(), requests = new Map();
export const fontStatus = {};
export const onFontsReady = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export function loadLanguageFont(locale = getLanguage()) {
  if (requests.has(locale)) return requests.get(locale);
  const family = { en: 'Fredoka', my: 'VW Myanmar', ja: 'VW Japanese' }[locale];
  // Dependencies evaluate before Vite injects the entry stylesheet in development.
  // Defer once so faces exist before caching their load request.
  const request = new Promise(resolve => setTimeout(resolve, 0)).then(() => document.fonts.load(`600 24px "${family}"`)).then(faces => {
    fontStatus[locale] = faces.length ? 'loaded' : 'fallback';
    // Redraw current text, never the locale captured by an older request.
    for (const fn of listeners) fn();
  }).catch(() => { fontStatus[locale] = 'fallback'; for (const fn of listeners) fn(); });
  requests.set(locale, request); return request;
}
export async function waitForInitialFont() {
  await Promise.race([loadLanguageFont(), new Promise(resolve => setTimeout(resolve, 1800))]);
}
onLanguageChange(locale => { void loadLanguageFont(locale); });
// Fixed language names are present on every selector.
void loadLanguageFont('my'); void loadLanguageFont('ja'); void loadLanguageFont('en');
