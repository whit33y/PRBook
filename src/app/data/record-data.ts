export const runningDistances = [0.1, 0.4, 1, 2, 3, 5, 10, 15, 21, 42, 50, 100];
export const cyclingDistances = [10, 20, 40, 50, 90, 100, 160, 200];
export const swimmingDistances = [0.1, 0.2, 0.4, 0.8, 1.5, 3.8, 5, 10];

export const bodyPart = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

export const bodyPartExercises = {
  Chest: [
    'Bench Press',
    'Incline Bench Press',
    'Decline Bench Press',
    'Dumbbell Fly',
    'Chest Dips',
    'Push-ups',
    'Cable Crossover',
    'Pec Deck Machine',
  ],
  Back: [
    'Pull-ups',
    'Lat Pulldown',
    'Barbell Row',
    'Dumbbell Row',
    'Deadlift',
    'Face Pulls',
    'T-Bar Row',
    'Seated Cable Row',
  ],
  Legs: [
    'Squat',
    'Leg Press',
    'Lunges',
    'Romanian Deadlift',
    'Leg Curl',
    'Leg Extension',
    'Calf Raise',
    'Bulgarian Split Squat',
  ],
  Shoulders: [
    'Overhead Press',
    'Dumbbell Shoulder Press',
    'Arnold Press',
    'Lateral Raises',
    'Front Raises',
    'Face Pulls',
    'Reverse Fly',
    'Shrugs',
  ],
  Arms: [
    'Bicep Curl',
    'Hammer Curl',
    'Preacher Curl',
    'Tricep Dips',
    'Tricep Pushdown',
    'Overhead Tricep Extension',
    'Close-Grip Bench Press',
    'Reverse Curl',
  ],
  Core: [
    'Plank',
    'Crunches',
    'Russian Twists',
    'Leg Raises',
    'Hanging Leg Raises',
    'Ab Rollout',
    'Bicycle Crunches',
    'Dead Bug',
  ],
};

export const activityTypes: Record<number, string> = {
  1: 'Run',
  2: 'Bike',
  3: 'Swim',
};

export const activityTypesSvg: Record<number, string> = {
  1: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-run"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 17l5 1l.75 -1.5" /><path d="M15 21l0 -4l-4 -3l1 -6" /><path d="M7 12l0 -3l5 -1l3 3l3 1" /></svg>',
  2: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bike"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 19l0 -4l-3 -3l5 -4l2 3l3 0" /><path d="M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>',
  3: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-swimming"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M6 11l4 -2l3.5 3l-1.5 2" /><path d="M3 16.75a2.4 2.4 0 0 0 1 .25a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 1 -.25" /></svg>',
};

export const activityTypesColors: Record<number, string> = {
  1: 'blue',
  2: 'green',
  3: 'red',
};

export const gymExcercisesColors: Record<string, string> = {
  Chest: 'blue',
  Back: 'green',
  Legs: 'red',
  Shoulders: 'purple',
  Arms: 'yellow',
  Core: 'white',
};
