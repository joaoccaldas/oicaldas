async function load() {
  const res = await fetch('./data/events.json');
  const data = await res.json();

  document.getElementById('headline').textContent = data.headline;
  document.getElementById('subheadline').textContent = data.subheadline;
  document.getElementById('generatedAt').textContent = `Atualizado ${new Date(data.generatedAt).toLocaleString('pt-BR')}`;

  const spotlight = data.events[0];
  const spotlightEl = document.getElementById('spotlight');
  spotlightEl.innerHTML = `
    <div class="spotlight-box">
      <p class="section-label">${spotlight.dayLabel}</p>
      <h3>${spotlight.title}</h3>
      <p>${formatTime(spotlight.start, spotlight.end)}</p>
      <span class="badge ${spotlight.kind}">${spotlight.person}</span>
    </div>
  `;

  const eventsEl = document.getElementById('events');
  eventsEl.innerHTML = data.events.map(event => `
    <article class="event">
      <div>
        <div class="event-day">${event.dayLabel}</div>
        <div class="event-time">${formatTime(event.start, event.end, true)}</div>
      </div>
      <div>
        <h3>${event.title}</h3>
        <div class="event-meta">${event.person}</div>
        <span class="badge ${event.kind}">${labelForKind(event.kind)}</span>
      </div>
    </article>
  `).join('');
}

function formatTime(start, end, compact = false) {
  const s = new Date(start);
  const e = new Date(end);
  const options = { hour: '2-digit', minute: '2-digit' };
  const from = s.toLocaleTimeString('pt-BR', options);
  const to = e.toLocaleTimeString('pt-BR', options);
  return compact ? `${from}–${to}` : `${from} até ${to}`;
}

function labelForKind(kind) {
  return {
    sport: 'Esporte',
    school: 'Escola',
    family: 'Família',
    wellbeing: 'Bem-estar'
  }[kind] || kind;
}

load();
