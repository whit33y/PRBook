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
  }

  enduranceRecords: RunningAndCyclingRecordsDocuments[] = [];
  getUserEnduranceRecords(user_id: string) {
    this.appWriteDbService.getUserRecords(user_id).subscribe({
      next: (response) => {
        console.log(response);
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
        console.log(response);
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
