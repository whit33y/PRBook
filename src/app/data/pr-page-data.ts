import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
} from '../services/interfaces/appwrite-db.interfaces';
import {
  bodyPartExercises,
  runningDistances,
  cyclingDistances,
  swimmingDistances,
} from './record-data';

export const chestExcercisesArray: GymRecordsDocuments[] = [];
export const backExcercisesArray: GymRecordsDocuments[] = [];
export const legsExcercisesArray: GymRecordsDocuments[] = [];
export const shouldersExcercisesArray: GymRecordsDocuments[] = [];
export const armsExcercisesArray: GymRecordsDocuments[] = [];
export const coreExcercisesArray: GymRecordsDocuments[] = [];

export const gymExerciseGroups = [
  { title: 'Chest', data: chestExcercisesArray },
  { title: 'Back', data: backExcercisesArray },
  { title: 'Legs', data: legsExcercisesArray },
  { title: 'Arms', data: armsExcercisesArray },
  { title: 'Shoulders', data: shouldersExcercisesArray },
  { title: 'Core', data: coreExcercisesArray },
];

export const gymExcerciseGroupFor = [
  { part: bodyPartExercises.Chest, array: chestExcercisesArray },
  { part: bodyPartExercises.Back, array: backExcercisesArray },
  { part: bodyPartExercises.Legs, array: legsExcercisesArray },
  { part: bodyPartExercises.Arms, array: armsExcercisesArray },
  { part: bodyPartExercises.Shoulders, array: shouldersExcercisesArray },
  { part: bodyPartExercises.Core, array: coreExcercisesArray },
];

export const runningDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
export const cyclingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
export const swimmingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];

export const enduranceGroups = [
  { title: 'Running', data: runningDistancesArray },
  { title: 'Cycling', data: cyclingDistancesArray },
  { title: 'Swimming', data: swimmingDistancesArray },
];

export const enduranceGroupsFor = [
  {
    type: 1,
    distances: runningDistances,
    array: runningDistancesArray,
  },
  {
    type: 2,
    distances: cyclingDistances,
    array: cyclingDistancesArray,
  },
  {
    type: 3,
    distances: swimmingDistances,
    array: swimmingDistancesArray,
  },
];
