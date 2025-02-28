import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
  User,
} from '../../services/interfaces/appwrite-db.interfaces';
import { CardComponent } from '../../components/elements/card/card.component';
import { activityTypes, activityTypesColors, activityTypesSvg, gymExcercisesColors } from '../../data/record-data';

@Component({
  selector: 'app-pr-history-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './pr-history-page.component.html',
  styleUrl: './pr-history-page.component.scss',
})
export class PrHistoryPageComponent {
  user?: User;
  activityTypes = activityTypes;
  activityTypesSvg = activityTypesSvg;
  activityTypesColors = activityTypesColors;
  gymExcercisesColors = gymExcercisesColors;

  constructor(
    private appWriteDbService: AppwriteDbService,
    private authService: AuthService
  ) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.getUserEnduranceRecords(this.user!.$id);
    this.getUserGymRecords(this.user!.$id);
    console.log(this.user);
  }

  enduranceRecords: RunningAndCyclingRecordsDocuments[] = [];
  getUserEnduranceRecords(user_id: string) {
    this.appWriteDbService.getUserRecords(user_id).subscribe({
      next: (response) => {
        this.enduranceRecords = response;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed.');
      },
    });
  }

  gymRecords: GymRecordsDocuments[] = [];
  getUserGymRecords(user_id: string) {
    this.appWriteDbService.getUserGymRecords(user_id).subscribe({
      next: (response) => {
        this.gymRecords = response;
        console.log(this.gymRecords);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed.');
      },
    });
  }
}
