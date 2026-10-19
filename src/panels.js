import { t, tr, msg, localizeFields, onLanguageChange, languageSelector } from './i18n/i18n.js';
// Lighter interactions: home gallery and office reception. Placeholder copy.
import { ui, h } from './ui.js';

// ------------------------------------------------------------ home gallery
const ROOMS = [
  { name: 'Living Room', icon: '🛋️', bg: 'linear-gradient(135deg,#ffb36b,#ff5b8a)', text: 'Double-height glass wall facing the garden, with a sunken lounge and fireplace.', tags: ['72 m²', 'Smart lighting', 'Garden view'] },
  { name: 'Chef’s Kitchen', icon: '🍳', bg: 'linear-gradient(135deg,#5be2c0,#2e6fdb)', text: 'Stone island, integrated appliances and a walk-in pantry behind a hidden door.', tags: ['Island seating', 'Wine wall', 'Pantry'] },
  { name: 'Master Suite', icon: '🛏️', bg: 'linear-gradient(135deg,#b69cff,#5b5bd6)', text: 'Corner suite with a private balcony, dressing room and spa bathroom.', tags: ['Balcony', 'Dressing room', 'Spa bath'] },
  { name: 'Home Cinema', icon: '🎬', bg: 'linear-gradient(135deg,#3b3f73,#14182b)', text: 'Eight reclining seats, acoustic panelling and a starlight ceiling.', tags: ['8 seats', '4K laser', 'Soundproofed'] },
  { name: 'Roof Terrace', icon: '🌇', bg: 'linear-gradient(135deg,#ffc83d,#ff7a3d)', text: 'Open-air lounge with an outdoor kitchen and sunset views over the town.', tags: ['Outdoor kitchen', 'Fire pit', 'Solar roof'] },
];

ROOMS.forEach(room => { localizeFields(room, ['name', 'text']); room.tags = room.tags.map(tag => () => /^[0-9]+ m²$/.test(tag) ? tag : tr(tag)); });

export function openHome(world, zone) {
  const glass = world.refs.homeGlass;
  let i = 0;
  const body = h('');
  const render = () => {
    const r = ROOMS[i];
    const lit = glass.emissiveIntensity > 0;
    body.innerHTML = `
      <div class="slide" style="background:${r.bg}">${r.icon}<span class="count">${i + 1} / ${ROOMS.length}</span></div>
      <h3 style="font-size:22px;margin:0 0 6px">${r.name}</h3>
      <p>${r.text}</p>
      <div class="chips">${r.tags.map((t) => `<span class="chip">${t()}</span>`).join('')}</div>
      <div class="row">
        <button class="btn ghost" data-step="-1" aria-label="${t('home.previous')}">◀</button>
        <button class="btn ghost" data-step="1" aria-label="${t('home.next')}">▶</button>
        <button class="btn" data-lights style="flex:1">${t(lit ? 'home.off' : 'home.on')}</button>
      </div>
      <div class="note">${t('home.note')}</div>`;
  };
  body.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.step) i = (i + +b.dataset.step + ROOMS.length) % ROOMS.length;
    else if ('lights' in b.dataset) glass.emissiveIntensity = glass.emissiveIntensity > 0 ? 0 : 1.1;
    render();
  });
  render();
  ui.openPanel({ kicker: 'Luxury Home', title: 'Gallery tour', body, zone, render });
}

// ------------------------------------------------------- office reception
export function openReception(zone) {
  const body = h('');
    const render = () => { body.innerHTML = `
    <p>${t('office.intro')}</p>
    <div class="service"><b>🗺️ Alacrity Research</b><span>${t('office.nw')}</span></div>
    <div class="service"><b>📺 ${t('office.news')}</b><span>${t('office.ne')}</span></div>
    <div class="service"><b>💻 Tun-PS-Lin</b><span>${t('office.se')}</span></div>
    <p style="margin-top:10px">${t('office.instructions')}</p>`; };
    render();
  ui.openPanel({ kicker: 'Virtual Office', title: 'Reception', body, zone, render });
}
