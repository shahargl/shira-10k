import { race, weeks, workouts } from '../site/plan.js';
import { readFileSync } from 'node:fs';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(race.date === '2026-10-28', 'Race date must be October 28, 2026');
assert(weeks.length === 6, 'Plan must contain six calendar weeks');
assert(workouts.length === 17, 'Plan must contain 16 training runs plus race day');
assert(new Set(workouts.map((workout) => workout.id)).size === workouts.length, 'Workout IDs must be unique');
assert(workouts.every((workout, index) => index === 0 || workout.date > workouts[index - 1].date), 'Workouts must be chronological');
assert(workouts.at(-1).date === race.date && workouts.at(-1).distanceKm === 10, 'Final workout must be the 10K race');

for (const week of weeks.slice(0, 5)) {
  const weekRuns = workouts.filter((workout) => workout.week === week.number);
  assert(weekRuns.length === 3, `Week ${week.number} must have three runs`);
  assert(weekRuns.reduce((sum, workout) => sum + workout.distanceKm, 0) === week.plannedKm, `Week ${week.number} distance mismatch`);
}

const longRuns = workouts.filter((workout) => workout.type === 'long').map((workout) => workout.distanceKm);
assert(Math.max(...longRuns) === 9, 'Peak long run must be 9 km');
assert(weeks[4].plannedKm < weeks[3].plannedKm, 'Taper must start after peak week');
assert(workouts.every((workout) => workout.kneeOption), 'Every workout needs a knee-aware option');
assert(workouts.filter((workout) => workout.type === 'speed').every((workout) => !/all.out/i.test(workout.summary)), 'Speed work must remain controlled');

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../site/app.js', import.meta.url), 'utf8');
assert(html.includes('lang="he" dir="rtl"'), 'Site must be Hebrew RTL');
assert(app.includes('המטרה:') && app.includes('למה:'), 'Every rendered workout must explain its goal and rationale');
assert(!html.includes('Six weeks') && !html.includes('THE STARTING POINT'), 'Old promotional layout must be removed');
assert(app.includes('href="#run-${workout.id}"'), 'Calendar workouts must link to full explanations');
assert(app.includes('class="tooltip"'), 'Calendar workouts must provide hover descriptions');

console.log(`Validated ${workouts.length} workouts across ${weeks.length} weeks.`);
