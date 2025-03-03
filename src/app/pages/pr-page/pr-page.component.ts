import { Component } from '@angular/core';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
  User,
} from '../../services/interfaces/appwrite-db.interfaces';
import { AuthService } from '../../services/auth-service';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import {
  bodyPart,
  bodyPartExercises,
  cyclingDistances,
  runningDistances,
  swimmingDistances,
  activityTypesSvg,
  activityTypesColors,
  gymExcercisesColors,
} from '../../data/record-data';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { CardComponent } from '../../components/elements/card/card.component';

@Component({
  selector: 'app-pr-page',
  standalone: true,
  imports: [SpinnerComponent, CardComponent],
  templateUrl: './pr-page.component.html',
  styleUrl: './pr-page.component.scss',
})
export class PrPageComponent {
  user?: User;
  runningDistances = runningDistances;
  cyclingDistances = cyclingDistances;
  swimmingDistances = swimmingDistances;
  bodyPart = bodyPart;
  bodyPartExcercises = bodyPartExercises;
  activityTypesSvg = activityTypesSvg;
  activityTypesColors = activityTypesColors;
  gymExcercisesColors = gymExcercisesColors;
  constructor(
    private authService: AuthService,
    private appWriteDbService: AppwriteDbService
  ) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      for (let group of this.enduranceGroupsFor) {
        this.enduranceRecordsPushArray(
          group.type,
          group.distances,
          group.array
        );
      }
      for (let group of this.gymExcerciseGroupFor) {
        this.gymRecordsPushArray(group.part, group.array);
      }
    }
  }

  //endurance endurance endurance endurance endurance endurance
  loadingEndurance = false;
  runningDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  cyclingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  swimmingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  enduranceGroups = [
    { title: 'Running', data: this.runningDistancesArray },
    { title: 'Cycling', data: this.cyclingDistancesArray },
    { title: 'Swimming', data: this.swimmingDistancesArray },
  ];
  enduranceGroupsFor = [
    {
      type: 1,
      distances: this.runningDistances,
      array: this.runningDistancesArray,
    },
    {
      type: 2,
      distances: this.cyclingDistances,
      array: this.cyclingDistancesArray,
    },
    {
      type: 3,
      distances: this.swimmingDistances,
      array: this.swimmingDistancesArray,
    },
  ];

  getUserBestEnduranceRecord(
    type: number,
    distance: number,
    array: RunningAndCyclingRecordsDocuments[]
  ) {
    this.loadingEndurance = true;
    this.appWriteDbService
      .getBestTimeRecord(this.user!.$id, type, distance)
      .subscribe({
        next: (response) => {
          if (response) {
            array.push(response);
          }
          this.loadingEndurance = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  enduranceRecordsPushArray(
    type: number,
    distances: number[],
    pushArray: RunningAndCyclingRecordsDocuments[]
  ) {
    for (let i = 0; i < runningDistances.length; i++) {
      this.getUserBestEnduranceRecord(type, distances[i], pushArray);
    }
  }
  //endurance endurance endurance endurance endurance endurance

  //gym gym gym gym gym gym gym gym gym gym gym gym gym gym gym
  loadingGym = false;
  chestExcercisesArray: GymRecordsDocuments[] = [];
  backExcercisesArray: GymRecordsDocuments[] = [];
  legsExcercisesArray: GymRecordsDocuments[] = [];
  shouldersExcercisesArray: GymRecordsDocuments[] = [];
  armsExcercisesArray: GymRecordsDocuments[] = [];
  coreExcercisesArray: GymRecordsDocuments[] = [];
  gymExerciseGroups = [
    { title: 'Chest', data: this.chestExcercisesArray },
    { title: 'Back', data: this.backExcercisesArray },
    { title: 'Legs', data: this.legsExcercisesArray },
    { title: 'Arms', data: this.armsExcercisesArray },
    { title: 'Shoulders', data: this.shouldersExcercisesArray },
    { title: 'Core', data: this.coreExcercisesArray },
  ];
  gymExcerciseGroupFor = [
    { part: this.bodyPartExcercises.Chest, array: this.chestExcercisesArray },
    { part: this.bodyPartExcercises.Back, array: this.backExcercisesArray },
    { part: this.bodyPartExcercises.Legs, array: this.legsExcercisesArray },
    { part: this.bodyPartExcercises.Arms, array: this.armsExcercisesArray },
    {
      part: this.bodyPartExcercises.Shoulders,
      array: this.shouldersExcercisesArray,
    },
    { part: this.bodyPartExcercises.Core, array: this.coreExcercisesArray },
  ];

  getUserBestGymRecord(excercise: string, array: GymRecordsDocuments[]) {
    this.loadingGym = true;
    this.appWriteDbService
      .getBestGymRecord(this.user!.$id, excercise)
      .subscribe({
        next: (response) => {
          if (response) {
            array.push(response);
          }
          this.loadingGym = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  gymRecordsPushArray(bodyPart: string[], pushArray: GymRecordsDocuments[]) {
    for (let i = 0; i < bodyPart.length; i++) {
      this.getUserBestGymRecord(bodyPart[i], pushArray);
    }
  }
  //gym gym gym gym gym gym gym gym gym gym gym gym gym gym gym
}
