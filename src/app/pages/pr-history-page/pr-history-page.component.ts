import { Component } from '@angular/core';
import { AppwriteDbService } from '../../services/appwrite-db.service';
import { AuthService } from '../../services/auth-service';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
  User,
} from '../../services/interfaces/appwrite-db.interfaces';
import { CardComponent } from '../../components/elements/card/card.component';
import {
  activityTypes,
  activityTypesColors,
  activityTypesSvg,
  gymExcercisesColors,
} from '../../data/record-data';

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
    this.getUserGymRecords(this.user!.$id);
    this.getEnduranceMaxPagination();
    this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
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

  limitPagination = 5;
  offset = 0;
  total = 0;
  maxPage = 0;
  currentPage = 1;
  enduranceRecords: RunningAndCyclingRecordsDocuments[] = [];
  getEnduranceMaxPagination() {
    this.appWriteDbService.getUserRecordsLength(this.user!.$id).subscribe({
      next: (response) => {
        if (response) {
          this.total = response.total;
          this.maxPage = Math.ceil(this.total / this.limitPagination);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  getUserEnduranceRecordsPagination(limit: number, offset: number) {
    this.appWriteDbService
      .getUserRecordsPagination(this.user!.$id, limit, offset)
      .subscribe({
        next: (response) => {
          this.enduranceRecords = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }

  nextPageEndurance() {
    if (this.currentPage === this.maxPage) {
      console.log('block');
    } else {
      this.offset += this.limitPagination;
      this.currentPage += 1;
      this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
    }
    console.log(this.currentPage);
  }

  prevPageEndurance() {
    if (this.currentPage === 1) {
      console.log('block');
    } else {
      this.offset -= this.limitPagination;
      this.currentPage -= 1;
      this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
    }
    console.log(this.currentPage);
  }
}
