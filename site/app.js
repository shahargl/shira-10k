import { weeks, workouts } from './plan.js?v=2ad83b4';

const STORAGE_KEY = 'shira-10k-progress-v1';
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"completed":{}}');
const copy = {
  'w1-sun': ['ריצה קלה', 'להתחיל את התוכנית בקצב רגוע ולבדוק איך הברך מגיבה.', 'זו נקודת הבסיס שלנו; אין צורך להוכיח כושר.', ['5 דקות הליכה מהירה', '5 ק״מ בקצב שמאפשר לדבר במשפטים', '3–5 דקות הליכה בסיום'], 'אם הכאב עולה מעל 2 מתוך 10 — עוברים ל־4 דקות ריצה ודקת הליכה, או עוצרים.'],
  'w1-tue': ['ריצה קלה עם האצות קצרות', 'להכיר לגוף מהירות בלי לייצר עייפות.', 'האצות קצרות משפרות טכניקה וקצב, אך לא אמורות להרגיש כמו ספרינט.', ['2 ק״מ קל', '6 פעמים: 30 שניות מהיר ונינוח + 90 שניות ג׳וג קל', 'להמשיך קל עד 5 ק״מ'], 'אם הברך רגישה — כל הריצה קלה, בלי האצות.'],
  'w1-thu': ['ריצה ארוכה קלה', 'לסיים 7 ק״מ בנוחות.', 'זה המרחק הארוך הנוכחי, לכן השבוע לא מאריכים עדיין.', ['2 הק״מ הראשונים איטיים במיוחד', 'להתייצב בקצב שיחה', 'לא להגביר בסוף'], 'אם צורת הריצה משתנה — מסיימים ב־6 ק״מ.'],
  'w2-sun': ['ריצה קלה', 'להתאושש ולבנות רצף.', 'ריצה קלה מאפשרת לספוג את השבוע הקודם בלי להעמיס.', ['מסלול שטוח ככל האפשר', '5 ק״מ בקצב שיחה', 'לסיים בתחושה שאפשר להמשיך'], 'אם יש נוקשות — 4 דקות ריצה ודקת הליכה מההתחלה.'],
  'w2-tue': ['חזרות של 2 דקות', 'לתרגל קצב מהיר אך נשלט.', 'המנוחות הארוכות מאפשרות איכות בלי להפוך את האימון למבחן.', ['1.5 ק״מ קל', '5 פעמים: 2 דקות בקצב 6:00–6:15 + 2 דקות קל', 'להשלים ל־5.5 ק״מ קל'], 'אפשר לבצע 4 חזרות בלבד, או להפוך הכול לריצה קלה.'],
  'w2-thu': ['ריצה ארוכה — 7.5 ק״מ', 'להאריך את הסיבולת בחצי ק״מ בלבד.', 'התקדמות קטנה שומרת על הברך ומקרבת בהדרגה ל־10 ק״מ.', ['קצב קל ואחיד', 'אפשר דקת הליכה באמצע', 'הק״מ האחרון נשאר קל'], 'עצירה ב־7 ק״מ עדיין משיגה את מטרת האימון.'],
  'w3-sun': ['ריצה קלה עם מתגברות', 'לרוץ קל ולשמור מעט חדות.', 'המתגברות קצרות מספיק כדי לשפר תנועה בלי עייפות.', ['4 ק״מ קל', '4 פעמים: 20 שניות מהיר ונינוח + 70 שניות קל', 'להשלים ל־5 ק״מ'], 'מדלגים על המתגברות אם הברך רגישה.'],
  'w3-tue': ['טמפו מפוצל', 'להחזיק מאמץ יציב לאורך כמה דקות.', 'קטעי הטמפו מלמדים קצב יעיל בלי להישאר זמן רב בעומס.', ['1.5 ק״מ קל', '3 פעמים: 5 דקות יציב בקצב 6:05–6:20 + 3 דקות קל', 'להשלים ל־6 ק״מ'], 'אם מופיע כאב — מקצרים כל קטע ל־3 דקות.'],
  'w3-thu': ['ריצה ארוכה — 8 ק״מ', 'להגיע ל־80% ממרחק המרוץ בנוחות.', 'זה בונה ביטחון וסיבולת בלי צורך לרוץ 10 ק״מ לפני המרוץ.', ['לרוץ לפי הנשימה, לא לפי השעון', 'אפשר דקת הליכה אחרי 4 ק״מ', 'לסיים ללא הגברה'], 'אם הטכניקה משתנה — מסיימים ב־7–7.5 ק״מ.'],
  'w4-sun': ['ריצת התאוששות', 'להתאושש לפני שבוע השיא.', 'המרחק קצר והקצב איטי בכוונה כדי לאפשר בנייה בהמשך השבוע.', ['מסלול שטוח', '4.5 ק״מ קל מאוד', '5 דקות הליכה בסיום'], 'אם הברך לא רגועה — מחליפים ב־30 דקות הליכה.'],
  'w4-tue': ['קצב 10 ק״מ נשלט', 'לתרגל קצב יעיל בפעם האחרונה לפני השיא.', 'חזרות קצרות נותנות ביטחון בקצב בלי לצבור עייפות גדולה.', ['1.5 ק״מ קל', '6 פעמים: 2 דקות בקצב 6:00–6:15 + 90 שניות קל', 'להשלים ל־5.5 ק״מ'], '4 חזרות מספיקות אם הרגליים כבדות או הברך רגישה.'],
  'w4-thu': ['ריצת השיא — 9 ק״מ', 'לסיים את הריצה הארוכה ביותר ברוגע.', '9 ק״מ מספיקים כדי לבנות ביטחון למרוץ תוך שמירה על מרווח ביטחון.', ['מסלול שטוח וקצב קל מאוד', 'דקת הליכה מתוכננת אחרי 4.5 ק״מ', '2 הק״מ האחרונים נשארים קלים'], '7–8 ק״מ בריאים עדיפים על 9 ק״מ בכוח.'],
  'w5-sun': ['ריצה קלה', 'להתחיל להוריד עומס.', 'הכושר כבר נבנה; עכשיו המטרה היא להגיע רעננה.', ['5 ק״מ בקצב שיחה', 'להימנע מעליות', '5 דקות הליכה בסיום'], 'מקצרים ל־4 ק״מ אם נשארה רגישות משבוע השיא.'],
  'w5-tue': ['תזכורת קצב קצרה', 'לשמור על תחושת קצב בלי להתעייף.', 'שני קטעים יציבים מספיקים כדי לשמור חדות בזמן הטייפר.', ['1.5 ק״מ קל', 'פעמיים: 6 דקות יציב בקצב 6:10–6:25 + 4 דקות קל', 'להשלים ל־5 ק״מ'], 'אם יש רגישות — כל הריצה קלה.'],
  'w5-thu': ['ריצה ארוכה מקוצרת', 'לשמר סיבולת תוך הורדת נפח.', 'המרחק מספיק לתחזוקה אך קצר משמעותית מריצת השיא.', ['5 ק״מ קל', 'אם הכול מרגיש טוב: 4 פעמים 15 שניות מתגברת', 'להשלים ל־6 ק״מ'], 'מדלגים על המתגברות ומסיימים ב־5 ק״מ לפי הצורך.'],
  'w6-sun': ['ריצת שבוע המרוץ', 'לשמור על תנועה בלי לנסות לשפר כושר.', 'בשלב הזה מנוחה חשובה יותר מעוד קילומטרים.', ['3 ק״מ קל מאוד', 'רק אם אין כאב: 3 פעמים 15 שניות מתגברת', 'להשלים ל־4 ק״מ'], 'אפשר לדלג על המתגברות או על כל הריצה אם הברך צריכה מנוחה.'],
  race: ['מרוץ 10 ק״מ', 'לסיים בנוחות ובבריאות — ללא יעד זמן.', 'פתיחה איטית משאירה מספיק אנרגיה כדי לקבל החלטה טובה בקילומטרים האחרונים.', ['חימום: 8–10 דקות הליכה וג׳וג קל', 'ק״מ 1–3: רגוע בכוונה', 'ק״מ 4–8: קצב יציב שניתן להחזיק', 'ק״מ 9–10: מגבירים רק אם הנשימה והברך בשליטה'], 'הפסקת הליכה קצרה עדיפה על שינוי בצורת הריצה או דחיפה דרך כאב חד.'],
};

const typeLabels = { easy: 'קל', speed: 'מהירות נשלטת', long: 'ארוכה', race: 'מרוץ' };
const weekNames = ['התחלה אחרי יום כיפור', 'חיזוק עדין', 'בניית סיבולת', 'שבוע שיא', 'הורדת עומס', 'שבוע המרוץ'];
const weekDates = ['20–26 בספטמבר', '27 בספטמבר–3 באוקטובר', '4–10 באוקטובר', '11–17 באוקטובר', '18–24 באוקטובר', '25–31 באוקטובר'];
const holidays = {
  '2026-09-20': 'ערב יום כיפור',
  '2026-09-21': 'יום כיפור',
  '2026-09-26': 'סוכות',
  '2026-10-03': 'שמיני עצרת ושמחת תורה',
};
const calendar = document.querySelector('#training-calendar');
const details = document.querySelector('#workout-details');
const dayNames = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

function dateParts(value) {
  const date = new Date(`${value}T12:00:00`);
  return {
    day: date.toLocaleDateString('he-IL', { weekday: 'long' }),
    date: date.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' }),
  };
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  calendar.innerHTML = `
    <div class="calendar-header"><span>שבוע</span>${dayNames.map((day) => `<span>${day}</span>`).join('')}</div>
    ${weeks.map((week, index) => renderCalendarWeek(week, index)).join('')}`;

  details.innerHTML = weeks.map((week, index) => {
    const weekRuns = workouts.filter((workout) => workout.week === week.number);
    return `<section class="detail-week">
      <header class="week-title"><h3>שבוע ${week.number} · ${weekNames[index]}</h3><p>${weekDates[index]} · ${week.plannedKm} ק״מ</p></header>
      <div class="runs">${weekRuns.map(renderRun).join('')}</div>
    </section>`;
  }).join('');

  document.querySelectorAll('.complete input').forEach((input) => {
    input.addEventListener('change', () => {
      state.completed[input.dataset.id] = input.checked;
      save();
      render();
    });
  });
  updateProgress();
}

function renderCalendarWeek(week, index) {
  const firstRun = workouts.find((workout) => workout.week === week.number);
  const start = new Date(`${firstRun.date}T12:00:00`);
  start.setDate(start.getDate() - start.getDay());
  const weekHolidayNames = Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(start);
    date.setDate(date.getDate() + dayIndex);
    return holidays[date.toLocaleDateString('en-CA')];
  }).filter(Boolean);
  const cells = Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(start);
    date.setDate(date.getDate() + dayIndex);
    const iso = date.toLocaleDateString('en-CA');
    const workout = workouts.find((item) => item.date === iso);
    const holiday = holidays[iso];
    if (!workout) return `<div class="calendar-day ${holiday ? 'holiday-day' : 'empty'}"><span class="day-number"><b>${dayNames[dayIndex]}</b>${date.getDate()}</span>${holiday ? `<span class="holiday">${holiday}<small>ללא אימון</small></span>` : ''}</div>`;
    const [title, goal] = copy[workout.id];
    const completed = Boolean(state.completed[workout.id]);
    return `<div class="calendar-day">
      <span class="day-number"><b>${dayNames[dayIndex]}</b>${date.getDate()}</span>
      <a class="calendar-run ${workout.type} ${completed ? 'completed' : ''}" href="#run-${workout.id}">
        <strong>${title}</strong><span>${workout.distanceKm} ק״מ</span>
        <span class="tooltip"><b>המטרה:</b> ${goal}<small>לחיצה להסבר המלא</small></span>
      </a>
    </div>`;
  }).join('');
  return `<div class="calendar-week"><div class="calendar-week-label"><strong>שבוע ${week.number}</strong><span>${weekNames[index]}</span>${weekHolidayNames.length ? `<em>${weekHolidayNames.join(' · ')}</em>` : ''}</div>${cells}</div>`;
}

function renderRun(workout) {
  const [title, goal, why, steps, knee] = copy[workout.id];
  const date = dateParts(workout.date);
  const completed = Boolean(state.completed[workout.id]);
  const duration = workout.duration === 'Run by effort' ? 'לפי תחושה' : workout.duration.replace('min', 'דקות');
  return `<article id="run-${workout.id}" class="run ${workout.type === 'race' ? 'race' : ''} ${completed ? 'completed' : ''}">
    <div class="run-date"><strong>${date.day}</strong><span>${date.date}</span><span>${typeLabels[workout.type]}</span></div>
    <div class="run-main">
      <h4>${title}</h4>
      <p class="meta">${workout.distanceKm} ק״מ · ${duration}</p>
      <p class="purpose"><strong>המטרה:</strong> ${goal}</p>
      <p class="why"><strong>למה:</strong> ${why}</p>
      <ol class="steps">${steps.map((step) => `<li>${step}</li>`).join('')}</ol>
      <p class="knee"><strong>התאמה לברך:</strong> ${knee}</p>
      <label class="complete"><input type="checkbox" data-id="${workout.id}" ${completed ? 'checked' : ''}> בוצע</label>
    </div>
  </article>`;
}

function updateProgress() {
  const count = workouts.filter((workout) => state.completed[workout.id]).length;
  document.querySelector('#progress-label').textContent = `${count} מתוך ${workouts.length} אימונים הושלמו`;
  document.querySelector('#progress-bar').style.width = `${count / workouts.length * 100}%`;
}

function escapeIcs(value) {
  return value.replaceAll('\\', '\\\\').replaceAll(',', '\\,').replaceAll(';', '\\;').replaceAll('\n', '\\n');
}

function downloadCalendar() {
  const events = workouts.map((workout) => {
    const [title, goal, why, steps, knee] = copy[workout.id];
    const date = workout.date.replaceAll('-', '');
    const next = new Date(`${workout.date}T12:00:00`);
    next.setDate(next.getDate() + 1);
    const nextDate = next.toLocaleDateString('en-CA').replaceAll('-', '');
    const description = `מטרה: ${goal}\\nלמה: ${why}\\n${steps.join('\\n')}\\nהתאמה לברך: ${knee}`;
    return ['BEGIN:VEVENT', `UID:${workout.id}@shira-10k`, `DTSTART;VALUE=DATE:${date}`, `DTEND;VALUE=DATE:${nextDate}`, `SUMMARY:${escapeIcs(`${title} — ${workout.distanceKm} ק״מ`)}`, `DESCRIPTION:${escapeIcs(description)}`, 'END:VEVENT'].join('\r\n');
  }).join('\r\n');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shira 10K//HE', 'CALSCALE:GREGORIAN', events, 'END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  link.download = 'shira-10k.ics';
  link.click();
  URL.revokeObjectURL(link.href);
}

document.querySelector('#calendar-button').addEventListener('click', downloadCalendar);
render();
