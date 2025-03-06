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
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { PaginationComponent } from '../../components/elements/pagination/pagination.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pr-history-page',
  standalone: true,
  imports: [CardComponent, SpinnerComponent, PaginationComponent],
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
    this.getMaxPagination('endurance');
    this.getMaxPagination('gym');
    this.getUserRecordsPagination(
      'endurance',
      this.limitPagination,
      this.offset
    );
    this.getUserRecordsPagination(
      'gym',
      this.limitPaginationGym,
      this.offsetGym
    );
  }

  //endurance
  loadingEndurance = false;
  limitPagination = 5;
  offset = 0;
  total = 0;
  maxPage = 0;
  currentPage = 1;
  enduranceRecords: RunningAndCyclingRecordsDocuments[] = [];
  //gym
  loadingGym = false;
  limitPaginationGym = 5;
  offsetGym = 0;
  totalGym = 0;
  maxPageGym = 0;
  currentPageGym = 1;
  gymRecords: GymRecordsDocuments[] = [];

  //get records
  getMaxPagination(type: 'endurance' | 'gym') {
    const serviceMethod =
      type === 'endurance'
        ? this.appWriteDbService.getUserRecordsLength(this.user!.$id)
        : this.appWriteDbService.getUserGymRecordsLength(this.user!.$id);
    if (!serviceMethod || !('subscribe' in serviceMethod)) {
      console.error('Invalid service method');
      return;
    }
    (serviceMethod as Observable<{ total: number }>).subscribe({
      next: (response) => {
        if (response) {
          if (type === 'endurance') {
            this.total = response.total;
            this.maxPage = Math.ceil(this.total / this.limitPagination);
          } else {
            this.totalGym = response.total;
            this.maxPageGym = Math.ceil(
              this.totalGym / this.limitPaginationGym
            );
          }
        }
      },
      error: (error) => console.error(error),
    });
  }

  getUserRecordsPagination(
    type: 'endurance' | 'gym',
    limit: number,
    offset: number
  ) {
    const serviceMethod = type
      ? this.appWriteDbService.getUserRecordsPagination(
          this.user!.$id,
          limit,
          offset
        )
      : this.appWriteDbService.getUserGymRecordsPagination(
          this.user!.$id,
          limit,
          offset
        );
    if (!serviceMethod || !('subscribe' in serviceMethod)) {
      console.error('Invalid service method');
      return;
    }
    type ? (this.loadingEndurance = true) : (this.loadingGym = true);
    (serviceMethod as Observable<any>).subscribe({
      next: (response) => {
        type
          ? (this.enduranceRecords = response)
          : (this.gymRecords = response);
      },
      error: (error) => console.error(error),
      complete: () => {
        type ? (this.loadingEndurance = false) : (this.loadingGym = false);
      },
    });
  }
  //get records
  //delete
  deleteRecord(document_id: string, type: 'endurance' | 'gym') {
    const serviceMethod =
      type === 'endurance' ? 'deleteEnduranceRecord' : 'deleteGymRecord';
    this.appWriteDbService[serviceMethod](document_id).subscribe({
      next: () => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        if (type === 'endurance') {
          this.getMaxPagination('endurance');
          this.getUserRecordsPagination(
            'endurance',
            this.limitPagination,
            this.offset
          );
          if (this.currentPage === this.maxPage) {
            this.prevPage('endurance');
            this.getUserRecordsPagination(
              'endurance',
              this.limitPagination,
              this.offset
            );
          }
        }
        if (type === 'gym') {
          this.getMaxPagination('gym');
          this.getUserRecordsPagination(
            'gym',
            this.limitPaginationGym,
            this.offsetGym
          );
          if (this.currentPageGym === this.maxPageGym) {
            this.prevPage('gym');
            this.getUserRecordsPagination(
              'gym',
              this.limitPaginationGym,
              this.offsetGym
            );
          }
        }
      },
    });
  }
  //delte
  //pagination functions
  nextPage(type: 'endurance' | 'gym') {
    if (type === 'endurance') {
      if (this.currentPage === this.maxPage) {
      } else {
        this.offset += this.limitPagination;
        this.currentPage += 1;
        this.getUserRecordsPagination(
          'endurance',
          this.limitPagination,
          this.offset
        );
      }
    }
    if (type === 'gym') {
      if (this.currentPageGym === this.maxPageGym) {
      } else {
        this.offsetGym += this.limitPaginationGym;
        this.currentPageGym += 1;
        this.getUserRecordsPagination(
          'gym',
          this.limitPaginationGym,
          this.offsetGym
        );
      }
    }
  }
  prevPage(type: 'endurance' | 'gym') {
    if (type === 'endurance') {
      if (this.currentPage === 1) {
      } else {
        this.offset -= this.limitPagination;
        this.currentPage -= 1;
        this.getUserRecordsPagination(
          'endurance',
          this.limitPagination,
          this.offset
        );
      }
    }
    if (type === 'gym') {
      if (this.currentPageGym === 1) {
      } else {
        this.offsetGym -= this.limitPaginationGym;
        this.currentPageGym -= 1;
        this.getUserRecordsPagination(
          'gym',
          this.limitPaginationGym,
          this.offsetGym
        );
      }
    }
  }
}
