import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { content, dictionaries, sourceKeys } from '../src/i18n/translations.js';
import { initialLanguage, STORAGE_KEY, t, setLanguage, missingTranslations } from '../src/i18n/i18n.js';
export function validateDictionaries() {
  const placeholders = value => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
  for (const [key, values] of Object.entries(content)) {
    assert.equal(values.length, 3, `${key}: exactly three translations`);
    for (const value of values) assert.ok(typeof value === 'string' && value.trim(), `${key}: nonempty visitor copy`);
    assert.deepEqual(placeholders(values[0]), placeholders(values[1]), `${key}: Myanmar interpolation`);
    assert.deepEqual(placeholders(values[0]), placeholders(values[2]), `${key}: Japanese interpolation`);
  }
  for (const locale of ['my', 'en', 'ja']) assert.deepEqual(Object.keys(dictionaries[locale]), Object.keys(dictionaries.en), `${locale}: key parity`);
  const saved = value => ({ getItem: key => key === STORAGE_KEY ? value : null });
  assert.equal(initialLanguage(saved('my'), ['ja-JP']), 'my');
  assert.equal(initialLanguage(saved('invalid'), ['ja-JP', 'en-US']), 'ja');
  assert.equal(initialLanguage(saved('__proto__'), ['en-US']), 'en');
  assert.equal(initialLanguage(saved('toString'), ['ja-JP']), 'ja');
  assert.equal(initialLanguage(null, ['my-MM']), 'my');
  assert.equal(initialLanguage(null, ['fr-FR']), 'en');
  assert.equal(initialLanguage({ getItem() { throw new Error('storage blocked'); } }, ['ja']), 'ja');
  assert.equal(initialLanguage(null, ['fr-FR', 'my-MM']), 'my');
  for (const locale of ['my', 'en', 'ja']) {
    setLanguage(locale);
    assert.ok(!t('workout.done', { count: 7 }).includes('{count}'));
    for (const key of Object.keys(content)) assert.equal(t(key), dictionaries[locale][key]);
  }
  setLanguage('en');
  assert.equal(setLanguage('mm'), false, 'World locale is standard my; kitchen mm is independent');
  assert.equal(missingTranslations.size, 0);
  // Option IDs retain their data; every visitor label in both option tables resolves.
  for (const file of ['avatar', 'cars']) {
    const source = readFileSync(new URL(`../src/${file}.js`, import.meta.url), 'utf8');
    const options = source.slice(source.indexOf(file === 'avatar' ? 'export const OPTIONS' : 'export const MOD_OPTIONS'), source.indexOf(file === 'avatar' ? 'export const SKINS' : 'export const GLOW'));
    for (const match of options.matchAll(/\['[^']+', '([^']+)'\]/g)) assert.ok(sourceKeys.has(match[1]), `${file}: ${match[1]} option is translated`);
  }
  const catalog = readFileSync(new URL('../src/mall.js', import.meta.url), 'utf8');
  for (const match of catalog.matchAll(/desc: '([^']+)'/g)) assert.ok(sourceKeys.has(match[1]), `Full catalog description: ${match[1]}`);
  return { keys: Object.keys(content).length, locales: ['my', 'en', 'ja'], parity: true, initialization: true, options: true };
}
