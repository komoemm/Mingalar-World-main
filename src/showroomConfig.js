// User-supplied S-CLASS experience; verified HTTP 200 and S-CLASS title on 2026-10-12.
// Set to '' to keep the kiosk unavailable. Use only a verified http(s) application URL.
export const KITCHEN_EXPERIENCE_URL = 'https://game-s-class-kitchen.iida-mm.com/';

export function kitchenExperienceUrl() {
  try {
    const url = new URL(KITCHEN_EXPERIENCE_URL);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.origin === location.origin) return null;
    return url.href;
  } catch { return null; }
}
