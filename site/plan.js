export const athleteSnapshot = {
  runsAnalyzed: 50,
  recentKm: 44.5,
  longestRunKm: 7,
  recentMedianPace: '6:34 /km',
};

export const race = {
  name: '10K Race Day',
  date: '2026-10-28',
  distanceKm: 10,
  goal: 'Finish comfortably and confidently',
};

export const weeks = [
  { number: 1, dates: 'Sep 20–26', label: 'Start after Yom Kippur', plannedKm: 12 },
  { number: 2, dates: 'Sep 27–Oct 3', label: 'Add gentle strength', plannedKm: 18 },
  { number: 3, dates: 'Oct 4–10', label: 'Build aerobic confidence', plannedKm: 19 },
  { number: 4, dates: 'Oct 11–17', label: 'Peak endurance', plannedKm: 19 },
  { number: 5, dates: 'Oct 18–24', label: 'Freshen up', plannedKm: 16 },
  { number: 6, dates: 'Oct 25–31', label: 'Race week', plannedKm: 14 },
];

const easy = {
  effort: 'RPE 3–4 · conversational',
  pace: 'About 6:40–7:10 /km',
};

export const workouts = [
  {
    id: 'w1-sun', week: 1, date: '2026-09-22', type: 'easy', title: 'Easy reset',
    distanceKm: 5, duration: '33–36 min', ...easy,
    summary: 'A relaxed baseline run with a deliberate knee check.',
    details: ['Walk briskly for 5 minutes.', 'Run 5 km at full-sentence conversation effort.', 'Finish with 3–5 minutes of easy walking.'],
    kneeOption: 'If discomfort rises above 2/10, switch to 4 min run / 1 min walk or stop.',
  },
  {
    id: 'w1-thu', week: 1, date: '2026-09-24', type: 'long', title: 'Comfortable seven',
    distanceKm: 7, duration: '47–50 min', ...easy,
    summary: 'Match the current longest-run baseline without extending yet.',
    details: ['Start the first 2 km extra easy.', 'Settle into an even rhythm.', 'No fast finish.'],
    kneeOption: 'Cap the run at 6 km if discomfort changes your stride.',
  },
  {
    id: 'w2-sun', week: 2, date: '2026-09-27', type: 'easy', title: 'Easy aerobic run',
    distanceKm: 5, duration: '33–36 min', ...easy,
    summary: 'Recover and reinforce relaxed form.',
    details: ['Keep shoulders and hands loose.', 'Choose a flat route.', 'Finish able to continue another 1–2 km.'],
    kneeOption: 'Use 4 min run / 1 min walk from the start if stiffness is present.',
  },
  {
    id: 'w2-tue', week: 2, date: '2026-09-29', type: 'speed', title: 'Two-minute repeats',
    distanceKm: 5.5, duration: '35–39 min', effort: 'RPE 6–7 on repeats', pace: 'About 6:00–6:15 /km on repeats',
    summary: 'Practice controlled 10K-style effort with generous recovery.',
    details: ['Run 1.5 km easy.', 'Complete 5 × 2 min controlled with 2 min easy jog.', 'Jog easily to 5.5 km.'],
    kneeOption: 'Do 4 repeats, or run everything easy, if impact feels uncomfortable.',
  },
  {
    id: 'w2-thu', week: 2, date: '2026-10-01', type: 'long', title: 'First small extension',
    distanceKm: 7.5, duration: '51–54 min', effort: easy.effort, pace: 'About 6:45–7:15 /km',
    summary: 'Extend the longest run by only 500 metres.',
    details: ['Keep the route flat.', 'A 60 sec walk break at halfway is fine.', 'Keep the final kilometre easy.'],
    kneeOption: 'Stopping at 7 km still completes the purpose of this workout.',
  },
  {
    id: 'w3-sun', week: 3, date: '2026-10-04', type: 'easy', title: 'Easy run + strides',
    distanceKm: 5, duration: '33–36 min', effort: 'RPE 3–4, then 6 on strides', pace: 'Easy throughout',
    summary: 'Easy volume with four short form reminders.',
    details: ['Run 4 km conversationally.', 'Add 4 × 20 sec relaxed strides with 70 sec easy.', 'Jog to 5 km.'],
    kneeOption: 'Skip all strides if the knee is tender.',
  },
  {
    id: 'w3-tue', week: 3, date: '2026-10-06', type: 'speed', title: 'Broken steady tempo',
    distanceKm: 6, duration: '38–42 min', effort: 'RPE 6 · controlled', pace: 'About 6:05–6:20 /km on blocks',
    summary: 'Hold an efficient rhythm while staying below hard effort.',
    details: ['Run 1.5 km easy.', 'Complete 3 × 5 min steady with 3 min easy jog.', 'Jog to 6 km.'],
    kneeOption: 'Reduce each steady block to 3 minutes if discomfort appears.',
  },
  {
    id: 'w3-thu', week: 3, date: '2026-10-08', type: 'long', title: 'Eight kilometre confidence',
    distanceKm: 8, duration: '55–58 min', effort: easy.effort, pace: 'About 6:45–7:15 /km',
    summary: 'Reach 80% of race distance at low intensity.',
    details: ['Run by breathing, not pace.', 'A 60 sec walk break after 4 km is fine.', 'Finish relaxed.'],
    kneeOption: 'Stop at 7–7.5 km if form changes or discomfort builds.',
  },
  {
    id: 'w4-sun', week: 4, date: '2026-10-11', type: 'easy', title: 'Recovery run',
    distanceKm: 4.5, duration: '30–33 min', effort: 'RPE 2–3 · very easy', pace: 'Slower than 6:45 /km',
    summary: 'Absorb the 8 km run before the peak week.',
    details: ['Choose a flat route.', 'Keep every kilometre easy.', 'Walk 5 minutes afterward.'],
    kneeOption: 'Replace with 30 minutes brisk walking if the knee is not settled.',
  },
  {
    id: 'w4-tue', week: 4, date: '2026-10-13', type: 'speed', title: 'Controlled 10K rhythm',
    distanceKm: 5.5, duration: '35–39 min', effort: 'RPE 6–7 on repeats', pace: 'About 6:00–6:15 /km on repeats',
    summary: 'The final substantial speed session—never maximal.',
    details: ['Run 1.5 km easy.', 'Complete 6 × 2 min controlled with 90 sec easy.', 'Jog to 5.5 km.'],
    kneeOption: 'Four repeats are enough if the knee or legs feel heavy.',
  },
  {
    id: 'w4-thu', week: 4, date: '2026-10-15', type: 'long', title: 'Peak long run',
    distanceKm: 9, duration: '62–66 min', effort: easy.effort, pace: 'About 6:50–7:20 /km',
    summary: 'The longest training run, slow and without a fast finish.',
    details: ['Use a flat route.', 'Take a planned 60 sec walk at 4.5 km.', 'Keep the last 2 km easy.'],
    kneeOption: 'Seven to eight healthy kilometres are better than forcing nine.',
  },
  {
    id: 'w5-sun', week: 5, date: '2026-10-18', type: 'easy', title: 'Easy recovery',
    distanceKm: 5, duration: '34–37 min', ...easy,
    summary: 'Start tapering and let the peak long run settle.',
    details: ['Stay fully conversational.', 'Avoid hills.', 'Finish with 5 minutes walking.'],
    kneeOption: 'Shorten to 4 km if soreness remains from the peak week.',
  },
  {
    id: 'w5-tue', week: 5, date: '2026-10-20', type: 'speed', title: 'Light tempo reminder',
    distanceKm: 5, duration: '32–36 min', effort: 'RPE 6 on steady blocks', pace: 'About 6:10–6:25 /km on blocks',
    summary: 'A modest rhythm session that leaves energy in reserve.',
    details: ['Run 1.5 km easy.', 'Complete 2 × 6 min steady with 4 min easy.', 'Jog to 5 km.'],
    kneeOption: 'Make this entirely easy if there is any knee sensitivity.',
  },
  {
    id: 'w5-thu', week: 5, date: '2026-10-22', type: 'long', title: 'Shortened long run',
    distanceKm: 6, duration: '40–43 min', ...easy,
    summary: 'Maintain endurance while reducing fatigue.',
    details: ['Run 5 km conversationally.', 'If pain-free, add 4 × 15 sec strides.', 'Jog to 6 km.'],
    kneeOption: 'Skip the strides and stop at 5 km if needed.',
  },
  {
    id: 'w6-sun', week: 6, date: '2026-10-25', type: 'easy', title: 'Race-week easy run',
    distanceKm: 4, duration: '27–30 min', effort: 'RPE 2–3 · very easy', pace: 'Comfortably slow',
    summary: 'A short run to stay loose, not to gain fitness.',
    details: ['Keep the route flat.', 'Run 3 km easy.', 'If pain-free, add 3 × 15 sec strides.'],
    kneeOption: 'Skip the strides—or the run—if the knee needs rest.',
  },
  {
    id: 'race', week: 6, date: '2026-10-28', type: 'race', title: '10K race day',
    distanceKm: 10, duration: 'Run by effort', effort: 'Start RPE 4–5 · finish by feel', pace: 'No required time target',
    summary: 'Start patiently, settle in, and finish healthy.',
    details: ['Warm up with 8–10 min walking/easy jogging.', 'Km 1–3: deliberately calm.', 'Km 4–8: sustainable rhythm.', 'Km 9–10: lift only if knee and breathing are controlled.'],
    kneeOption: 'A short walk break is smarter than changing stride or pushing through sharp pain.',
  },
];
