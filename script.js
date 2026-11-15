const activityLevels = {
  1: { label: 'Mostly sedentary', description: 'Little to no exercise', multiplier: 1.2 },
  2: { label: 'Lightly active', description: 'Exercise 1–3 days per week', multiplier: 1.375 },
  3: { label: 'Moderately active', description: 'Exercise 3–5 days per week', multiplier: 1.55 },
  4: { label: 'Very active', description: 'Hard exercise 6–7 days per week', multiplier: 1.725 },
  5: { label: 'Extra active', description: 'Very hard exercise or physical job', multiplier: 1.9 }
};

const form = document.querySelector('#calculator-form');
const activity = document.querySelector('#activity');
const activityValue = document.querySelector('#activity-value');
const activityDescription = document.querySelector('#activity-description');
const resultStatus = document.querySelector('#result-status');

function updateActivity() {
  const level = activityLevels[activity.value];
  activityValue.textContent = level.label;
  activityDescription.textContent = level.description;
  const percent = ((activity.value - 1) / 4) * 100;
  activity.style.background = `linear-gradient(90deg, var(--green) ${percent}%, #dfe7db ${percent}%)`;
}

function formatCalories(value) { return Math.round(value).toLocaleString('en-US'); }

activity.addEventListener('input', updateActivity);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const age = Number(document.querySelector('#age').value);
  const height = Number(document.querySelector('#height').value);
  const weight = Number(document.querySelector('#weight').value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const multiplier = activityLevels[activity.value].multiplier;
  if (!age || !height || !weight) return;
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'male' ? 5 : -161);
  const maintenance = bmr * multiplier;
  document.querySelector('#maintain-calories').textContent = formatCalories(maintenance);
  document.querySelector('#lose-calories').textContent = formatCalories(Math.max(1200, maintenance - 400));
  document.querySelector('#gain-calories').textContent = formatCalories(maintenance + 300);
  resultStatus.textContent = 'Your personalized targets are ready';
  document.querySelector('#results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

updateActivity();
