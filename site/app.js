import { athleteSnapshot, race, weeks, workouts } from './plan.js';

const STORAGE_KEY = 'shira-10k-progress-v1';
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"completed":{},"notes":{}}');
const calendar = document.querySelector('#training-calendar');
const dialog = document.querySelector('#workout-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function localDate(value) {
  return new Date(`${value}T12:00:00`);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(value, options = { month: 'short', day: 'numeric' }) {
  return localDate(value).toLocaleDateString('en-US', options);
}

function renderStats() {
  const stats = [
    [athleteSnapshot.runsAnalyzed, 'runs reviewed'],
    [`${athleteSnapshot.recentKm} km`, 'in the latest 30 days'],
    [`${athleteSnapshot.longestRunKm} km`, 'current longest run'],
    [athleteSnapshot.recentMedianPace, 'recent median pace'],
  ];
  document.querySelector('#stat-grid').innerHTML = stats
    .map(([value, label]) => `<article class="stat"><strong>${value}</strong><span>${label}</span></article>`)
    .join('');
}

function renderCalendar() {
  calendar.innerHTML = weeks.map((week) => {
    const weekStart = localDate(workouts.find((workout) => workout.week === week.number).date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      const iso = date.toLocaleDateString('en-CA');
      const workout = workouts.find((item) => item.date === iso);
      const chip = workout ? `
        <button class="chip ${state.completed[workout.id] ? 'done' : ''}" data-id="${workout.id}" data-type="${workout.type}">
          <span class="chip-type">${workout.type}</span>
          <span class="chip-title">${workout.title}</span>
          <span class="chip-distance">${workout.distanceKm} km</span>
        </button>` : '';
      return `<div class="day"><div class="day-head"><span>${dayNames[index]}</span><span>${date.getDate()}</span></div>${chip}</div>`;
    }).join('');
    return `<div class="week"><div class="week-label"><strong>Week ${week.number}</strong><span>${week.dates}</span><span>${week.plannedKm} km</span></div>${days}</div>`;
  }).join('');

  calendar.querySelectorAll('.chip').forEach((button) => {
    button.addEventListener('click', () => openWorkout(button.dataset.id));
  });
  updateProgress();
}

function openWorkout(id) {
  const workout = workouts.find((item) => item.id === id);
  dialogContent.innerHTML = `
    <article class="dialog-body">
      <p class="eyebrow dark">${formatDate(workout.date, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      <h2>${workout.title}</h2>
      <p>${workout.summary}</p>
      <div class="meta"><span class="pill">${workout.distanceKm} km</span><span class="pill">${workout.duration}</span><span class="pill">${workout.effort}</span><span class="pill">${workout.pace}</span></div>
      <ol>${workout.details.map((detail) => `<li>${detail}</li>`).join('')}</ol>
      <div class="knee"><strong>Knee-aware option:</strong> ${workout.kneeOption}</div>
      <label class="complete"><input type="checkbox" id="complete-workout" ${state.completed[id] ? 'checked' : ''}> Mark workout complete</label>
      <label for="workout-notes"><strong>Private notes</strong></label>
      <textarea class="notes" id="workout-notes" placeholder="How did it feel?">${state.notes[id] || ''}</textarea>
    </article>`;
  dialogContent.querySelector('#complete-workout').addEventListener('change', (event) => {
    state.completed[id] = event.target.checked;
    saveState();
    renderCalendar();
  });
  dialogContent.querySelector('#workout-notes').addEventListener('input', (event) => {
    state.notes[id] = event.target.value;
    saveState();
  });
  dialog.showModal();
}

function updateProgress() {
  const completed = workouts.filter((workout) => state.completed[workout.id]).length;
  document.querySelector('#progress-label').textContent = `${completed} of ${workouts.length} complete`;
  document.querySelector('#progress-bar').style.width = `${(completed / workouts.length) * 100}%`;
}

function renderVolume() {
  const max = Math.max(...weeks.map((week) => week.plannedKm));
  document.querySelector('#volume-chart').innerHTML = weeks.map((week) => `
    <div class="volume-row">
      <strong>W${week.number}</strong>
      <div class="volume-track"><div class="volume-fill" style="width:${(week.plannedKm / max) * 100}%">${week.label}</div></div>
      <span class="volume-km">${week.plannedKm} km</span>
    </div>`).join('');
}

function updateCountdown() {
  const raceDate = localDate(race.date);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const days = Math.ceil((raceDate - today) / 86400000);
  document.querySelector('#countdown-number').textContent = Math.max(0, days);
  document.querySelector('#countdown-label').textContent = days > 1 ? 'days to go' : days === 1 ? 'day to go' : 'race day';
}

function escapeIcs(value) {
  return value.replaceAll('\\', '\\\\').replaceAll(',', '\\,').replaceAll(';', '\\;').replaceAll('\n', '\\n');
}

function downloadCalendar() {
  const events = workouts.map((workout) => {
    const date = workout.date.replaceAll('-', '');
    const next = localDate(workout.date);
    next.setDate(next.getDate() + 1);
    const nextDate = next.toLocaleDateString('en-CA').replaceAll('-', '');
    const description = `${workout.summary}\\n${workout.details.join('\\n')}\\nKnee-aware option: ${workout.kneeOption}`;
    return ['BEGIN:VEVENT', `UID:${workout.id}@shira-10k`, `DTSTART;VALUE=DATE:${date}`, `DTEND;VALUE=DATE:${nextDate}`, `SUMMARY:${escapeIcs(`${workout.title} — ${workout.distanceKm} km`)}`, `DESCRIPTION:${escapeIcs(description)}`, 'END:VEVENT'].join('\r\n');
  }).join('\r\n');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shira 10K Roadmap//EN', 'CALSCALE:GREGORIAN', events, 'END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  link.download = 'shira-10k-plan.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector('#print-button').addEventListener('click', () => window.print());
document.querySelector('#calendar-button').addEventListener('click', downloadCalendar);

renderStats();
renderCalendar();
renderVolume();
updateCountdown();
