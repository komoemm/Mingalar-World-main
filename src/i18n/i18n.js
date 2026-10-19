import { dictionaries, sourceKeys } from './translations.js';

export const LANGUAGES = Object.freeze({ my: 'မြန်မာ', en: 'English', ja: '日本語' });
export const STORAGE_KEY = 'vw-language';
export const missingTranslations = new Set();
const listeners = new Set();
export function initialLanguage(storage, browserLanguages = []) {
  try { const saved = storage?.getItem(STORAGE_KEY); if (Object.hasOwn(LANGUAGES, saved)) return saved; } catch { /* unavailable storage */ }
  for (const value of browserLanguages) { const id = value.toLowerCase().split('-')[0]; if (Object.hasOwn(LANGUAGES, id)) return id; }
  return 'en';
}
let language = 'en';
if (typeof document !== 'undefined') {
  let storage; try { storage = localStorage; } catch { /* unavailable storage */ }
  language = initialLanguage(storage, navigator.languages || [navigator.language]);
  document.documentElement.lang = language;
}
export const getLanguage = () => language;
export const onLanguageChange = (listener) => { listeners.add(listener); return () => listeners.delete(listener); };
export function setLanguage(id) {
  if (!Object.hasOwn(LANGUAGES, id)) return false;
  try { localStorage.setItem(STORAGE_KEY, id); } catch { /* unavailable storage */ }
  if (id === language) return true;
  language = id;
  if (typeof document !== 'undefined') document.documentElement.lang = id;
  for (const listener of listeners) listener(id);
  return true;
}
export function t(key, parameters = {}, locale = language) {
  const value = dictionaries[locale]?.[key];
  if (value === undefined) missingTranslations.add(`${locale}:${key}`);
  return (value ?? dictionaries.en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => String(resolve(parameters[name] ?? `{${name}}`)));
}
// Source-copy aliases are explicit dictionary entries, never a replacement of rendered HTML.
export function tr(source, parameters = {}) {
  if (source?.key) return t(source.key, source.parameters);
  const key = sourceKeys.get(source);
  if (!key) { missingTranslations.add(`source:${source}`); return source; }
  return t(key, parameters);
}
export const msg = (key, parameters = {}) => Object.freeze({ key, parameters });
export const message = (value) => sourceKeys.has(value) ? msg(sourceKeys.get(value)) : value;
export const resolve = (value) => typeof value === 'function' ? value() : value?.key ? t(value.key, value.parameters) : value;
export function localizeFields(record, fields) {
  for (const field of fields) {
    if (!record[field] || !sourceKeys.has(record[field])) continue;
    const key = sourceKeys.get(record[field]);
    Object.defineProperty(record, field, { enumerable: true, configurable: true, get: () => t(key) });
    Object.defineProperty(record, `${field}Key`, { value: key, configurable: true });
  }
  return record;
}
export function languageSelector(id) {
  const group = document.createElement('label'); group.className = 'language-control';
  const caption = document.createElement('span'); caption.dataset.languageCaption = ''; caption.textContent = t('language.label');
  const select = document.createElement('select'); select.id = id; select.dataset.languageSelector = '';
  for (const [value, name] of Object.entries(LANGUAGES)) { const option = document.createElement('option'); option.value = value; option.textContent = name; select.append(option); }
  select.value = language; select.setAttribute('aria-label', t('language.label'));
  select.addEventListener('change', () => setLanguage(select.value));
  // UI input never propagates to world gestures or game hotkeys.
  for (const event of ['pointerdown', 'pointerup', 'keydown', 'keyup']) select.addEventListener(event, e => { if (e.key !== 'Escape' && e.key !== 'Tab') e.stopPropagation(); });
  group.append(caption, select); return group;
}
onLanguageChange(() => {
  if (typeof document === 'undefined') return;
  for (const select of document.querySelectorAll('[data-language-selector]')) { select.value = language; select.setAttribute('aria-label', t('language.label')); }
  for (const caption of document.querySelectorAll('[data-language-caption]')) caption.textContent = t('language.label');
});
