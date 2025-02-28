import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
} from '../../services/interfaces/appwrite-db.interfaces';
import { CardComponent } from '../../components/elements/card/card.component';

@Component({
  selector: 'app-pr-history-page',
  standalone: true,
  imports: [CardComponent],
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
    3: 'Swim',
  };

  activityTypesSvg: Record<number, string> = {
    1: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-run"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M4 17l5 1l.75 -1.5" /><path d="M15 21l0 -4l-4 -3l1 -6" /><path d="M7 12l0 -3l5 -1l3 3l3 1" /></svg>',
    2: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bike"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 19l0 -4l-3 -3l5 -4l2 3l3 0" /><path d="M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>',
    3: '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-swimming"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M6 11l4 -2l3.5 3l-1.5 2" /><path d="M3 16.75a2.4 2.4 0 0 0 1 .25a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 1 -.25" /></svg>',
  };

  activityTypesColors: Record<number, string> = {
    1: 'blue',
    2: 'green',
    3: 'red',
  };
}
