import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
} from '../../services/interfaces/appwrite-db.interfaces';

@Component({
  selector: 'app-pr-history-page',
  standalone: true,
  imports: [],
  templateUrl: './pr-history-page.component.html',
  styleUrl: './pr-history-page.component.scss',
})
export class PrHistoryPageComponent {
  user: any;
  constructor(
    private appWriteDbService: AppwriteDbService,
    private authService: AuthService
  ) {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
    this.getUserEnduranceRecords(this.user.$id);
    this.getUserGymRecords(this.user.$id);
  }

  enduranceRecords: RunningAndCyclingRecordsDocuments[] = [];
  getUserEnduranceRecords(user_id: string) {
    this.appWriteDbService.getUserRecords(user_id).subscribe({
      next: (response) => {
        this.enduranceRecords = response;
        console.log(this.enduranceRecords);
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

  activityTypes: Record<number, string> = {
    1: 'Run',
    2: 'Bike',
    3: 'Swim'
  };

}
