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
} from '../../data/record-data';

@Component({
  selector: 'app-pr-page',
  standalone: true,
  imports: [],
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

  constructor(
    private authService: AuthService,
    private appWriteDbService: AppwriteDbService
  ) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      for (let i = 0; i < runningDistances.length; i++) {
        this.getUserBestEnduranceRecord(
          1,
          runningDistances[i],
          this.runningDistancesArray
        );
      }
      for (let i = 0; i < cyclingDistances.length; i++) {
        this.getUserBestEnduranceRecord(
          2,
          cyclingDistances[i],
          this.cyclingDistancesArray
        );
      }
      for (let i = 0; i < swimmingDistances.length; i++) {
        this.getUserBestEnduranceRecord(
          3,
          swimmingDistances[i],
          this.swimmingDistancesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Chest.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Chest[i],
          this.chestExcercisesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Back.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Back[i],
          this.backExcercisesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Legs.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Legs[i],
          this.legsExcercisesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Shoulders.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Shoulders[i],
          this.shouldersExcercisesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Arms.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Arms[i],
          this.armsExcercisesArray
        );
      }
      for (let i = 0; i < bodyPartExercises.Core.length; i++) {
        this.getUserBestGymRecord(
          bodyPartExercises.Core[i],
          this.coreExcercisesArray
        );
      }
    }
  }

  runningDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  cyclingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  swimmingDistancesArray: RunningAndCyclingRecordsDocuments[] = [];
  chestExcercisesArray: GymRecordsDocuments[] = [];
  backExcercisesArray: GymRecordsDocuments[] = [];
  legsExcercisesArray: GymRecordsDocuments[] = [];
  shouldersExcercisesArray: GymRecordsDocuments[] = [];
  armsExcercisesArray: GymRecordsDocuments[] = [];
  coreExcercisesArray: GymRecordsDocuments[] = [];

  getUserBestGymRecord(excercise: string, array: GymRecordsDocuments[]) {
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
          console.log('Finded record');
        },
      });
  }

  getUserBestEnduranceRecord(
    type: number,
    distance: number,
    array: RunningAndCyclingRecordsDocuments[]
  ) {
    this.appWriteDbService
      .getBestTimeRecord(this.user!.$id, type, distance)
      .subscribe({
        next: (response) => {
          if (response) {
            array.push(response);
          }
          console.log(array);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Finded record');
        },
      });
  }
}
