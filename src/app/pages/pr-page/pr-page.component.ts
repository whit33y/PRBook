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
      //endurance
      this.enduranceRecordsPushArray(
        1,
        this.runningDistances,
        this.runningDistancesArray
      );
      this.enduranceRecordsPushArray(
        2,
        this.cyclingDistances,
        this.cyclingDistancesArray
      );
      this.enduranceRecordsPushArray(
        3,
        this.swimmingDistances,
        this.swimmingDistancesArray
      );
      //gym
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Chest,
        this.chestExcercisesArray
      );
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Back,
        this.backExcercisesArray
      );
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Legs,
        this.legsExcercisesArray
      );
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Shoulders,
        this.shouldersExcercisesArray
      );
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Arms,
        this.armsExcercisesArray
      );
      this.gymRecordsPushArray(
        this.bodyPartExcercises.Core,
        this.coreExcercisesArray
      );
    }
  }

  chestExcercisesArray: GymRecordsDocuments[] = [];
  backExcercisesArray: GymRecordsDocuments[] = [];
  legsExcercisesArray: GymRecordsDocuments[] = [];
  shouldersExcercisesArray: GymRecordsDocuments[] = [];
  armsExcercisesArray: GymRecordsDocuments[] = [];
  coreExcercisesArray: GymRecordsDocuments[] = [];
  loadingGym = false;
  getUserBestGymRecord(excercise: string, array: GymRecordsDocuments[]) {
    this.loadingGym = true;
    this.appWriteDbService
      .getBestGymRecord(this.user!.$id, excercise)
      .subscribe({
        next: (response) => {
          if (response) {
            array.push(response);
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingGym = false;
        },
      });
  }

  runningDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  cyclingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  swimmingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  loadingEndurance = false;
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
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingEndurance = false;
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

  gymRecordsPushArray(bodyPart: string[], pushArray: GymRecordsDocuments[]) {
    for (let i = 0; i < bodyPart.length; i++) {
      this.getUserBestGymRecord(bodyPart[i], pushArray);
    }
  }
}
