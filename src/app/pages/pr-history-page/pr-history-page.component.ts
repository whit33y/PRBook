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
    this.getGymMaxPagination();
    this.getEnduranceMaxPagination();
    this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
    this.getUserGymRecordsPagination(this.limitPaginationGym, this.offsetGym);
  }

  //endurance
  loadingEndurance = false;
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
      },
    });
  }

  getUserEnduranceRecordsPagination(limit: number, offset: number) {
    this.loadingEndurance = true;
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
          this.loadingEndurance = false;
        },
      });
  }

  nextPageEndurance() {
    if (this.currentPage === this.maxPage) {
    } else {
      this.offset += this.limitPagination;
      this.currentPage += 1;
      this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
    }
  }

  prevPageEndurance() {
    if (this.currentPage === 1) {
    } else {
      this.offset -= this.limitPagination;
      this.currentPage -= 1;
      this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
    }
  }

  //endurance

  //gym
  loadingGym = false;
  limitPaginationGym = 5;
  offsetGym = 0;
  totalGym = 0;
  maxPageGym = 0;
  currentPageGym = 1;
  gymRecords: GymRecordsDocuments[] = [];

  getGymMaxPagination() {
    this.appWriteDbService.getUserGymRecordsLength(this.user!.$id).subscribe({
      next: (response) => {
        if (response) {
          this.totalGym = response.total;
          this.maxPageGym = Math.ceil(this.totalGym / this.limitPaginationGym);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
      },
    });
  }

  getUserGymRecordsPagination(limit: number, offset: number) {
    this.loadingGym = true;
    this.appWriteDbService
      .getUserGymRecordsPagination(this.user!.$id, limit, offset)
      .subscribe({
        next: (response) => {
          this.gymRecords = response;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingGym = false;
        },
      });
  }

  nextPageGym() {
    if (this.currentPageGym === this.maxPageGym) {
    } else {
      this.offsetGym += this.limitPaginationGym;
      this.currentPageGym += 1;
      this.getUserGymRecordsPagination(this.limitPaginationGym, this.offsetGym);
    }
  }

  prevPageGym() {
    if (this.currentPageGym === 1) {
    } else {
      this.offsetGym -= this.limitPaginationGym;
      this.currentPageGym -= 1;
      this.getUserGymRecordsPagination(this.limitPaginationGym, this.offsetGym);
    }
  }
  //gym

  //delete

  deleteGymRecord(document_id: string) {
    this.appWriteDbService.deleteGymRecord(document_id).subscribe({
      next: () => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.getGymMaxPagination();
        this.getUserGymRecordsPagination(this.limitPaginationGym, this.offsetGym);
        if(this.currentPageGym === this.maxPageGym){
          this.prevPageGym();
          this.getUserGymRecordsPagination(this.limitPaginationGym, this.offsetGym);
        }
      },
    });
  }

  deleteEnduranceRecord(document_id: string) {
    this.appWriteDbService.deleteEnduranceRecord(document_id).subscribe({
      next: () => {},
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.getEnduranceMaxPagination();
        this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
        if(this.currentPage === this.maxPage){
          this.prevPageEndurance();
          this.getUserEnduranceRecordsPagination(this.limitPagination, this.offset);
        }
      },
    });
  }
}
