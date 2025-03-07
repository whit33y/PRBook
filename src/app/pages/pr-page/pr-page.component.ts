import { Component } from '@angular/core';
import { User } from '../../services/interfaces/appwrite-db.interfaces';
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
import {
  gymExerciseGroups,
  gymExcerciseGroupFor,
  enduranceGroups,
  enduranceGroupsFor,
} from '../../data/pr-page-data';

@Component({
  selector: 'app-pr-page',
  standalone: true,
  imports: [SpinnerComponent, CardComponent],
  templateUrl: './pr-page.component.html',
  styleUrl: './pr-page.component.scss',
})
export class PrPageComponent {
  runningDistances = runningDistances;
  cyclingDistances = cyclingDistances;
  swimmingDistances = swimmingDistances;
  bodyPart = bodyPart;
  bodyPartExcercises = bodyPartExercises;
  activityTypesSvg = activityTypesSvg;
  activityTypesColors = activityTypesColors;
  gymExcercisesColors = gymExcercisesColors;
  gymExerciseGroups = gymExerciseGroups;
  gymExcerciseGroupFor = gymExcerciseGroupFor;
  enduranceGroups = enduranceGroups;
  enduranceGroupsFor = enduranceGroupsFor;

  user?: User;
  loadingEndurance: boolean = false;
  loadingGym: boolean = false;
  constructor(
    private authService: AuthService,
    private appWriteDbService: AppwriteDbService
  ) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      for (let group of this.enduranceGroupsFor) {
        this.recordsPushArray(
          'endurance',
          group.array,
          group.type,
          group.distances,
          undefined
        );
      }
      for (let group of this.gymExcerciseGroupFor) {
        this.recordsPushArray(
          'gym',
          group.array,
          undefined,
          undefined,
          group.part
        );
      }
    }
  }

  recordsPushArray(
    sport: 'endurance' | 'gym',
    pushArray: any,
    type?: number,
    distances?: number[],
    bodyPart?: string[]
  ) {
    if (sport === 'endurance' && Array.isArray(pushArray)) {
      for (let i = 0; i < runningDistances.length; i++) {
        this.getUserBest(
          'endurance',
          pushArray,
          type!,
          distances![i],
          undefined
        );
      }
    }
    if (sport === 'gym' && bodyPart) {
      for (let i = 0; i < bodyPart.length; i++) {
        console.log(pushArray, bodyPart);
        this.getUserBest('gym', pushArray, undefined, undefined, bodyPart[i]);
      }
    }
  }

  getUserBest(
    sport: 'endurance' | 'gym',
    array: any,
    type?: number,
    distance?: number,
    excercise?: string
  ) {
    if (sport === 'endurance' && Array.isArray(array)) {
      this.loadingEndurance = true;
      this.appWriteDbService
        .getBestTimeRecord(this.user!.$id, type!, distance!)
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
    if (sport === 'gym' && Array.isArray(array)) {
      this.loadingGym = true;
      this.appWriteDbService
        .getBestGymRecord(this.user!.$id, excercise!)
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
  }
}
